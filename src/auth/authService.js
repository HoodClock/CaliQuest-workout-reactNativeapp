import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const authService = {
  // Sign up new user
  signUp: async (email, password, displayName) => {
    try {
      console.log('Attempting to create user...'); // Add this for debugging
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User created, saving to Firestore...'); // Debug log

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        workoutStats: {
          totalWorkouts: 0,
          totalMinutes: 0,
          favoriteExercises: []
        }
      });

      console.log('User document saved successfully'); // Debug log
      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error); // Detailed error log
      return { success: false, error: error.message };
    }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign out user
  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user profile data
  getUserProfile: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};