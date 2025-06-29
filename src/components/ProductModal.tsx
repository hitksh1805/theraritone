import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingBag, Plus, Minus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ToastContainer';

interface Product {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  backImageURL?: string;
  category: string;
  description: string;
  stock: number;
  tags: string[];
  sizes?: string[];
  colors?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onAddToWishlist: (productId: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showColorError, setShowColorError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { showToast } = useToast();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setSelectedSize('');
      setSelectedColor('');
      setQuantity(1);
      setShowSizeError(false);
      setShowColorError(false);
    }
  }, [isOpen, product]);

  if (!product) return null;

  const images = [product.imageURL];
  if (product.backImageURL) {
    images.push(product.backImageURL);
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    // Reset error states
    setShowSizeError(false);
    setShowColorError(false);

    // Validate size selection
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setShowSizeError(true);
      showToast({
        type: 'warning',
        title: 'Size Required',
        message: 'Please select a size before adding to cart.'
      });
      return;
    }

    // Validate color selection
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setShowColorError(true);
      showToast({
        type: 'warning',
        title: 'Color Required',
        message: 'Please select a color before adding to cart.'
      });
      return;
    }
    
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const isOutOfStock = product.stock === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* FIXED HEIGHT Modal - NO SCROLL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="fixed inset-4 sm:inset-8 z-50 bg-white rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto my-auto"
            style={{ 
              height: '90vh',
              maxHeight: '800px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full">
              {/* Image Section - 50% width */}
              <div className="w-1/2 relative flex items-center justify-center bg-gray-50">
                <div className="w-full h-full max-w-md mx-auto p-6 flex items-center justify-center">
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg border">
                    <img
                      src={images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Image Navigation */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors p-2"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors p-2"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Section - 50% width - FIXED HEIGHT NO SCROLL */}
              <div className="w-1/2 flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end p-4 flex-shrink-0">
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100 p-2"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content - FIXED HEIGHT WITH INTERNAL LAYOUT */}
                <div className="flex-1 px-6 pb-6 flex flex-col justify-between overflow-hidden">
                  {/* Product Info - Top Section */}
                  <div className="flex-shrink-0">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    <p className="text-gray-600 mb-2">
                      {product.category}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ₹{product.price}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm mb-4">
                      {product.description}
                    </p>

                    {/* Stock Status */}
                    {isOutOfStock && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 font-medium">Out of Stock</p>
                      </div>
                    )}
                  </div>

                  {/* Middle Section - Scrollable if needed */}
                  <div className="flex-1 overflow-y-auto min-h-0 space-y-4">
                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Size</h3>
                        {showSizeError && (
                          <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-2">
                            <AlertTriangle className="text-yellow-600" size={16} />
                            <p className="text-yellow-700 text-sm">Please select a size</p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                setSelectedSize(size);
                                setShowSizeError(false);
                              }}
                              className={`border rounded-lg px-3 py-2 text-sm transition-colors ${
                                selectedSize === size
                                  ? 'bg-black text-white border-black'
                                  : showSizeError
                                  ? 'border-yellow-400 text-gray-900 hover:bg-yellow-50'
                                  : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                              }`}
                              disabled={isOutOfStock}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Color</h3>
                        {showColorError && (
                          <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-2">
                            <AlertTriangle className="text-yellow-600" size={16} />
                            <p className="text-yellow-700 text-sm">Please select a color</p>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                setSelectedColor(color);
                                setShowColorError(false);
                              }}
                              className={`border rounded-lg px-3 py-2 text-sm transition-colors ${
                                selectedColor === color
                                  ? 'bg-black text-white border-black'
                                  : showColorError
                                  ? 'border-yellow-400 text-gray-900 hover:bg-yellow-50'
                                  : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                              }`}
                              disabled={isOutOfStock}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-700 rounded-full border border-gray-200 px-3 py-1 text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Section - Actions */}
                  <div className="flex-shrink-0 space-y-4 pt-4 border-t">
                    {/* Quantity Selection */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors p-2"
                          disabled={isOutOfStock}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium text-gray-900 min-w-[3rem] text-center text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors p-2"
                          disabled={isOutOfStock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-3"
                      >
                        <ShoppingBag size={20} />
                        <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
                      </Button>

                      <Button
                        onClick={() => onAddToWishlist(product.id)}
                        variant="outline"
                        className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 rounded-xl flex items-center justify-center space-x-2 py-3"
                      >
                        <Heart size={20} />
                        <span>Add to Wishlist</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;