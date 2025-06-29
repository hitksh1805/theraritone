import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Terms & Conditions"
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Terms & Conditions</h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-gray max-w-none">
            <div className="bg-white border rounded-lg p-6 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using the RARITONE website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use License</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Permission is granted to temporarily download one copy of the materials on RARITONE's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. AI Body Scanning Technology</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our AI body scanning technology is provided for size recommendation purposes only. While we strive for accuracy, measurements and recommendations are estimates. RARITONE is not liable for any sizing discrepancies. Your body scan data is processed locally and not stored on our servers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Product Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  We strive to provide accurate product information, including descriptions, prices, and availability. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Colors may vary due to monitor settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Orders and Payment</h2>
                <p className="text-gray-600 leading-relaxed">
                  All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be received before order processing. Prices are subject to change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Shipping and Delivery</h2>
                <p className="text-gray-600 leading-relaxed">
                  Delivery times are estimates and not guaranteed. RARITONE is not responsible for delays caused by shipping carriers, customs, or other factors beyond our control. Risk of loss transfers to you upon delivery to the carrier.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Returns and Refunds</h2>
                <p className="text-gray-600 leading-relaxed">
                  Returns are accepted within 30 days of delivery in original condition with tags attached. Refunds will be processed to the original payment method within 5-7 business days of receiving the returned item. Shipping costs are non-refundable unless the return is due to our error.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our services. By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  RARITONE shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  RARITONE reserves the right to revise these terms at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about these Terms & Conditions, please contact us at legal@raritone.in or call +91 98765 43210.
                </p>
              </section>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions about our terms?</h3>
            <p className="text-gray-600 mb-4">
              Our legal team is available to clarify any questions about our terms and conditions.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;