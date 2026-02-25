import React, { useState } from 'react';
import { Wallet, Plus } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Wallet className="text-blue-500" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">
              Financial Tracker
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Cards */}
        <Dashboard />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart */}
          <div className="lg:col-span-1">
            <CategoryChart />
          </div>

          {/* Right Column - Transaction List */}
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 z-30"
        aria-label="Tambah transaksi"
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>

      {/* Transaction Form Drawer */}
      <TransactionForm isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            Data disimpan secara lokal di browser kamu 🔒
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
