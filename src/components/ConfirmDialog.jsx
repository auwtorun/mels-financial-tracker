import { useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '../components/ui/alert-dialog';
  import useConfirmStore from '../components/hooks/useConfirm';
  
  export default function ConfirmDialog() {
    
    const { isOpen, title, description, onConfirm, closeConfirm } = useConfirmStore();
  
    const handleConfirm = () => {
      if (onConfirm) onConfirm();
      closeConfirm();
    };
  
// Handle Enter key
useEffect(() => {
  const handleKeyDown = (e) => {
    // Ignore jika Enter dari input/textarea/select
    if (
      e.target.tagName === 'INPUT' || 
      e.target.tagName === 'TEXTAREA' || 
      e.target.tagName === 'SELECT' ||
      e.target.getAttribute('role') === 'combobox'
    ) {
      return;
    }

    if (e.key === 'Enter' && isOpen) {
      e.preventDefault();
      handleConfirm();
    }
  };

  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown);
  }

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [isOpen, onConfirm]);
  
    return (
      <AlertDialog open={isOpen} onOpenChange={closeConfirm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} className="bg-red-500 hover:bg-red-600">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }