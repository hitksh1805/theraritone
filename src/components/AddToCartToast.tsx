import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  imageURL: string;
}

interface AddToCartToastProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItem | null;
  onViewCart: () => void;
  onCheckout: () => void;
}

const AddToCartToast: React.FC<AddToCartToastProps> = ({
  isOpen,
  onClose,
  item,
  onViewCart,
  onCheckout
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50"
            onClick={onClose}
          />
          
          {/* Toast Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Item added to your cart</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex-1 p-4">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-gray-600 mb-1">Size: {item.size}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-1">Quantity: {item.quantity}</p>
                  <p className="font-semibold text-gray-900">₹{item.price}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 space-y-3 border-t bg-gray-50">
              <Button
                onClick={onViewCart}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <ShoppingBag size={18} />
                <span>View Cart</span>
              </Button>
              
              <Button
                onClick={onCheckout}
                className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
              >
                <CreditCard size={18} />
                <span>Checkout</span>
              </Button>
              
              <button
                onClick={onClose}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-800 py-2"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddToCartToast;