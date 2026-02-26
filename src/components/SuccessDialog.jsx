import { useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '../components/ui/alert-dialog';
  import { CheckCircle2 } from 'lucide-react';
  import useAlertStore from '../components/hooks/useAlert';
  
  export default function SuccessDialog() {

    const { successDialog, closeSuccessDialog } = useAlertStore();
  
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

    if (e.key === 'Enter' && successDialog.isOpen) {
      e.preventDefault();
      closeSuccessDialog();
    }
  };

  if (successDialog.isOpen) {
    document.addEventListener('keydown', handleKeyDown);
  }

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [successDialog.isOpen]); // PERBAIKI: ganti isOpen jadi successDialog.isOpen
  
    return (
      <AlertDialog open={successDialog.isOpen} onOpenChange={closeSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-xl">
              {successDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {successDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={closeSuccessDialog}
              className="bg-green-500 hover:bg-green-600 w-full"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }