'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { createUserDoc, getUserCart, CartItem } from '@/lib/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  cart: CartItem[];
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshCart: () => Promise<void>;
  addToLocalCart: (item: CartItem) => void;
  removeFromLocalCart: (itemId: string, size?: string) => void;
  updateLocalCartQuantity: (itemId: string, quantity: number, size?: string) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    if (user) {
      try {
        const userCart = await getUserCart(user.uid);
        setCart(userCart);
      } catch (error) {
        console.error('Error refreshing cart:', error);
        // Use localStorage as fallback
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          setCart(JSON.parse(localCart));
        }
      }
    } else {
      // Use localStorage for guest users
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart([]);
      }
    }
  };

  // Guest cart management functions
  const addToLocalCart = (item: CartItem) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = currentCart.findIndex((cartItem: CartItem) => 
      cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    setCart(currentCart);
  };

  const removeFromLocalCart = (itemId: string, size?: string) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = currentCart.filter((item: CartItem) => 
      !(item.id === itemId && item.size === size)
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const updateLocalCartQuantity = (itemId: string, quantity: number, size?: string) => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = currentCart.map((item: CartItem) => 
      item.id === itemId && item.size === size 
        ? { ...item, quantity }
        : item
    );
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          await createUserDoc(user);
          await refreshCart();
        } catch (error) {
          console.error('Error setting up user:', error);
          // Continue with local storage fallback
          await refreshCart();
        }
      } else {
        await refreshCart();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCart([]);
      localStorage.removeItem('cart');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Failed to logout');
    }
  };

  const value = {
    user,
    loading,
    cart,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    refreshCart,
    addToLocalCart,
    removeFromLocalCart,
    updateLocalCartQuantity
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};