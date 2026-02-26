import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '../components/ui/alert-dialog';
  import { AlertCircle } from 'lucide-react';
  import useAlertStore from '../components/hooks/useAlert';
  
  export default function ErrorDialog() {
    const { errorDialog, closeErrorDialog } = useAlertStore();
  
    return (
      <AlertDialog open={errorDialog.isOpen} onOpenChange={closeErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-xl">
              {errorDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {errorDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={closeErrorDialog}
              className="bg-red-500 hover:bg-red-600 w-full"
            >
              OK, Mengerti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }