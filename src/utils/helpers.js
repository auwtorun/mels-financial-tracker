import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

// Format currency ke Rupiah
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (date, formatStr = 'dd MMM yyyy') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: localeId });
  } catch (error) {
    return 'Invalid date';
  }
};

// Get transactions for current month
export const getCurrentMonthTransactions = (transactions) => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  
  return transactions.filter((t) => {
    const transactionDate = parseISO(t.date);
    return isWithinInterval(transactionDate, { start, end });
  });
};

// Group transactions by date
export const groupTransactionsByDate = (transactions) => {
  const grouped = {};
  
  transactions.forEach((t) => {
    const dateKey = formatDate(t.date, 'dd MMM yyyy');
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(t);
  });
  
  return grouped;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};
