import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Shield, RotateCcw, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const QuickLinks = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
      />

      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-[rgb(24,28,20)] rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-[rgb(236,223,204)]" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-semibold text-[rgb(236,223,204)]">Quick Links</h1>
            <p className="text-[rgb(105,117,101)]">Important information and policies</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg shadow-sm p-6 mb-8 border border-[rgb(105,117,101)]"
          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
        >
          <h2 className="text-xl font-semibold text-[rgb(236,223,204)] mb-4">Navigate to Section</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => scrollToSection('about-us')}
              className="flex items-center space-x-2 p-3 rounded-lg border border-[rgb(105,117,101)] hover:bg-[rgb(60,61,55)] transition-colors text-[rgb(236,223,204)]"
            >
              <Info size={16} />
              <span>About Us</span>
            </button>
            <button
              onClick={() => scrollToSection('privacy-policy')}
              className="flex items-center space-x-2 p-3 rounded-lg border border-[rgb(105,117,101)] hover:bg-[rgb(60,61,55)] transition-colors text-[rgb(236,223,204)]"
            >
              <Shield size={16} />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => scrollToSection('returns')}
              className="flex items-center space-x-2 p-3 rounded-lg border border-[rgb(105,117,101)] hover:bg-[rgb(60,61,55)] transition-colors text-[rgb(236,223,204)]"
            >
              <RotateCcw size={16} />
              <span>Returns</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center space-x-2 p-3 rounded-lg border border-[rgb(105,117,101)] hover:bg-[rgb(60,61,55)] transition-colors text-[rgb(236,223,204)]"
            >
              <Mail size={16} />
              <span>Contact</span>
            </button>
          </div>
        </motion.div>

        {/* About Us Section */}
        <motion.section
          id="about-us"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg shadow-sm p-6 mb-8 border border-[rgb(105,117,101)]"
          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
        >
          <h2 className="text-2xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
            <Info className="mr-2" size={24} />
            About Us
          </h2>
          <div className="text-[rgb(105,117,101)] space-y-4">
            <p>
              RARITONE is India's premier AI-powered fashion platform, revolutionizing the way people shop for clothing. 
              Founded with the vision of making perfect-fit fashion accessible to everyone, we combine cutting-edge 
              technology with curated style to deliver an unparalleled shopping experience.
            </p>
            <p>
              Our innovative body scanning technology ensures that every piece of clothing you purchase fits you perfectly, 
              eliminating the guesswork from online fashion shopping. Based in Mumbai, we serve customers across India 
              with our carefully curated collection of premium fashion items.
            </p>
            <p>
              At RARITONE, we believe that fashion should be personal, accessible, and sustainable. Our AI-driven 
              recommendations help you discover styles that match your unique preferences while our virtual try-on 
              technology reduces returns and waste.
            </p>
          </div>
        </motion.section>

        {/* Privacy Policy Section */}
        <motion.section
          id="privacy-policy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg shadow-sm p-6 mb-8 border border-[rgb(105,117,101)]"
          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
        >
          <h2 className="text-2xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
            <Shield className="mr-2" size={24} />
            Privacy Policy
          </h2>
          <div className="text-[rgb(105,117,101)] space-y-4">
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">Data Collection</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, make a purchase, 
              or contact us for support. This includes your name, email address, phone number, shipping address, 
              and payment information.
            </p>
            
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">Body Scan Data</h3>
            <p>
              Our body scanning technology processes your measurements locally on your device. This data is used 
              solely to provide accurate size recommendations and is encrypted and stored securely. We never share 
              your body scan data with third parties.
            </p>
            
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">Data Protection</h3>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized 
              access, alteration, disclosure, or destruction. All data transmission is encrypted using industry-standard 
              SSL technology.
            </p>
            
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">Your Rights</h3>
            <p>
              You have the right to access, update, or delete your personal information at any time. You can also 
              opt out of marketing communications and request a copy of all data we have about you.
            </p>
          </div>
        </motion.section>

        {/* Returns Section */}
        <motion.section
          id="returns"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg shadow-sm p-6 mb-8 border border-[rgb(105,117,101)]"
          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
        >
          <h2 className="text-2xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
            <RotateCcw className="mr-2" size={24} />
            Returns & Exchanges
          </h2>
          <div className="text-[rgb(105,117,101)] space-y-4">
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">30-Day Return Policy</h3>
            <p>
              We offer a 30-day return policy for all items purchased on RARITONE. Items must be in original 
              condition with tags attached and in original packaging.
            </p>
            
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">How to Return</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Log into your account and go to Order History</li>
              <li>Select the item you want to return</li>
              <li>Choose your reason for return</li>
              <li>Print the prepaid return label</li>
              <li>Package the item securely and attach the label</li>
              <li>Drop off at any India Post office or schedule a pickup</li>
            </ul>
            
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">Refund Process</h3>
            <p>
              Refunds are processed within 5-7 business days after we receive your returned item. 
              The refund will be credited to your original payment method.
            </p>
            
            <h3 className="text-lg font-semibold text-[rgb(236,223,204)]">Exchanges</h3>
            <p>
              We offer free size exchanges within India. Simply return your item and place a new order 
              for the correct size. We'll refund the difference if there's a price change.
            </p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-lg shadow-sm p-6 mb-8 border border-[rgb(105,117,101)]"
          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
        >
          <h2 className="text-2xl font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
            <Mail className="mr-2" size={24} />
            Contact Us
          </h2>
          <div className="text-[rgb(105,117,101)] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-2">Customer Support</h3>
                <p>Email: support@raritone.in</p>
                <p>Phone: +91 98765 43210</p>
                <p>Hours: Monday - Saturday, 9 AM - 8 PM IST</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-2">Business Inquiries</h3>
                <p>Email: business@raritone.in</p>
                <p>Phone: +91 98765 43211</p>
                <p>Hours: Monday - Friday, 10 AM - 6 PM IST</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-2">Office Address</h3>
              <p>RARITONE Fashion Technologies Pvt. Ltd.</p>
              <p>123 Fashion Street, Bandra West</p>
              <p>Mumbai, Maharashtra 400050</p>
              <p>India</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-2">Live Chat</h3>
              <p>
                Use our live chat feature available on every page for instant support. 
                Our AI-powered chat assistant is available 24/7, and human agents are 
                available during business hours.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default QuickLinks;