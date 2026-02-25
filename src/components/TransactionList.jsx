import React from 'react';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency, formatDate, groupTransactionsByDate } from '../utils/helpers';

const TransactionList = () => {
  const { transactions, categories, deleteTransaction } = useFinanceStore();
  
  const groupedTransactions = groupTransactionsByDate(transactions);
  
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Riwayat Transaksi</h2>
      
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
                      className={`font-bold text-lg ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}
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
    </div>
  );
};

export default TransactionList;
