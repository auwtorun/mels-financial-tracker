import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency } from '../utils/helpers';

const Dashboard = () => {
  const { getTotalIncome, getTotalExpense, getBalance } = useFinanceStore();
  
  const income = getTotalIncome();
  const expense = getTotalExpense();
  const balance = getBalance();

  const stats = [
    {
      title: 'Saldo',
      amount: balance,
      icon: Wallet,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Pemasukan',
      amount: income,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Pengeluaran',
      amount: expense,
      icon: TrendingDown,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>
                  {formatCurrency(stat.amount)}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
