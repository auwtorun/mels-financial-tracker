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
  
    return (
      <AlertDialog open={successDialog.isOpen} onOpenChange={closeSuccessDialog}>
        <AlertDialogContent>
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