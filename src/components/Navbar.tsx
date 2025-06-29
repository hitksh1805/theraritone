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

  // Enhanced scroll tracking for ultra-smooth 120fps animations
  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Ultra-smooth navbar appearance with enhanced threshold
      setIsVisible(currentScrollY > 120);
    };

    // Ultra-high performance scroll listener optimized for 120fps
    let ticking = false;
    const ultraSmoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for maximum performance
    window.addEventListener('scroll', ultraSmoothScroll, { passive: true });
    return () => window.removeEventListener('scroll', ultraSmoothScroll);
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

    // Load wishlist count from localStorage (works for both logged and non-logged users)
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
    
    // Also listen for custom wishlist update events
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

  // Ultra-smooth 120fps navbar animation variants
  const navbarVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: { 
        duration: 0.25, 
        ease: [0.16, 1, 0.3, 1] // Ultra-smooth cubic bezier for 120fps
      }
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.25, 
        ease: [0.16, 1, 0.3, 1] // Ultra-smooth cubic bezier for 120fps
      }
    }
  };

  // Enhanced translucent navbar with better blur and opacity
  const backdropBlur = isHomepage ? Math.min(scrollY / 10, 30) : 30;
  const navbarOpacity = isHomepage ? Math.min(scrollY / 200, 0.9) : 0.9;

  return (
    <>
      {/* FIXED HEIGHT NAVBAR - 64px */}
      <motion.nav
        variants={isHomepage ? navbarVariants : undefined}
        initial={isHomepage ? "hidden" : undefined}
        animate={isHomepage ? (isVisible ? "visible" : "hidden") : undefined}
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200"
        style={{ 
          backgroundColor: `rgba(105, 117, 101, ${navbarOpacity})`,
          borderBottom: '1px solid rgba(236, 223, 204, 0.3)',
          backdropFilter: `blur(${backdropBlur}px) saturate(200%)`,
          WebkitBackdropFilter: `blur(${backdropBlur}px) saturate(200%)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          willChange: 'transform, opacity'
        }}
        data-menu-container
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left - Back Button or Menu */}
            <div className="flex items-center w-24 sm:w-32">
              {showBackButton ? (
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                  }}
                  onClick={handleBackClick}
                  className="flex items-center space-x-2 text-[rgb(236,223,204)] hover:text-white transition-all duration-150 p-2 rounded-lg min-h-[40px] min-w-[40px]"
                  style={{ willChange: 'transform' }}
                >
                  <ArrowLeft size={isMobile ? 18 : 20} />
                  {!isMobile && <span className="text-sm font-medium">Back</span>}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                  }}
                  onClick={handleMenuClick}
                  className="flex items-center space-x-2 text-[rgb(236,223,204)] hover:text-white transition-all duration-150 relative p-2 rounded-lg min-h-[40px] min-w-[40px]"
                  style={{ willChange: 'transform' }}
                >
                  {/* Ultra-smooth Hamburger to Cross Animation */}
                  <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                    <motion.span
                      animate={{
                        rotate: isMenuOpen ? 45 : 0,
                        y: isMenuOpen ? 0 : -4,
                        scaleX: isMenuOpen ? 1.1 : 1,
                      }}
                      transition={{ 
                        duration: 0.2, 
                        ease: [0.16, 1, 0.3, 1],
                        type: "tween"
                      }}
                      className="absolute w-4 h-0.5 bg-current rounded-full"
                      style={{ transformOrigin: 'center', willChange: 'transform' }}
                    />
                    <motion.span
                      animate={{
                        opacity: isMenuOpen ? 0 : 1,
                        scale: isMenuOpen ? 0.8 : 1,
                      }}
                      transition={{ 
                        duration: 0.15, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="absolute w-4 h-0.5 bg-current rounded-full"
                      style={{ willChange: 'transform, opacity' }}
                    />
                    <motion.span
                      animate={{
                        rotate: isMenuOpen ? -45 : 0,
                        y: isMenuOpen ? 0 : 4,
                        scaleX: isMenuOpen ? 1.1 : 1,
                      }}
                      transition={{ 
                        duration: 0.2, 
                        ease: [0.16, 1, 0.3, 1],
                        type: "tween"
                      }}
                      className="absolute w-4 h-0.5 bg-current rounded-full"
                      style={{ transformOrigin: 'center', willChange: 'transform' }}
                    />
                  </div>
                  
                  {!isMobile && (
                    <motion.span 
                      className="text-sm font-medium relative"
                      animate={{ 
                        opacity: 1,
                        x: 0,
                        color: isMenuOpen ? 'rgb(236,223,204)' : 'rgb(236,223,204)'
                      }}
                      transition={{ 
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {isMenuOpen ? 'Close' : 'Menu'}
                    </motion.span>
                  )}
                </motion.button>
              )}
            </div>

            {/* Center - Logo or Page Title - INCREASED LOGO SIZE */}
            <div className="flex-1 flex justify-center items-center">
              {pageTitle ? (
                <div 
                  className="relative cursor-pointer flex items-center justify-center"
                  onMouseEnter={() => setIsHoveringTitle(true)}
                  onMouseLeave={() => setIsHoveringTitle(false)}
                  onClick={handleTitleClick}
                  style={{ 
                    willChange: 'transform',
                    height: '64px', // Match navbar height
                    width: '100%',
                    maxWidth: isMobile ? '250px' : '350px',
                    position: 'relative'
                  }}
                >
                  {/* Page Title */}
                  <motion.h1 
                    className="font-medium text-[rgb(236,223,204)] transition-all duration-200 text-lg sm:text-xl absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: isHoveringTitle ? 0 : 1,
                      scale: isHoveringTitle ? 0.9 : 1,
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {pageTitle}
                  </motion.h1>
                  
                  {/* INCREASED: Logo that appears on hover - LARGER SIZE */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: isHoveringTitle ? 1 : 0,
                      scale: isHoveringTitle ? 1.0 : 0.85,
                    }}
                    transition={{ 
                      duration: 0.2, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <img
                      src="/IMG-20250305-WA0003-removebg-preview.png"
                      alt="RARITONE"
                      style={{
                        filter: `brightness(1.15) contrast(1.08) drop-shadow(0 3px 12px rgba(0,0,0,0.25))`,
                        height: isMobile ? '56px' : '60px', // INCREASED: Much larger logo size
                        width: 'auto',
                        maxWidth: isMobile ? '200px' : '300px', // INCREASED: Wider max width
                        objectFit: 'contain'
                      }}
                    />
                  </motion.div>
                </div>
              ) : (
                <motion.img
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                  }}
                  src="/IMG-20250305-WA0003-removebg-preview.png"
                  alt="RARITONE"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => navigate('/')}
                  style={{
                    filter: `brightness(1.15) contrast(1.08) drop-shadow(0 3px 12px rgba(0,0,0,0.25))`,
                    height: isMobile ? '56px' : '60px', // INCREASED: Much larger logo size for homepage
                    width: 'auto',
                    maxWidth: isMobile ? '220px' : '320px', // INCREASED: Wider max width
                    willChange: 'transform',
                    objectFit: 'contain'
                  }}
                />
              )}
            </div>

            {/* Right - Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2 w-24 sm:w-32 justify-end">
              <motion.button
                whileHover={{ 
                  scale: 1.15,
                  rotate: 5,
                  transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                }}
                onClick={onSearchOpen}
                className="text-[rgb(236,223,204)] hover:text-white transition-all duration-150 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <Search size={isMobile ? 16 : 18} />
              </motion.button>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                }}
                onClick={() => navigate('/wishlist')}
                className="relative text-[rgb(236,223,204)] hover:text-white transition-all duration-150 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <Heart size={isMobile ? 16 : 18} />
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                    style={{ willChange: 'transform' }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                }}
                onClick={() => navigate('/cart')}
                className="relative text-[rgb(236,223,204)] hover:text-white transition-all duration-150 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <ShoppingBag size={isMobile ? 16 : 18} />
                {cartItemsCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -top-1 -right-1 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                    style={{ willChange: 'transform' }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.15,
                  transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                }}
                onClick={handleProfileClick}
                className="text-[rgb(236,223,204)] hover:text-white transition-all duration-150 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                style={{ willChange: 'transform' }}
              >
                <User size={isMobile ? 16 : 18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                duration: 0.25, 
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ 
                backgroundColor: 'rgba(24, 28, 20, 0.95)',
                borderTop: '1px solid rgba(105, 117, 101, 0.3)',
                backdropFilter: 'blur(25px) saturate(200%)',
                WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                willChange: 'height, opacity'
              }}
              className="overflow-hidden"
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
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={{ 
                        y: -3,
                        transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="rounded-xl hover:bg-[rgba(60,61,55,0.8)] transition-all duration-200"
                      style={{ willChange: 'transform' }}
                    >
                      <button
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-center text-[rgb(236,223,204)] hover:text-white transition-all duration-150 flex flex-col items-center rounded-xl px-3 py-4 sm:px-4 sm:py-6 space-y-2 sm:space-y-3"
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 5,
                            transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                          }}
                          style={{ willChange: 'transform' }}
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
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsProfileOpen(false)}
              style={{ willChange: 'opacity' }}
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
              style={{ 
                backgroundColor: 'rgb(24, 28, 20)',
                willChange: 'transform, opacity'
              }}
              className="fixed right-0 top-0 h-full z-50 shadow-2xl overflow-y-auto w-full max-w-sm"
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl font-semibold text-[rgb(236,223,204)]"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    Profile
                  </motion.h2>
                  <motion.button
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 90,
                      transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      transition: { duration: 0.05, ease: [0.16, 1, 0.3, 1] }
                    }}
                    onClick={() => setIsProfileOpen(false)}
                    className="text-[rgb(236,223,204)] hover:text-[rgb(105,117,101)] transition-all duration-150 p-2 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center"
                    style={{ willChange: 'transform' }}
                  >
                    <X size={isMobile ? 18 : 22} />
                  </motion.button>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-6">
                    <motion.div 
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                      }}
                      className="bg-[rgb(60,61,55)] rounded-full flex items-center justify-center border border-[rgb(105,117,101)] w-12 h-12 sm:w-14 sm:h-14"
                      style={{ willChange: 'transform' }}
                    >
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User size={isMobile ? 18 : 22} className="text-[rgb(236,223,204)]" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-[rgb(236,223,204)] text-base sm:text-lg">
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
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      whileHover={{ 
                        x: -8,
                        transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                      }}
                      onClick={() => {
                        navigate(action.path);
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] border border-[rgb(105,117,101)] rounded-xl transition-all duration-150 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
                      style={{ willChange: 'transform, opacity' }}
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
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ 
                      x: -8,
                      transition: { duration: 0.1, ease: [0.16, 1, 0.3, 1] }
                    }}
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left text-red-400 hover:bg-red-900/20 border border-red-500 rounded-xl transition-all duration-150 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base"
                    style={{ willChange: 'transform, opacity' }}
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