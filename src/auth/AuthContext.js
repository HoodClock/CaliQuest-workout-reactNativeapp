import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from './authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUserProfile = async () => {
    if (user) {
      const profileResult = await authService.getUserProfile(user.uid);
      if (profileResult.success) {
        setUserProfile(profileResult.data);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Get user profile data
        const profileResult = await authService.getUserProfile(user.uid);
        if (profileResult.success) {
          setUserProfile(profileResult.data);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  const value = {
    user,
    userProfile,
    loading,
    setUserProfile,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};