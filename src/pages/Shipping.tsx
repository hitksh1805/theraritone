import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Shipping = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Shipping & Delivery"
        showBackButton={true}
      />

      <div className="pt-16 max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Shipping & Delivery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer fast and reliable shipping across India with multiple delivery options to suit your needs.
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Truck className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Delivery</h3>
              <p className="text-gray-600 text-sm mb-2">5-7 business days</p>
              <p className="text-gray-900 font-medium">₹200</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Express Delivery</h3>
              <p className="text-gray-600 text-sm mb-2">2-3 business days</p>
              <p className="text-gray-900 font-medium">₹500</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <MapPin className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Same Day Delivery</h3>
              <p className="text-gray-600 text-sm mb-2">Mumbai & Delhi only</p>
              <p className="text-gray-900 font-medium">₹800</p>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600">
                  Enjoy free standard shipping on all orders above ₹2,000 across India.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  Orders are processed within 1-2 business days. You'll receive a confirmation email with tracking details once your order ships.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Delivery Areas</h3>
                <p className="text-gray-600">
                  We deliver to all major cities and towns across India. Remote areas may require additional 1-2 days for delivery.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tracking Your Order</h3>
                <p className="text-gray-600">
                  Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier partner's portal.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Have questions about shipping? Our customer support team is here to help.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;