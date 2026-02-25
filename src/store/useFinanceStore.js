import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: [],
      categories: [
        { id: 'food', name: 'Makanan & Minuman', type: 'expense', color: '#ef4444' },
        { id: 'transport', name: 'Transport', type: 'expense', color: '#f59e0b' },
        { id: 'shopping', name: 'Belanja', type: 'expense', color: '#ec4899' },
        { id: 'bills', name: 'Tagihan', type: 'expense', color: '#8b5cf6' },
        { id: 'salary', name: 'Gaji', type: 'income', color: '#10b981' },
        { id: 'freelance', name: 'Freelance', type: 'income', color: '#06b6d4' },
        { id: 'other', name: 'Lainnya', type: 'both', color: '#6b7280' },
      ],
      
      // Actions
      addTransaction: (transaction) => 
        set((state) => ({
          transactions: [
            {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              ...transaction
            },
            ...state.transactions
          ]
        })),
      
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id)
        })),
      
      updateTransaction: (id, updatedData) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedData } : t
          )
        })),
      
      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              id: Date.now().toString(),
              ...category
            }
          ]
        })),
      
      // Computed values
      getTotalIncome: () => {
        const transactions = get().transactions;
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      },
      
      getTotalExpense: () => {
        const transactions = get().transactions;
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      },
      
      getBalance: () => {
        const { getTotalIncome, getTotalExpense } = get();
        return getTotalIncome() - getTotalExpense();
      },
      
      getTransactionsByCategory: () => {
        const transactions = get().transactions;
        const categories = get().categories;
        
        return categories.map((cat) => ({
          ...cat,
          total: transactions
            .filter((t) => t.categoryId === cat.id)
            .reduce((sum, t) => sum + t.amount, 0),
          count: transactions.filter((t) => t.categoryId === cat.id).length
        }));
      }
    }),
    {
      name: 'finance-storage', // key di localStorage
    }
  )
);

export default useFinanceStore;
