'use client';

import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Menu, X, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
  pageTitle?: string;
  showBackButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = memo(({ onSearchOpen, onCartOpen, pageTitle, showBackButton = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, cart, logout } = useAuth();

  // Only enable scroll animations on homepage
  const isHomepage = location.pathname === '/';

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced scroll tracking for solid navbar (no transparency)
  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 100);
    };

    let ticking = false;
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', smoothScroll, { passive: true });
    return () => window.removeEventListener('scroll', smoothScroll);
  }, [isHomepage]);

  // Close menu when clicking outside or on route change
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-menu-container]')) {
          setIsMenuOpen(false);
        }
      }
    };

    // Load wishlist count from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Update wishlist count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistCount(JSON.parse(savedWishlist).length);
      } else {
        setWishlistCount(0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleProfileClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    if (user) {
      setIsProfileOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isProfileOpen) setIsProfileOpen(false);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  const menuItems = [
    { label: 'Shop', path: '/catalog', icon: ShoppingBag },
    { label: 'Body Scan', path: '/scan', icon: Search },
    { label: 'Settings', path: '/settings', icon: Menu }
  ];

  // Solid navbar animation variants (no transparency)
  const navbarVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <>
      {/* SOLID NAVBAR - Reference Style */}
      <motion.nav
        variants={isHomepage ? navbarVariants : undefined}
        initial={isHomepage ? "hidden" : undefined}
        animate={isHomepage ? (isVisible ? "visible" : "hidden") : undefined}
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          isHomepage ? 'bg-[rgb(105,117,101)]' : 'bg-[rgb(60,61,55)]'
        }`}
        style={{
          backgroundColor: isHomepage ? 'rgb(105, 117, 101)' : 'rgb(60, 61, 55)',
          position: 'sticky'
        }}
        data-menu-container
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left - Close/Back Button or Menu */}
            <div className="flex items-center w-24 sm:w-32">
              {showBackButton ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackClick}
                  className="flex items-center space-x-2 text-[rgb(236,223,204)] hover:text-white transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px]"
                >
                  <X size={isMobile ? 18 : 20} />
                  {!isMobile && <span className="text-sm font-medium">Close</span>}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMenuClick}
                  className="flex items-center space-x-2 text-[rgb(236,223,204)] hover:text-white transition-colors relative p-2 rounded-lg min-h-[40px] min-w-[40px]"
                >
                  {/* Hamburger Menu Icon */}
                  <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                    <motion.span
                      animate={{
                        rotate: isMenuOpen ? 45 : 0,
                        y: isMenuOpen ? 0 : -4,
                        scaleX: isMenuOpen ? 1.1 : 1,
                      }}
                      transition={{ 
                        duration: 0.2, 
                        ease: [0.4, 0, 0.2, 1],
                        type: "tween"
                      }}
                      className="absolute w-4 h-0.5 bg-current rounded-full"
                    />
                    <motion.span
                      animate={{
                        opacity: isMenuOpen ? 0 : 1,
                        scale: isMenuOpen ? 0.8 : 1,
                      }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.4, 0, 0.2, 1] 
                      }}
                      className="absolute w-4 h-0.5 bg-current rounded-full"
                    />
                    <motion.span
                      animate={{
                        rotate: isMenuOpen ? -45 : 0,
                        y: isMenuOpen ? 0 : 4,
                        scaleX: isMenuOpen ? 1.1 : 1,
                      }}
                      transition={{ 
                        duration: 0.2, 
                        ease: [0.4, 0, 0.2, 1],
                        type: "tween"
                      }}
                      className="absolute w-4 h-0.5 bg-current rounded-full"
                    />
                  </div>
                </motion.button>
              )}
            </div>

            {/* Center - Mini RARITONE Logo */}
            <div className="flex-1 flex justify-center items-center">
              {pageTitle ? (
                <div 
                  className="relative cursor-pointer flex items-center justify-center transition-colors"
                  onMouseEnter={() => setIsHoveringTitle(true)}
                  onMouseLeave={() => setIsHoveringTitle(false)}
                  onClick={handleTitleClick}
                  style={{ 
                    height: '64px',
                    width: '100%',
                    maxWidth: isMobile ? '250px' : '350px',
                    position: 'relative'
                  }}
                >
                  {/* Page Title */}
                  <motion.h1 
                    className="font-light text-[rgb(236,223,204)] transition-colors text-lg sm:text-xl absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: isHoveringTitle ? 0 : 1,
                      scale: isHoveringTitle ? 0.9 : 1,
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: [0.4, 0, 0.2, 1] 
                    }}
                  >
                    {pageTitle}
                  </motion.h1>
                  
                  {/* Mini Logo that appears on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: isHoveringTitle ? 1 : 0,
                      scale: isHoveringTitle ? 1.0 : 0.85,
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: [0.4, 0, 0.2, 1] 
                    }}
                  >
                    <img
                      src="/IMG-20250305-WA0003-removebg-preview.png"
                      alt="RARITONE"
                      style={{
                        filter: `brightness(1.15) contrast(1.08)`,
                        height: isMobile ? '32px' : '40px',
                        width: 'auto',
                        maxWidth: isMobile ? '120px' : '180px',
                        objectFit: 'contain'
                      }}
                    />
                  </motion.div>
                </div>
              ) : (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="cursor-pointer transition-colors"
                  onClick={() => navigate('/')}
                  style={{
                    filter: `brightness(1.15) contrast(1.08)`,
                    height: isMobile ? '32px' : '40px',
                    width: 'auto',
                    maxWidth: isMobile ? '120px' : '180px',
                    objectFit: 'contain'
                  }}
                />
              )}
            </div>

            {/* Right - Icons: Search, Wishlist, Shop, User */}
            <div className="flex items-center space-x-1 sm:space-x-2 w-24 sm:w-32 justify-end">
              {/* Search Icon */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={onSearchOpen}
                className="text-[rgb(236,223,204)] hover:text-white transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <Search size={isMobile ? 16 : 18} />
              </motion.button>
              
              {/* Wishlist Icon */}
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/wishlist')}
                className="relative text-[rgb(236,223,204)] hover:text-white transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <Heart size={isMobile ? 16 : 18} />
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Shop Icon (Cart) */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/cart')}
                className="relative text-[rgb(236,223,204)] hover:text-white transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <ShoppingBag size={isMobile ? 16 : 18} />
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute -top-1 -right-1 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>
              
              {/* User Profile Icon */}
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleProfileClick}
                className="text-[rgb(236,223,204)] hover:text-white transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <User size={isMobile ? 16 : 18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu Dropdown with Solid Background */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1]
              }}
              className="overflow-hidden border-t border-[rgb(236,223,204)]/20"
              style={{ backgroundColor: 'rgb(60, 61, 55)' }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.05,
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ y: -3 }}
                      className="bg-[rgb(24,28,20)] rounded-xl hover:bg-[rgb(105,117,101)] transition-colors"
                    >
                      <button
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-center text-[rgb(236,223,204)] hover:text-white transition-colors flex flex-col items-center rounded-xl px-3 py-4 sm:px-4 sm:py-6 space-y-2 sm:space-y-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                        >
                          <item.icon size={isMobile ? 18 : 22} />
                        </motion.div>
                        <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Profile Sidebar */}
      <AnimatePresence>
        {isProfileOpen && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 35, 
                stiffness: 400,
                duration: 0.3
              }}
              className="fixed right-0 top-0 h-full z-50 overflow-y-auto w-full max-w-sm"
              style={{ backgroundColor: 'rgb(60, 61, 55)' }}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="text-xl sm:text-2xl font-light text-[rgb(236,223,204)]"
                  >
                    Profile
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsProfileOpen(false)}
                    className="text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)] transition-colors p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                  >
                    <X size={isMobile ? 18 : 22} />
                  </motion.button>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="mb-8"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-[rgb(24,28,20)] rounded-full flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14"
                    >
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={isMobile ? 18 : 22} className="text-[rgb(236,223,204)]" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-[rgb(236,223,204)] text-base sm:text-lg">
                        {user.displayName || 'User'}
                      </h3>
                      <p className="text-[rgb(105,117,101)] text-sm sm:text-base">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-3">
                  {[
                    { label: 'Profile Info', path: '/profile' },
                    { label: 'Order History', path: '/orders' },
                    { label: 'Saved Items', path: '/wishlist' },
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.05 + 0.2,
                        duration: 0.25,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ x: -8 }}
                      onClick={() => {
                        navigate(action.path);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left text-[rgb(236,223,204)] bg-[rgb(24,28,20)] rounded-xl transition-colors hover:bg-[rgb(105,117,101)] px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
                    >
                      {action.label}
                    </motion.button>
                  ))}
                  
                  <motion.button
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.35,
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    whileHover={{ x: -8 }}
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left text-red-400 hover:bg-red-900/20 border border-red-500/30 rounded-xl transition-colors px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;