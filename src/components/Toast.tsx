import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, ShoppingBag, Heart, User } from 'lucide-react';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, title, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-400" size={20} />;
      case 'info':
        return <ShoppingBag className="text-blue-400" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-400" size={20} />;
      default:
        return <CheckCircle className="text-green-400" size={20} />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-400';
      case 'error':
        return 'border-red-400';
      case 'info':
        return 'border-blue-400';
      case 'warning':
        return 'border-yellow-400';
      default:
        return 'border-green-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative rounded-lg shadow-lg border-l-4 ${getBorderColor()} p-4 max-w-sm w-full`}
      style={{ backgroundColor: 'rgb(24, 28, 20)' }}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-[rgb(236,223,204)]">
            {title}
          </h3>
          <p className="mt-1 text-sm text-[rgb(105,117,101)]">
            {message}
          </p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-4 flex-shrink-0 text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;