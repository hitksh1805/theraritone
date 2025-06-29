import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, LogOut, ShoppingBag, Clock, Settings, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const { user, logout, cart } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    stylePreference: '',
    gender: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully!'
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been logged out successfully.'
      });
      navigate('/');
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Logout Failed',
        message: 'Failed to logout. Please try again.'
      });
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(60, 61, 55)' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Profile"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg shadow-sm p-8 border border-[rgb(105,117,101)]"
              style={{ backgroundColor: 'rgb(24, 28, 20)' }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[rgb(60,61,55)] rounded-full flex items-center justify-center border border-[rgb(105,117,101)]">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={24} className="text-[rgb(236,223,204)]" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[rgb(236,223,204)]">{profile.name || 'User Profile'}</h2>
                    <p className="text-[rgb(105,117,101)]">{profile.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="flex items-center space-x-2 border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] bg-transparent"
                  style={{ 
                    borderColor: 'rgb(105, 117, 101)',
                    color: 'rgb(236, 223, 204)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Edit size={16} />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-[rgb(236,223,204)]">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-[rgb(236,223,204)]">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    disabled
                    className="mt-1 bg-[rgb(60,61,55)] border-[rgb(105,117,101)] text-[rgb(236,223,204)]"
                  />
                </div>

                <div>
                  <Label htmlFor="stylePreference" className="text-[rgb(236,223,204)]">Style Preference</Label>
                  <select
                    id="stylePreference"
                    value={profile.stylePreference}
                    onChange={(e) => setProfile({...profile, stylePreference: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 w-full px-3 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
                  >
                    <option value="">Select Style</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Streetwear">Streetwear</option>
                    <option value="Classic">Classic</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-[rgb(236,223,204)]">Gender</Label>
                  <select
                    id="gender"
                    value={profile.gender}
                    onChange={(e) => setProfile({...profile, gender: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 w-full px-3 py-2 border border-[rgb(105,117,101)] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(105,117,101)] bg-[rgb(60,61,55)] text-[rgb(236,223,204)]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <Button 
                    onClick={handleSave} 
                    className="bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)]"
                    style={{ 
                      backgroundColor: 'rgb(236, 223, 204)', 
                      color: 'rgb(24, 28, 20)'
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(false)} 
                    variant="outline" 
                    className="border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] bg-transparent"
                    style={{ 
                      borderColor: 'rgb(105, 117, 101)',
                      color: 'rgb(236, 223, 204)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-[rgb(105,117,101)]">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center space-x-2 bg-red-600 text-white hover:bg-red-700"
                  style={{ 
                    backgroundColor: 'rgb(220, 38, 38)', 
                    color: 'white'
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Cart Overview */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]"
              style={{ backgroundColor: 'rgb(24, 28, 20)' }}
            >
              <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/orders')}
                  variant="outline"
                  className="w-full justify-start border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] bg-transparent"
                  style={{ 
                    borderColor: 'rgb(105, 117, 101)',
                    color: 'rgb(236, 223, 204)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Clock className="mr-2" size={16} />
                  Order History
                </Button>
                
                <Button
                  onClick={() => navigate('/wishlist')}
                  variant="outline"
                  className="w-full justify-start border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] bg-transparent"
                  style={{ 
                    borderColor: 'rgb(105, 117, 101)',
                    color: 'rgb(236, 223, 204)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Heart className="mr-2" size={16} />
                  Saved Collections
                </Button>
                
                <Button
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="w-full justify-start border-[rgb(105,117,101)] text-[rgb(236,223,204)] hover:bg-[rgb(60,61,55)] bg-transparent"
                  style={{ 
                    borderColor: 'rgb(105, 117, 101)',
                    color: 'rgb(236, 223, 204)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Settings className="mr-2" size={16} />
                  Settings
                </Button>
              </div>
            </motion.div>

            {/* Cart Overview */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg shadow-sm p-6 border border-[rgb(105,117,101)]"
                style={{ backgroundColor: 'rgb(24, 28, 20)' }}
              >
                <h3 className="text-lg font-semibold text-[rgb(236,223,204)] mb-4 flex items-center">
                  <ShoppingBag className="mr-2" size={16} />
                  Cart Overview
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[rgb(105,117,101)]">Items:</span>
                    <span className="font-medium text-[rgb(236,223,204)]">{cart.length}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-[rgb(105,117,101)]">Total:</span>
                    <span className="font-medium text-[rgb(236,223,204)]">₹{cartTotal}</span>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/cart')}
                    className="w-full bg-[rgb(236,223,204)] text-[rgb(24,28,20)] hover:bg-[rgb(220,210,190)]"
                    style={{ 
                      backgroundColor: 'rgb(236, 223, 204)', 
                      color: 'rgb(24, 28, 20)'
                    }}
                  >
                    View Cart
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;