import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const FAQs = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI body scan work?",
      answer: "Our AI body scan uses your device's camera to capture your measurements in real-time. The technology analyzes your body shape and provides accurate size recommendations for each product. Your scan data is processed locally and never stored on our servers."
    },
    {
      question: "Is my body scan data secure?",
      answer: "Yes, absolutely. Your body scan data is processed locally on your device and is never stored or shared. We prioritize your privacy and only use the measurements to provide accurate size recommendations."
    },
    {
      question: "What if the recommended size doesn't fit?",
      answer: "We offer free size exchanges within 30 days. If our AI recommendation doesn't fit perfectly, simply return the item and we'll send you the correct size at no additional cost."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within India. We're working on expanding to international markets soon. Sign up for our newsletter to be notified when we start shipping to your country."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days, express shipping takes 2-3 days, and same-day delivery is available in Mumbai and Delhi. Free shipping is available on orders above ₹2,000."
    },
    {
      question: "Can I return items without the original packaging?",
      answer: "Items must be returned in their original packaging with all tags attached. This helps us maintain quality standards and ensures the item can be resold."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our website or the courier partner's portal."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery. All payments are processed securely through encrypted channels."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="FAQs"
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
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our AI-powered fashion platform, shipping, returns, and more.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Can't find the answer you're looking for? Our customer support team is here to help.
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

export default FAQs;