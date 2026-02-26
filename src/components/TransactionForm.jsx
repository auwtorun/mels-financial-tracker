import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const TransactionForm = ({ isOpen, onClose }) => {
  const { addTransaction, categories } = useFinanceStore();

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    categoryId: '',
    description: '',
    date: new Date(),
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const dropdownRef = useRef(null);
  const drawerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setDragOffset(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Touch/Mouse drag handlers
  const handleDragStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging) return;

    const diff = clientY - startY;
    if (diff > 0) {
      // Only allow dragging down
      setDragOffset(diff);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // If dragged more than 150px, close the drawer
    if (dragOffset > 150) {
      onClose();
    }

    // Reset drag offset with animation
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    if (e.target.closest('.drawer-handle')) {
      handleDragStart(e.clientY);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientY);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e) => {
    if (e.target.closest('.drawer-handle')) {
      handleDragStart(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      handleDragMove(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset, startY]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.categoryId) {
      alert('Mohon isi semua field yang wajib!');
      return;
    }

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount), // Sudah dalam format number tanpa titik
      date: formData.date.toISOString(),
    });

    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      categoryId: '',
      description: '',
      date: new Date(),
    });

    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const availableCategories = categories.filter(
    (cat) => cat.type === formData.type || cat.type === 'both',
  );

  const selectedCategory = categories.find(
    (cat) => cat.id === formData.categoryId,
  );

  if (!isOpen) return null;

  const formatRupiahInput = (value) => {
    // Hapus semua karakter non-digit
    const numbers = value.replace(/\D/g, '');

    // Format dengan titik setiap 3 digit
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAmountChange = (e) => {
    const input = e.target.value;
    const formatted = formatRupiahInput(input);

    // Simpan nilai asli (tanpa titik) untuk calculation
    const rawValue = formatted.replace(/\./g, '');

    setFormData({ ...formData, amount: rawValue });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'
          }`}
        onClick={onClose}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease-out',
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50"
        style={{
          maxHeight: '90vh',
          transform: `translateY(${isOpen ? dragOffset : '100%'}px)`,
          transition: isDragging
            ? 'none'
            : 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Handle Bar - Draggable */}
        <div
          className="drawer-handle flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Tambah Transaksi</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div
          className="overflow-y-auto px-6 py-6"
          style={{ maxHeight: 'calc(90vh - 180px)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type Selection */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, type: 'expense', categoryId: '' })
                }
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${formData.type === 'expense'
                  ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Pengeluaran
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, type: 'income', categoryId: '' })
                }
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${formData.type === 'income'
                  ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Pemasukan
              </button>
            </div>

            {/* Amount */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Jumlah *
  </label>
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
      Rp
    </span>
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9.]*"
      value={formData.amount ? formatRupiahInput(formData.amount) : ''}
      onChange={handleAmountChange}
      placeholder={formData.type === 'expense' ? '50.000' : '1.000.000'}
      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-medium"
      required
    />
  </div>
</div>

            {/* Custom Category Dropdown */}
            <div ref={dropdownRef}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all flex items-center justify-between bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    {selectedCategory && (
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: selectedCategory.color }}
                      />
                    )}
                    <span
                      className={
                        selectedCategory
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-400'
                      }
                    >
                      {selectedCategory
                        ? selectedCategory.name
                        : 'Pilih kategori'}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
                    {availableCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, categoryId: cat.id });
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-gray-900 font-medium">
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Shadcn Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'w-full px-4 py-3 border-2 border-gray-200 rounded-xl justify-between text-left font-medium h-auto hover:bg-gray-50',
                      !formData.date && 'text-muted-foreground'
                    )}
                  >
                    <span className="text-gray-900">
                      {formData.date ? (
                        format(formData.date, 'dd MMMM yyyy', {
                          locale: localeId,
                        })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </span>
                    <CalendarIcon className="ml-auto h-5 w-5 text-gray-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) =>
                      setFormData({ ...formData, date: date || new Date() })
                    }
                    initialFocus
                    locale={localeId}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keterangan
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                onKeyDown={handleKeyDown}
                placeholder={
                  formData.type === 'expense'
                    ? 'Makan siang di restoran'
                    : 'Gaji bulanan'
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Footer Button */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-t-3xl">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-bold text-lg shadow-lg shadow-blue-200"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
