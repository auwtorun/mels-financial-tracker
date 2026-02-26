import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import useAlertStore from '../components/hooks/useAlert';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../components/ui/drawer';
import { cn } from '../lib/utils';

const TransactionForm = ({ isOpen, onClose }) => {
  const { addTransaction, categories } = useFinanceStore();
  const { showErrorDialog, showSuccessDialog } = useAlertStore();

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    categoryId: '',
    description: '',
    date: new Date(),
  });

  // Format Rupiah
  const formatRupiahInput = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAmountChange = (e) => {
    const input = e.target.value;
    const formatted = formatRupiahInput(input);
    const rawValue = formatted.replace(/\./g, '');
    setFormData({ ...formData, amount: rawValue });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.categoryId) {
      showErrorDialog(
        'Data Tidak Lengkap',
        'Mohon isi semua field yang wajib (Jumlah dan Kategori) sebelum menyimpan transaksi.'
      );
      return;
    }

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date.toISOString(),
    });

    showSuccessDialog(
      'Berhasil!',
      'Transaksi berhasil ditambahkan ke daftar riwayat.'
    );

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

  const availableCategories = categories.filter(
    (cat) => cat.type === formData.type || cat.type === 'both',
  );

  const selectedCategory = categories.find(
    (cat) => cat.id === formData.categoryId,
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="w-full">
        <div className='h-full md:mx-96'>
          <DrawerHeader>
            <DrawerTitle>Tambah Transaksi</DrawerTitle>
            <DrawerDescription>
              Catat transaksi pemasukan atau pengeluaran Anda
            </DrawerDescription>
          </DrawerHeader>

          <div className="overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(90vh - 160px)' }}>
            <div className="space-y-5">
              {/* Type Selection */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: 'expense', categoryId: '' })
                  }
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.type === 'expense'
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
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.type === 'income'
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

              {/* Category Select - SHADCN */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori *
                </label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: value })
                  }
                >
                  <SelectTrigger className="w-full h-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Pilih kategori">
                      {selectedCategory && (
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: selectedCategory.color }}
                          />
                          <span className="font-medium">
                            {selectedCategory.name}
                          </span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="font-medium">{cat.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Picker */}
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
                      ? 'Contoh: Makan siang di restoran'
                      : 'Contoh: Gaji bulanan'
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-bold text-sm shadow-lg shadow-blue-200"
            >
              Simpan Transaksi
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Batal</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TransactionForm;