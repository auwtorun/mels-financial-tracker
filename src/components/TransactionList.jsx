import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowUpCircle, ArrowDownCircle, ArrowRight } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency, formatDate, groupTransactionsByDate } from '../utils/helpers';

const TransactionList = ({ limit, showViewAll = false }) => {
  const navigate = useNavigate();
  const { transactions, categories, deleteTransaction } = useFinanceStore();

  // Sort transactions by date (terbaru di atas) sebelum grouping
  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => {
      return new Date(b.date) - new Date(a.date); // Descending (terbaru dulu)
    });

    // Jika ada limit, slice array
    return limit ? sorted.slice(0, limit) : sorted;
  }, [transactions, limit]);

  const groupedTransactions = groupTransactionsByDate(sortedTransactions);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6b7280';
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus transaksi ini?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Belum ada transaksi. Tambahkan transaksi pertama kamu!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-bold mb-4">
        {limit ? 'Transaksi Terbaru' : 'Riwayat Transaksi'}
      </h2>

      {/* Wrapper dengan max-height dan overflow hidden */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          maxHeight: showViewAll && transactions.length > limit ? '440px' : 'none' 
        }}
      >
        <div className="space-y-4">
          {Object.entries(groupedTransactions).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">{date}</h3>
              <div className="space-y-2">
                {items.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="p-2 rounded-full"
                        style={{ backgroundColor: getCategoryColor(transaction.categoryId) + '20' }}
                      >
                        {transaction.type === 'income' ? (
                          <ArrowUpCircle
                            size={20}
                            style={{ color: getCategoryColor(transaction.categoryId) }}
                          />
                        ) : (
                          <ArrowDownCircle
                            size={20}
                            style={{ color: getCategoryColor(transaction.categoryId) }}
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {transaction.description || getCategoryName(transaction.categoryId)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {getCategoryName(transaction.categoryId)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p
                        className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>

                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Hapus transaksi"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Blur Overlay - hanya muncul jika ada tombol view all */}
        {showViewAll && transactions.length > limit && (
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 20%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0) 100%)'
            }}
          />
        )}
      </div>

      {/* Tombol Lihat Semua */}
      {showViewAll && transactions.length > limit && (
        <button
          onClick={() => navigate('/transactions')}
          className="relative w-full mt-4 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Buka Seluruh Riwayat Transaksi
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default TransactionList;