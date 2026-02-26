import React, { useState } from "react";
import { Wallet, Plus } from "lucide-react";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";
import ConfirmDialog from "./components/ConfirmDialog";
import SuccessDialog from "./components/SuccessDialog";
import ErrorDialog from "./components/ErrorDialog";
import AlertContainer from "./components/AlertContainer";
import { Button } from "./components/ui/button";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-sans font-bold text-gray-900">
              Mels Personal Financial Tracker
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Cards */}
        <Dashboard />

        {/* Grid Layout */}
        <div className="flex flex-col gap-4">
          {/* Transaction List */}
          <div className="lg:col-span-1">
            <TransactionList limit={5} showViewAll={true}/>
          </div>

          {/* Category Chart */}
          <div className="lg:col-span-2">
            <CategoryChart />
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
      <TransactionForm
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Global Dialogs & Alerts */}
      <ConfirmDialog />
      <SuccessDialog />
      <ErrorDialog />
      <AlertContainer />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 absolute w-full">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 text-sm">
            Datanya tersedia offline kok sayang:)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;