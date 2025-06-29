'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Sparkles, Star, TrendingUp, Mail, Phone, MapPin, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import { useToast } from '@/components/ToastContainer';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [cartToastItem, setCartToastItem] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, refreshCart, addToLocalCart } = useAuth();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load wishlist
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Enhanced Best Picks with detailed product information
  const bestPicks = [
    {
      id: '1',
      name: "Luxury Essentials",
      price: 2999,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
      backImageURL: "https://images.unsplash.com/photo-1566479179817-c0b5b4b8b1cc",
      rating: 4.8,
      category: "Dresses",
      description: "Elegant silk dress for special occasions. Luxurious fabric with timeless design that makes you stand out.",
      stock: 8,
      tags: ['luxury', 'silk', 'elegant'],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black', 'Navy', 'Burgundy']
    },
    {
      id: '2',
      name: "Street Couture",
      price: 3499,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
      backImageURL: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
      rating: 4.9,
      category: "Outerwear",
      description: "Premium streetwear hoodie with modern design. Perfect blend of comfort and style for urban fashion.",
      stock: 12,
      tags: ['streetwear', 'modern', 'comfort'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Grey', 'Black', 'White']
    },
    {
      id: '3',
      name: "Evening Collection",
      price: 4999,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      backImageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      rating: 4.7,
      category: "Formal",
      description: "Sophisticated evening wear collection. Crafted with premium materials for special occasions.",
      stock: 5,
      tags: ['evening', 'formal', 'premium'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Emerald']
    }
  ];

  const newArrivals = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: "₹1,999",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      tag: "New"
    },
    {
      id: 2,
      name: "Designer Jeans",
      price: "₹3,999",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      tag: "Trending"
    },
    {
      id: 3,
      name: "Luxury Hoodie",
      price: "₹2,999",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      tag: "Popular"
    },
    {
      id: 4,
      name: "Silk Dress",
      price: "₹5,999",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
      tag: "Exclusive"
    }
  ];

  const categories = [
    { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", count: "50+ Items", category: "Tops" },
    { name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", count: "30+ Items", category: "Outerwear" },
    { name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d", count: "40+ Items", category: "Bottoms" },
    { name: "Dresses", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446", count: "25+ Items", category: "Dresses" }
  ];

  // Navigate to catalog with category filter
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  // Handle Best Picks product click - opens modal
  const handleBestPickClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle add to cart from modal
  const handleAddToCart = async (product: any, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.image
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      // For non-authenticated users, add to localStorage
      addToLocalCart(cartItem);
    }

    // Show cart toast
    setCartToastItem(cartItem);
    setShowCartToast(true);
  };

  // Handle add to wishlist - UPDATED: Works for all users
  const handleAddToWishlist = (productId: string) => {
    const currentWishlist = [...wishlist];
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      setWishlist(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      
      // Dispatch custom event to update navbar count
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    } else {
      // Remove from wishlist
      const updatedWishlist = currentWishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Dispatch custom event to update navbar count
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: 'Item has been removed from your wishlist.'
      });
    }
  };

  // Quick add to wishlist for new arrivals
  const quickAddToWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    handleAddToWishlist(productId.toString());
  };

  return (
    <div className="min-h-screen text-[rgb(236,223,204)]" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      {/* Navigation - No page title or back button for homepage */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* RESPONSIVE Hero Section */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Fashion Model in RARITONE Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(24, 28, 20, 0.5)' }} />
        </div>

        {/* RESPONSIVE Logo and Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8">
          <div className="mb-8">
            <img
              src="/IMG-20250305-WA0003-removebg-preview.png"
              alt="RARITONE"
              className="mx-auto w-full max-w-xs sm:max-w-2xl h-auto"
            />
          </div>

          <p className="font-light mb-16 text-[rgb(236,223,204)] text-lg sm:text-xl">
            Fashion Meets Technology
          </p>

          {/* RESPONSIVE Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16">
            <button
              className="bg-transparent text-[rgb(236,223,204)] border border-[rgb(105,117,101)] font-medium hover:bg-[rgba(105,117,101,0.3)] flex items-center space-x-3 rounded-full justify-center transition-all duration-200 w-full max-w-xs sm:min-w-[220px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
              onClick={() => navigate('/scan')}
            >
              <Camera size={isMobile ? 18 : 20} />
              <span>Start Body Scan</span>
            </button>
            
            <button
              className="bg-transparent text-[rgb(236,223,204)] border border-[rgb(105,117,101)] font-medium hover:bg-[rgba(105,117,101,0.3)] flex items-center space-x-3 rounded-full justify-center transition-all duration-200 w-full max-w-xs sm:min-w-[220px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
              onClick={() => navigate('/catalog')}
            >
              <ShoppingBag size={isMobile ? 18 : 20} />
              <span>Browse Collection</span>
            </button>
          </div>

          {/* RESPONSIVE Notice Text */}
          <p className="max-w-md mx-auto leading-relaxed text-xs sm:text-sm px-4" style={{ color: '#ECDFCC' }}>
            This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
          </p>
        </div>
      </div>

      {/* FIXED GRID: New Arrivals Section */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
              <Sparkles className="mr-3" size={isMobile ? 24 : 32} />
              New Arrivals
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto text-sm sm:text-base px-4">
              Discover our latest collections, meticulously crafted and designed for the modern luxury connoisseur.
            </p>
          </div>

          {/* FIXED RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="bg-[rgb(24,28,20)] rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[rgb(236,223,204)] text-[rgb(24,28,20)] font-medium rounded px-2 py-1 text-xs">
                        {item.tag}
                      </span>
                    </div>
                    
                    {/* WISHLIST HEART BUTTON - Available for all users */}
                    <button
                      onClick={(e) => quickAddToWishlist(e, item.id.toString())}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                        wishlist.includes(item.id.toString())
                          ? 'bg-red-500 text-white'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Heart 
                        size={14} 
                        className={wishlist.includes(item.id.toString()) ? 'fill-current' : ''} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 text-[rgb(236,223,204)] text-base sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-[rgb(105,117,101)] text-sm">
                      From {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIXED GRID: Categories Section */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
              <TrendingUp className="mr-3" size={isMobile ? 24 : 32} />
              Shop by Category
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto text-sm sm:text-base px-4">
              Explore our diverse range of fashion categories, each carefully curated for your unique style.
            </p>
          </div>

          {/* FIXED RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="bg-[rgb(60,61,55)] rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="text-center p-4">
                    <h3 className="font-medium mb-1 text-[rgb(236,223,204)] text-base sm:text-lg">
                      {category.name}
                    </h3>
                    <p className="text-[rgb(105,117,101)] text-sm">
                      {category.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIXED GRID: Best Picks Section */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl">
              <Star className="mr-3" size={isMobile ? 24 : 32} />
              Best Picks
            </h2>
            <p className="text-[rgb(105,117,101)] max-w-2xl mx-auto text-sm sm:text-base px-4">
              Our most popular items, loved by customers worldwide for their exceptional quality and style.
            </p>
          </div>

          {/* FIXED RESPONSIVE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {bestPicks.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => handleBestPickClick(item)}
              >
                <div className="bg-[rgb(24,28,20)] rounded-lg shadow-md border border-[rgb(105,117,101)] overflow-hidden">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* WISHLIST HEART BUTTON - Available for all users */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(item.id);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                        wishlist.includes(item.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Heart 
                        size={16} 
                        className={wishlist.includes(item.id) ? 'fill-current' : ''} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[rgb(236,223,204)] text-base sm:text-lg">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-[rgb(105,117,101)] text-sm">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-[rgb(105,117,101)] text-sm">
                      From ₹{item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPROVED Footer Section */}
      <footer className="py-8 sm:py-16 border-t border-[rgb(105,117,101)]" style={{ backgroundColor: 'rgb(24, 28, 20)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="h-16 sm:h-20 w-auto mb-4"
              />
              <p className="text-[rgb(105,117,101)] max-w-md leading-relaxed text-sm sm:text-base">
                Revolutionizing fashion with AI-powered body scanning technology. 
                Experience perfect fit and personalized style recommendations across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-[rgb(236,223,204)] mb-4 text-base sm:text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/shipping" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] text-sm sm:text-base transition-colors">Shipping & Delivery</a></li>
                <li><a href="/returns" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] text-sm sm:text-base transition-colors">Returns & Exchanges</a></li>
                <li><a href="/faqs" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] text-sm sm:text-base transition-colors">FAQs</a></li>
                <li><a href="/terms" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] text-sm sm:text-base transition-colors">Terms & Conditions</a></li>
                <li><a href="/contact" className="text-[rgb(105,117,101)] hover:text-[rgb(236,223,204)] text-sm sm:text-base transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-[rgb(236,223,204)] mb-4 text-base sm:text-lg">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-[rgb(105,117,101)]" />
                  <span className="text-[rgb(105,117,101)] text-sm sm:text-base">
                    hello@raritone.in
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-[rgb(105,117,101)]" />
                  <span className="text-[rgb(105,117,101)] text-sm sm:text-base">
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-[rgb(105,117,101)]" />
                  <span className="text-[rgb(105,117,101)] text-sm sm:text-base">
                    Mumbai, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[rgb(105,117,101)] mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-[rgb(105,117,101)] text-xs sm:text-sm">
              © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
            </p>
          </div>
        </div>
      </footer>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />

      {/* Add to Cart Toast */}
      <AddToCartToast
        isOpen={showCartToast}
        onClose={() => setShowCartToast(false)}
        item={cartToastItem}
        onViewCart={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
        onCheckout={() => {
          setShowCartToast(false);
          navigate('/cart');
        }}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;