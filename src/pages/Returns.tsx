import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Returns = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Returns & Exchanges"
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Returns & Exchanges</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We want you to love your purchase. If you're not completely satisfied, we offer easy returns and exchanges.
            </p>
          </div>

          {/* Return Policy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-gray-600 text-sm">Return items within 30 days of delivery</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <RotateCcw className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Exchanges</h3>
              <p className="text-gray-600 text-sm">Size exchanges are completely free</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Process</h3>
              <p className="text-gray-600 text-sm">Simple online return process</p>
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Return an Item</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h3 className="font-medium text-gray-900">Initiate Return</h3>
                  <p className="text-gray-600">Log into your account and go to Order History. Select the item you want to return.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h3 className="font-medium text-gray-900">Print Return Label</h3>
                  <p className="text-gray-600">Download and print the prepaid return shipping label provided.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h3 className="font-medium text-gray-900">Package Item</h3>
                  <p className="text-gray-600">Pack the item securely in its original packaging with all tags attached.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                <div>
                  <h3 className="font-medium text-gray-900">Ship Return</h3>
                  <p className="text-gray-600">Drop off at any India Post office or schedule a pickup.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Conditions */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Return Conditions</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Items Must Be:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>In original condition with tags attached</li>
                  <li>Unworn, unwashed, and undamaged</li>
                  <li>In original packaging</li>
                  <li>Returned within 30 days of delivery</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Non-Returnable Items:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Underwear and intimate apparel</li>
                  <li>Customized or personalized items</li>
                  <li>Items marked as final sale</li>
                  <li>Gift cards</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Processing Time</h3>
                <p className="text-gray-600">
                  Refunds are processed within 5-7 business days after we receive your returned item.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Refund Method</h3>
                <p className="text-gray-600">
                  Refunds will be credited to your original payment method. For cash on delivery orders, we'll process a bank transfer.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Exchanges</h3>
                <p className="text-gray-600">
                  Size exchanges are free within India. Simply return your item and place a new order for the correct size.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help with Returns?</h3>
            <p className="text-gray-600 mb-4">
              Our customer support team is here to assist you with any return questions.
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

export default Returns;