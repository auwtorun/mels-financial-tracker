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
  
    return (
      <AlertDialog open={isOpen} onOpenChange={closeConfirm}>
        <AlertDialogContent>
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