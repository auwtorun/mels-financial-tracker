import { create } from 'zustand';

const useAlertStore = create((set) => ({
  // Toast alerts (untuk info ringan)
  alerts: [],
  addAlert: (message, type = 'error') => {
    const id = Date.now();
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
      }));
    }, 5000);
  },
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
  
  // Error Dialog
  errorDialog: {
    isOpen: false,
    title: '',
    message: '',
  },
  showErrorDialog: (title, message) =>
    set({ errorDialog: { isOpen: true, title, message } }),
  closeErrorDialog: () =>
    set({ errorDialog: { isOpen: false, title: '', message: '' } }),
  
  // Success Dialog
  successDialog: {
    isOpen: false,
    title: '',
    message: '',
  },
  showSuccessDialog: (title, message) =>
    set({ successDialog: { isOpen: true, title, message } }),
  closeSuccessDialog: () =>
    set({ successDialog: { isOpen: false, title: '', message: '' } }),
}));

export default useAlertStore;