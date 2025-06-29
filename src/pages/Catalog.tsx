import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingBag } from 'lucide-react';
import { getProducts, Product } from '@/lib/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/user';
import { useToast } from '@/components/ToastContainer';
import ProductModal from '@/components/ProductModal';
import Navbar from '@/components/Navbar';
import { useLocation } from 'react-router-dom';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    color: '',
    sortBy: 'newest',
    stockStatus: ''
  });
  const { user, refreshCart, addToLocalCart } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  // Enhanced mock data with proper aspect ratios and clean stock management
  const mockProducts: Product[] = [
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
      createdAt: new Date()
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
      tags: ['Hoddie', 'designer', 'Cozy'],
      sizes: ['28', '30', '32', '34', '36'],
      createdAt: new Date()
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
      createdAt: new Date()
    },
    {
      id: '4',
      name: 'Pop Art tshirt',
      description: 'This wearable masterpiece showcases bold, colorful graphics that pay homage to the iconic Pop Art movement, making it a statement piece in any wardrobe. Designed for art enthusiasts and style-savvy individuals, it embodies the values of creativity and individuality we cherish at Theraritone. ',
      price: 434.13,
      imageURL: 'https://static.wixstatic.com/media/3903b5_4fde7750734f4f188841c462d77d27bb~mv2.jpg/v1/fill/w_500,h_667,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_4fde7750734f4f188841c462d77d27bb~mv2.jpg',
      category: 'Tops',
      stock: 0, // Out of stock
      tags: ['Tshirt', 'luxury', 'comfort'],
      sizes: ['XS', 'S', 'M', 'L'],
      createdAt: new Date()
    },
    {
      id: '5',
      name: 'Raritone David Bowie Hooodie',
      description: 'Celebrate the legacy of a music legend with the Raritone David Bowie Hoodie, designed exclusively for the discerning fan at Theraritone. Crafted from premium materials, this hoodie showcases Bowie’s iconic style while ensuring unparalleled comfort and durability. ',
      price: 7999,
      imageURL: 'https://static.wixstatic.com/media/3903b5_9e76791087d8471da8745d15ce88f383~mv2.jpg/v1/fill/w_346,h_490,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_9e76791087d8471da8745d15ce88f383~mv2.jpg',
      backImageURL: 'https://static.wixstatic.com/media/3903b5_d1930f8ee63542d0a3d165512779be61~mv2.jpg/v1/fill/w_348,h_490,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3903b5_d1930f8ee63542d0a3d165512779be61~mv2.jpg',
      category: 'Outerwear',
      stock: 4,
      tags: ['leather', 'jacket', 'premium'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Brown'],
      createdAt: new Date()
    },

  ];

  useEffect(() => {
    loadProducts();
    loadWishlist();
    
    // Check for category filter from URL params
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchQuery]);

  const loadProducts = async () => {
    // Instant loading with mock data
    setProducts(mockProducts);
  };

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Stock status filter
    if (filters.stockStatus === 'inStock') {
      filtered = filtered.filter(product => product.stock > 0);
    } else if (filters.stockStatus === 'outOfStock') {
      filtered = filtered.filter(product => product.stock === 0);
    }

    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'priceLow') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'priceHigh') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.stock - a.stock);
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (product: Product, quantity: number, size?: string, color?: string) => {
    const cartItem = {
      id: product.id!,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageURL: product.imageURL
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
        showToast({
          type: 'success',
          title: 'Added to Cart',
          message: `${product.name} has been added to your cart!`
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
      }
    } else {
      // Add to localStorage for guest users
      addToLocalCart(cartItem);
      showToast({
        type: 'success',
        title: 'Added to Cart',
        message: `${product.name} has been added to your cart!`
      });
    }
  };

  // UPDATED: Add to wishlist works for all users
  const addToWishlist = (productId: string) => {
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

  const quickAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    if (product.stock === 0) {
      showToast({
        type: 'warning',
        title: 'Out of Stock',
        message: 'This item is currently out of stock.'
      });
      return;
    }

    // For items with sizes/colors, open modal instead
    if ((product.sizes && product.sizes.length > 0) || (product.colors && product.colors.length > 0)) {
      handleProductClick(product);
      return;
    }

    // Quick add for simple items
    handleAddToCart(product, 1);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Fashion Catalog"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg shadow-sm p-4 sm:p-6 mb-8 border border-[rgb(105,117,101)]"
          style={{ backgroundColor: 'rgb(24, 28, 20)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(105,117,101)]" size={20} />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)] placeholder-[rgb(105,117,101)]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
            >
              <option value="">All Categories</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Dresses">Dresses</option>
              <option value="Footwear">Footwear</option>
            </select>

            {/* Stock Status Filter */}
            <select
              value={filters.stockStatus}
              onChange={(e) => setFilters({...filters, stockStatus: e.target.value})}
              className="px-4 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
            >
              <option value="">All Stock</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>

            {/* Size Filter */}
            <select
              value={filters.size}
              onChange={(e) => setFilters({...filters, size: e.target.value})}
              className="px-4 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
            >
              <option value="">All Sizes</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="px-4 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[rgb(105,117,101)]">
            Showing {filteredProducts.length} of {products.length} products
            {filters.category && (
              <span className="ml-2 text-[rgb(236,223,204)]">
                in {filters.category}
              </span>
            )}
          </p>
        </div>

        {/* RESPONSIVE Product Grid with Wishlist Hearts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[rgb(105,117,101)] cursor-pointer group"
              style={{ backgroundColor: 'rgb(24, 28, 20)' }}
              onClick={() => handleProductClick(product)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* RESPONSIVE Image Container */}
              <div className="w-full h-64 sm:h-72 lg:h-80 overflow-hidden relative">
                <motion.img
                  src={hoveredProduct === product.id && product.backImageURL ? product.backImageURL : product.imageURL}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg bg-black/50 px-4 py-2 rounded-lg">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* WISHLIST HEART BUTTON - Available for all users */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product.id!);
                    }}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      wishlist.includes(product.id!)
                        ? 'bg-red-500 text-white'
                        : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    <Heart 
                      size={16} 
                      className={wishlist.includes(product.id!) ? 'fill-current' : ''} 
                    />
                  </motion.button>

                  {/* QUICK ADD TO CART BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => quickAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className="p-2 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] rounded-full hover:bg-[rgb(220,210,190)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag size={16} />
                  </motion.button>
                </div>
              </div>
              
              {/* RESPONSIVE Product Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-medium text-[rgb(236,223,204)] mb-1 text-sm sm:text-base truncate">{product.name}</h3>
                <p className="text-xs sm:text-sm text-[rgb(105,117,101)] mb-2">{product.category}</p>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-base sm:text-lg font-semibold text-[rgb(236,223,204)]">₹{product.price}</p>
                  {/* Clean stock status */}
                  {product.stock > 0 ? (
                    <span className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-[rgb(60,61,55)] text-[rgb(105,117,101)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[rgb(105,117,101)]">No products found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  category: '',
                  size: '',
                  color: '',
                  sortBy: 'newest',
                  stockStatus: ''
                });
              }}
              className="mt-4 bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)]"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
};

export default Catalog;