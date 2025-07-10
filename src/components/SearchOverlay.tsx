'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, TrendingUp } from 'lucide-react';
import { searchProducts, getLatestProducts, Product } from '@/lib/product';
import { useAuth } from '@/contexts/AuthContext';
import { addRecentSearch } from '@/lib/user';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const trendingSearches = ['luxury shirts', 'designer jeans', 'evening wear', 'casual tops', 'accessories'];

  useEffect(() => {
    if (isOpen) {
      loadSuggestedProducts();
      loadRecentSearches();
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch(searchQuery);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadSuggestedProducts = async () => {
    try {
      const products = await getLatestProducts(8);
      setSuggestedProducts(products);
    } catch (error) {
      console.error('Error loading suggested products:', error);
      // Mock data for demo
      setSuggestedProducts([
        {
          id: '1',
          name: 'Premium Cotton T-Shirt',
          price: 1999,
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
          category: 'Tops',
          description: 'Luxury cotton t-shirt',
          stock: 10,
          tags: ['cotton', 'premium', 'casual'],
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'Designer Jeans',
          price: 3999,
          imageURL: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
          category: 'Bottoms',
          description: 'Premium designer jeans',
          stock: 5,
          tags: ['jeans', 'designer', 'denim'],
          createdAt: new Date()
        }
      ]);
    }
  };

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchProducts(query);
      setSearchResults(results);
      
      // Add to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      if (user) {
        await addRecentSearch(user.uid, query);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Mock search results for demo
      setSearchResults(suggestedProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    window.location.href = `/product/${product.id}`;
  };

  const handleTrendingClick = (term: string) => {
    setSearchQuery(term);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ backgroundColor: '#222831' }}
    >
      <div className="min-h-screen">
        {/* Header */}
        <div 
          className="border-b p-6"
          style={{ 
            backgroundColor: '#181C14',
            borderColor: '#697565'
          }}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex-1 mr-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#948979]" size={20} />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-dark w-full pl-12 pr-4 py-4 text-lg rounded-lg"
                />
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#393E46] rounded-full text-[#DFD0B8] fast-transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-6">
          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DFD0B8]"></div>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && !isLoading && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-[#DFD0B8]">Search Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="cursor-pointer group"
                    onClick={() => handleProductClick(product)}
                  >
                    <div 
                      className="aspect-square relative mb-2 overflow-hidden rounded-lg border"
                      style={{ borderColor: '#697565' }}
                    >
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 fast-transition"
                      />
                    </div>
                    <h4 className="font-medium text-sm text-[#DFD0B8]">{product.name}</h4>
                    <p className="text-[#948979] text-sm">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {!searchQuery && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-[#DFD0B8] flex items-center">
                <TrendingUp className="mr-2" size={20} />
                Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingClick(search)}
                    className="btn-secondary px-4 py-2 rounded-full text-sm"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !searchQuery && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-[#DFD0B8]">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="btn-secondary px-4 py-2 rounded-full text-sm"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* New This Season */}
          {suggestedProducts.length > 0 && !searchQuery && (
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#DFD0B8]">New This Season</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {suggestedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="cursor-pointer group"
                    onClick={() => handleProductClick(product)}
                  >
                    <div 
                      className="aspect-square relative mb-2 overflow-hidden rounded-lg border"
                      style={{ borderColor: '#697565' }}
                    >
                      <img
                        src={product.imageURL}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 fast-transition"
                      />
                    </div>
                    <h4 className="font-medium text-sm text-[#DFD0B8]">{product.name}</h4>
                    <p className="text-[#948979] text-sm">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchQuery && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-[#948979]">No products found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;