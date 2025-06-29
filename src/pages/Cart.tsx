import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import { removeFromCart } from '@/lib/user';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Cart = () => {
  const { user, cart, refreshCart, removeFromLocalCart, updateLocalCartQuantity } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const updateQuantity = async (itemId: string, newQuantity: number, size?: string) => {
    if (newQuantity <= 0) {
      await removeItem(itemId, size);
      return;
    }

    if (user) {
      // Update in Firebase for authenticated users
      // Implementation would go here for Firebase update
      await refreshCart();
    } else {
      // Update localStorage for guest users
      updateLocalCartQuantity(itemId, newQuantity, size);
    }
  };

  const removeItem = async (itemId: string, size?: string) => {
    if (user) {
      await removeFromCart(user.uid, itemId, size);
      await refreshCart();
    } else {
      removeFromLocalCart(itemId, size);
    }
    
    showToast({
      type: 'success',
      title: 'Item Removed',
      message: 'Item has been removed from your cart.'
    });
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to complete your purchase.'
      });
      return;
    }

    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      showToast({
        type: 'success',
        title: 'Order Placed!',
        message: 'Your order has been placed successfully.'
      });
      // Clear cart after successful order
      if (user) {
        refreshCart();
      } else {
        localStorage.removeItem('cart');
        window.location.reload();
      }
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar 
          onSearchOpen={() => {}}
          onCartOpen={() => {}}
          pageTitle="Your cart"
          showBackButton={true}
        />
        <div className="pt-16 flex items-center justify-center min-h-[80vh] px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">Add some items to get started shopping</p>
            <Button 
              onClick={() => navigate('/catalog')} 
              className="bg-black text-white hover:bg-gray-800 rounded-lg px-8 py-3"
            >
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Your cart"
        showBackButton={true}
      />
      
      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Your cart</h1>
          <button
            onClick={() => navigate('/catalog')}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            Continue shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-gray-600 uppercase tracking-wide">
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-3 text-center">QUANTITY</div>
              <div className="col-span-3 text-right">TOTAL</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mt-4">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-gray-200"
                >
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center space-x-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                      {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                      <p className="text-sm text-gray-900 font-medium">₹{item.price}</p>
                    </div>
                  </div>
                  
                  {/* Quantity Controls - FIXED ICON ALIGNMENT */}
                  <div className="md:col-span-3 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors border border-gray-300"
                    >
                      <Minus size={14} className="text-gray-600" />
                    </button>
                    <span className="w-12 text-center text-gray-900 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors border border-gray-300"
                    >
                      <Plus size={14} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-3 flex items-center justify-end">
                    <p className="font-medium text-gray-900">
                      ₹{item.quantity * item.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Estimated total</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium text-gray-900">₹{tax}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-black text-white hover:bg-gray-800 py-3"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    user ? 'Check out' : 'Login to Checkout'
                  )}
                </Button>
                
                {shipping > 0 && (
                  <p className="text-sm text-gray-600 text-center">
                    Taxes, discounts and shipping calculated at checkout
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;