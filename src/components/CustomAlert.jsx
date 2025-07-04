import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

const CustomAlert = ({ alert, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
      setIsExiting(false);
      
      // Auto dismiss after duration
      const timer = setTimeout(() => {
        handleClose();
      }, alert.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!alert || !isVisible) return null;

  const getAlertStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-lg shadow-lg border transition-all duration-300 transform";
    
    if (isExiting) {
      return `${baseStyles} translate-x-full opacity-0`;
    }

    const typeStyles = {
      success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
      error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
      info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200"
    };

    return `${baseStyles} ${typeStyles[alert.type] || typeStyles.info} translate-x-0 opacity-100`;
  };

  const getIcon = () => {
    const iconProps = { className: "h-5 w-5 flex-shrink-0" };
    
    switch (alert.type) {
      case 'success':
        return <CheckCircle {...iconProps} className="h-5 w-5 flex-shrink-0 text-green-500" />;
      case 'error':
        return <AlertCircle {...iconProps} className="h-5 w-5 flex-shrink-0 text-red-500" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="h-5 w-5 flex-shrink-0 text-yellow-500" />;
      case 'info':
      default:
        return <Info {...iconProps} className="h-5 w-5 flex-shrink-0 text-blue-500" />;
    }
  };

  return (
    <div className={getAlertStyles()}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          {alert.title && (
            <h4 className="text-sm font-semibold mb-1">{alert.title}</h4>
          )}
          <p className="text-sm">{alert.message}</p>
          {alert.action && (
            <button
              onClick={alert.action.onClick}
              className="mt-2 text-sm font-medium underline hover:no-underline"
            >
              {alert.action.label}
            </button>
          )}
        </div>
        <button
          onClick={handleClose}
          className="ml-3 flex-shrink-0 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-b-lg overflow-hidden">
        <div 
          className="h-full bg-current animate-progress"
          style={{
            animation: `progress ${alert.duration || 5000}ms linear forwards`
          }}
        />
      </div>
    </div>
  );
};

// Alert Manager Component
export const AlertManager = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const handleShowAlert = (event) => {
      const newAlert = {
        id: Date.now(),
        ...event.detail
      };
      setAlerts(prev => [...prev, newAlert]);
    };

    window.addEventListener('showAlert', handleShowAlert);
    return () => window.removeEventListener('showAlert', handleShowAlert);
  }, []);

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {alerts.map(alert => (
        <CustomAlert
          key={alert.id}
          alert={alert}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
};

// Utility function to show alerts
export const showAlert = (type, message, options = {}) => {
  const event = new CustomEvent('showAlert', {
    detail: {
      type,
      message,
      title: options.title,
      duration: options.duration || 5000,
      action: options.action
    }
  });
  window.dispatchEvent(event);
};

export default CustomAlert;