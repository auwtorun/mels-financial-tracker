import { create } from 'zustand';

const useConfirmStore = create((set) => ({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: null,
  openConfirm: (title, description, onConfirm) =>
    set({ isOpen: true, title, description, onConfirm }),
  closeConfirm: () => set({ isOpen: false, title: '', description: '', onConfirm: null }),
}));

export default useConfirmStore;