# Financial Tracker 💰

Financial tracker sederhana yang menyimpan data di localStorage browser. Tidak perlu backend atau login!

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool super cepat
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management yang ringan
- **Recharts** - Library untuk charts
- **date-fns** - Manipulasi tanggal
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- ✅ Track pemasukan & pengeluaran
- ✅ Kategorisasi transaksi
- ✅ Dashboard dengan ringkasan saldo
- ✅ Visualisasi chart per kategori
- ✅ Riwayat transaksi detail
- ✅ Data tersimpan otomatis di localStorage
- ✅ Responsive design

## 📁 Project Structure

```
financial-tracker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Cards untuk saldo, income, expense
│   │   ├── TransactionForm.jsx    # Form tambah transaksi
│   │   ├── TransactionList.jsx    # List semua transaksi
│   │   └── CategoryChart.jsx      # Pie chart pengeluaran
│   ├── store/
│   │   └── useFinanceStore.js     # Zustand store + localStorage
│   ├── utils/
│   │   └── helpers.js             # Helper functions (format, date)
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Cara Pakai

1. **Tambah Transaksi**: 
   - Pilih tipe (Pemasukan/Pengeluaran)
   - Isi jumlah, kategori, dan keterangan
   - Klik "Tambah Transaksi"

2. **Lihat Dashboard**:
   - Saldo total ditampilkan di card biru
   - Total pemasukan di card hijau
   - Total pengeluaran di card merah

3. **Analisis Pengeluaran**:
   - Lihat pie chart untuk breakdown pengeluaran per kategori
   - Persentase otomatis dihitung

4. **Hapus Transaksi**:
   - Klik icon trash di setiap transaksi
   - Confirm untuk hapus

## 🔒 Data Storage

Semua data disimpan di **localStorage** browser kamu dengan key `finance-storage`. Data akan tetap ada meskipun browser ditutup, kecuali kamu:
- Clear browser data
- Pakai incognito/private mode
- Ganti browser/device

## 🎨 Customization Ideas

Kamu bisa develop lebih lanjut dengan:
- [ ] Export data ke CSV/Excel
- [ ] Filter transaksi by date range
- [ ] Monthly/yearly reports
- [ ] Budget setting per kategori
- [ ] Multi-currency support
- [ ] Dark mode
- [ ] PWA untuk install di mobile

## 🐛 Troubleshooting

**Data hilang?**
- Pastikan tidak clear localStorage
- Cek browser console untuk error

**Chart tidak muncul?**
- Pastikan ada transaksi pengeluaran
- Reload page

**Styling berantakan?**
- Run `npm install` ulang
- Pastikan Tailwind config sudah benar

## 📝 License

Free to use for learning purposes!

---

Happy tracking! 🎉
