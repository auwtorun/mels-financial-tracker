import { create } from 'zustand';

const useAlertStore = create((set) => ({
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
}));

export default useAlertStore;