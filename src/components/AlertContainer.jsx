import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import useAlertStore from '../components/hooks/useAlert';

export default function AlertContainer() {
  const { alerts, removeAlert } = useAlertStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.type === 'error' ? 'destructive' : 'default'}
          className="relative pr-12 shadow-lg"
        >
          {alert.type === 'error' ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
          <button
            onClick={() => removeAlert(alert.id)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      ))}
    </div>
  );
}