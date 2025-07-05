'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShoppingBag, Sparkles, Star, TrendingUp, Mail, Phone, MapPin, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';
import ProductModal from '@/components/ProductModal';
import AddToCartToast from '@/components/AddToCartToast';
import ButterflyScene from '@/components/ButterflyScene';
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

  // Product data
  const catalogProducts = [
    {
      id: '1',
      name: 'Bold vibe Oversize Tshirt',
      description: 'Luxury cotton t-shirt with premium finish and exceptional comfort. Made from 100% organic cotton.',
      price: 696.00,
      imageURL: 'Raritone Collection/Bold vibe Oversize Tshirt.jpg',
      category: 'Tops',
      stock: 10,
      tags: ['Cotton', 'Premium', 'Casual'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      createdAt: new Date(),
      rating: 4.8
    },
    {
      id: '2',
      name: 'Raritone Hoodie',
      description: 'Raritone Hoodie from Theraritone. Crafted from premium materials, this hoodie ensures warmth and durability while offering a modern, minimalist design perfect for any wardrobe.',
      price: 1043.13,
      imageURL: 'Raritone Collection/Hoddie1(F).jpg',
      backImageURL: 'Raritone Collection/Hoddie1(B).jpg',
      category: 'Outerwear',
      stock: 5,
      tags: ['Hoodie', 'designer', 'Cozy'],
      sizes: ['28', '30', '32', '34', '36'],
      createdAt: new Date(),
      rating: 4.9
    },
    {
      id: '3',
      name: 'Kiss me again Oversize Tshirt',
      description: 'Its soft, premium fabric ensures lasting wear, while the chic, modern design adds a touch of effortless cool.',
      price: 399.20,
      imageURL: 'Raritone Collection/Kiss me again.jpeg',
      category: 'Tops',
      stock: 8,
      tags: ['Tshirt', 'luxury', 'comfort'],
      sizes: ['S', 'M', 'L', 'XL'],
      createdAt: new Date(),
      rating: 4.7
    },
    {
      id: '4',
      name: 'Pop Art tshirt',
      description: 'This wearable masterpiece showcases bold, colorful graphics that pay homage to the iconic Pop Art movement, making it a statement piece in any wardrobe.',
      price: 434.13,
      imageURL: 'https://static.wixstatic.com/media/3903b5_4fde7750734f4f188841c462d77d27bb~mv2.jpg/v1/fill/w_500,h_667,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_4fde7750734f4f188841c462d77d27bb~mv2.jpg',
      category: 'Tops',
      stock: 0,
      tags: ['Tshirt', 'luxury', 'comfort'],
      sizes: ['XS', 'S', 'M', 'L'],
      createdAt: new Date(),
      rating: 4.6
    },
    {
      id: '5',
      name: 'Raritone David Bowie Hoodie',
      description: 'Celebrate the legacy of a music legend with the Raritone David Bowie Hoodie, designed exclusively for the discerning fan at Theraritone.',
      price: 7999,
      imageURL: 'https://static.wixstatic.com/media/3903b5_9e76791087d8471da8745d15ce88f383~mv2.jpg/v1/fill/w_346,h_490,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_9e76791087d8471da8745d15ce88f383~mv2.jpg',
      backImageURL: 'https://static.wixstatic.com/media/3903b5_d1930f8ee63542d0a3d165512779be61~mv2.jpg/v1/fill/w_348,h_490,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_d1930f8ee63542d0a3d165512779be61~mv2.jpg',
      category: 'Outerwear',
      stock: 4,
      tags: ['leather', 'jacket', 'premium'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Brown'],
      createdAt: new Date(),
      rating: 4.9
    }
  ];

  // New Arrivals
  const newArrivals = catalogProducts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)
    .map(product => ({
      id: product.id,
      name: product.name,
      price: `₹${product.price}`,
      image: product.imageURL,
      tag: product.stock === 0 ? 'Out of Stock' : 'New'
    }));

  // Categories
  const categories = [
    { 
      name: "T-Shirts", 
      image: catalogProducts.find(p => p.category === 'Tops')?.imageURL || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", 
      count: `${catalogProducts.filter(p => p.category === 'Tops').length} Items`, 
      category: "Tops" 
    },
    { 
      name: "Hoodies", 
      image: catalogProducts.find(p => p.tags.includes('Hoodie'))?.imageURL || "https://images.unsplash.com/photo-1556821840-3a63f95609a7", 
      count: `${catalogProducts.filter(p => p.tags.includes('Hoodie')).length} Items`, 
      category: "Outerwear" 
    },
    { 
      name: "Outerwear", 
      image: catalogProducts.find(p => p.category === 'Outerwear')?.imageURL || "https://images.unsplash.com/photo-1542272604-787c3835535d", 
      count: `${catalogProducts.filter(p => p.category === 'Outerwear').length} Items`, 
      category: "Outerwear" 
    },
    { 
      name: "Premium", 
      image: catalogProducts.find(p => p.tags.includes('premium'))?.imageURL || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446", 
      count: `${catalogProducts.filter(p => p.tags.includes('premium')).length} Items`, 
      category: "Premium" 
    }
  ];

  // Best Picks
  const bestPicks = catalogProducts
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3)
    .map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageURL,
      backImageURL: product.backImageURL,
      rating: product.rating || 4.5,
      category: product.category,
      description: product.description,
      stock: product.stock,
      tags: product.tags,
      sizes: product.sizes,
      colors: product.colors
    }));

  // Navigate to catalog with category filter
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${encodeURIComponent(category)}`);
  };

  // Handle Best Picks product click
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
      addToLocalCart(cartItem);
    }

    setCartToastItem(cartItem);
    setShowCartToast(true);
  };

  // Handle add to wishlist
  const handleAddToWishlist = (productId: string) => {
    const currentWishlist = [...wishlist];
    if (!currentWishlist.includes(productId)) {
      currentWishlist.push(productId);
      setWishlist(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
      
      window.dispatchEvent(new Event('wishlistUpdated'));
      
      showToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item has been saved to your wishlist!'
      });
    } else {
      const updatedWishlist = currentWishlist.filter(id => id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
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
    <div className="min-h-screen text-[rgb(236,223,204)]" style={{ background: 'linear-gradient(135deg, #2a2d2a 0%, #1a1d1a 100%)' }}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* ENHANCED HERO SECTION WITH LARGE BUTTERFLY */}
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Large Realistic Butterfly Background */}
        <ButterflyScene />
        
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" style={{ zIndex: 2 }} />

        {/* Hero Content - PERFECTLY CENTERED LOGO */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8" style={{ zIndex: 3 }}>
          <div className="p-8 sm:p-12 lg:p-16">
            {/* DOMINANT RARITONE LOGO - Perfectly Centered */}
            <div className="mb-8">
              <img
                src="/IMG-20250305-WA0003-removebg-preview.png"
                alt="RARITONE"
                className="mx-auto w-full max-w-sm sm:max-w-2xl h-auto"
                style={{ 
                  filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.9)) brightness(1.3)',
                  textShadow: '0 0 30px rgba(255,255,255,0.7)',
                  position: 'relative',
                  zIndex: 10
                }}
              />
            </div>

            <p className="text-subtitle font-light mb-16 text-[rgb(236,223,204)] opacity-95" 
               style={{ 
                 textShadow: '0 2px 15px rgba(0,0,0,0.9)',
                 filter: 'brightness(1.2)'
               }}>
              Fashion Meets Technology
            </p>

            {/* Action Buttons with Enhanced Visibility */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16">
              <button
                className="font-medium flex items-center space-x-3 rounded-full justify-center w-full max-w-xs sm:min-w-[220px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/scan')}
                style={{
                  background: 'rgba(236, 223, 204, 0.15)',
                  border: '1px solid rgba(236, 223, 204, 0.4)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  color: 'rgb(236, 223, 204)'
                }}
              >
                <Camera size={isMobile ? 18 : 20} />
                <span>Start Body Scan</span>
              </button>
              
              <button
                className="font-medium flex items-center space-x-3 rounded-full justify-center w-full max-w-xs sm:min-w-[220px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/catalog')}
                style={{
                  background: 'rgba(236, 223, 204, 0.95)',
                  color: 'rgb(24, 28, 20)',
                  border: '1px solid rgba(236, 223, 204, 1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(236, 223, 204, 0.3)'
                }}
              >
                <ShoppingBag size={isMobile ? 18 : 20} />
                <span>Browse Collection</span>
              </button>
            </div>

            {/* Notice Text with Better Visibility */}
            <p className="max-w-md mx-auto leading-relaxed text-xs sm:text-sm px-4 opacity-85"
               style={{ 
                 textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                 background: 'rgba(0,0,0,0.3)',
                 padding: '8px 16px',
                 borderRadius: '8px',
                 backdropFilter: 'blur(10px)'
               }}>
              This site uses webcam access to enable AI-powered try-ons. Your camera data is never stored or shared.
            </p>
          </div>
        </div>
      </div>

      {/* NEW ARRIVALS SECTION */}
      <section className="py-12 sm:py-20" style={{ background: 'linear-gradient(135deg, #1a1d1a 0%, #2a2d2a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-hero font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <Sparkles className="mr-3" size={isMobile ? 24 : 32} />
              New Arrivals
            </h2>
            <p className="text-subtitle text-[rgb(105,117,101)] max-w-2xl mx-auto px-4">
              Discover our latest collections, meticulously crafted and designed for the modern luxury connoisseur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => navigate('/catalog')}
              >
                <div className="glass-card rounded-2xl overflow-hidden transition-glass hover-glass">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`font-medium rounded-full px-3 py-1 text-xs backdrop-blur-md ${
                        item.tag === 'Out of Stock' 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-white/20 text-white border border-white/30'
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                    
                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => quickAddToWishlist(e, item.id.toString())}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-md ${
                        wishlist.includes(item.id.toString())
                          ? 'bg-red-500/80 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
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
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-12 sm:py-20" style={{ background: 'linear-gradient(135deg, #2a2d2a 0%, #1a1d1a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-hero font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <TrendingUp className="mr-3" size={isMobile ? 24 : 32} />
              Shop by Category
            </h2>
            <p className="text-subtitle text-[rgb(105,117,101)] max-w-2xl mx-auto px-4">
              Explore our diverse range of fashion categories, each carefully curated for your unique style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="glass-card rounded-2xl overflow-hidden transition-glass hover-glass">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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

      {/* BEST PICKS SECTION */}
      <section className="py-12 sm:py-20" style={{ background: 'linear-gradient(135deg, #1a1d1a 0%, #2a2d2a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-hero font-light mb-4 text-[rgb(236,223,204)] flex items-center justify-center">
              <Star className="mr-3" size={isMobile ? 24 : 32} />
              Best Picks
            </h2>
            <p className="text-subtitle text-[rgb(105,117,101)] max-w-2xl mx-auto px-4">
              Our most popular items, loved by customers worldwide for their exceptional quality and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {bestPicks.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => handleBestPickClick(item)}
              >
                <div className="glass-card rounded-2xl overflow-hidden transition-glass hover-glass">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(item.id);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 backdrop-blur-md ${
                        wishlist.includes(item.id)
                          ? 'bg-red-500/80 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
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
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="py-8 sm:py-16 border-t border-white/10" style={{ background: 'linear-gradient(135deg, #2a2d2a 0%, #1a1d1a 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
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

            <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
              <p className="text-[rgb(105,117,101)] text-xs sm:text-sm">
                © 2025 RARITONE. All rights reserved. | Powered by AI Fashion Technology | Made in India
              </p>
            </div>
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