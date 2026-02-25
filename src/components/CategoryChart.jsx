import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import useFinanceStore from '../store/useFinanceStore';
import { formatCurrency, calculatePercentage } from '../utils/helpers';

const CategoryChart = () => {
  const { getTransactionsByCategory, getTotalExpense } = useFinanceStore();
  
  const categoryData = getTransactionsByCategory();
  const totalExpense = getTotalExpense();
  
  // Filter hanya kategori expense yang ada transaksi
  const expenseData = categoryData
    .filter(cat => cat.total > 0 && (cat.type === 'expense' || cat.type === 'both'))
    .map(cat => ({
      name: cat.name,
      value: cat.total,
      color: cat.color,
      percentage: calculatePercentage(cat.total, totalExpense)
    }));

  if (expenseData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Pengeluaran per Kategori</h2>
        <p className="text-gray-500 text-center py-8">
          Belum ada data pengeluaran untuk ditampilkan
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-gray-500">
            {payload[0].payload.percentage}% dari total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Pengeluaran per Kategori</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 space-y-2">
        {expenseData.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{formatCurrency(cat.value)}</p>
              <p className="text-xs text-gray-500">{cat.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryChart;
