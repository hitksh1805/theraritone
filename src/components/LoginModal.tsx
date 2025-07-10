'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    stylePreference: ''
  });

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password);
      }
      onClose();
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      alert(error.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md shadow-2xl z-50 overflow-hidden"
        style={{ backgroundColor: '#393E46' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-[#DFD0B8]">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={onClose}
                className="text-[#948979] hover:text-[#DFD0B8] fast-transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div 
              className="flex mb-8 rounded-lg p-1"
              style={{ backgroundColor: '#181C14' }}
            >
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium fast-transition ${
                  activeTab === 'login'
                    ? 'text-[#DFD0B8] shadow-sm'
                    : 'text-[#948979] hover:text-[#DFD0B8]'
                }`}
                style={activeTab === 'login' ? { backgroundColor: '#393E46' } : {}}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium fast-transition ${
                  activeTab === 'signup'
                    ? 'text-[#DFD0B8] shadow-sm'
                    : 'text-[#948979] hover:text-[#DFD0B8]'
                }`}
                style={activeTab === 'signup' ? { backgroundColor: '#393E46' } : {}}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'signup' && (
                <div>
                  <Label htmlFor="name" className="text-[#DFD0B8]">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="input-dark mt-2"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-[#DFD0B8]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="input-dark mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#DFD0B8]">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="input-dark pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#948979] hover:text-[#DFD0B8] fast-transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {activeTab === 'signup' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="gender" className="text-[#DFD0B8]">Gender</Label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="input-dark mt-2 w-full px-3 py-2 rounded-md"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="stylePreference" className="text-[#DFD0B8]">Style Preference</Label>
                    <select
                      id="stylePreference"
                      value={formData.stylePreference}
                      onChange={(e) => setFormData({...formData, stylePreference: e.target.value})}
                      className="input-dark mt-2 w-full px-3 py-2 rounded-md"
                    >
                      <option value="">Select Style</option>
                      <option value="Minimalist">Minimalist</option>
                      <option value="Streetwear">Streetwear</option>
                      <option value="Classic">Classic</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3"
              >
                {loading ? 'Please wait...' : (activeTab === 'login' ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#697565]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span 
                    className="px-2 text-[#948979]"
                    style={{ backgroundColor: '#393E46' }}
                  >
                    Or
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                variant="outline"
                className="btn-secondary w-full mt-4 py-3 flex items-center justify-center space-x-3"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span>Continue with Google</span>
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-[#948979]">
              {activeTab === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setActiveTab('signup')}
                    className="text-[#DFD0B8] hover:underline font-medium fast-transition"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-[#DFD0B8] hover:underline font-medium fast-transition"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;