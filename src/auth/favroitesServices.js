import { db } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const favoritesService = {
  // Add exercise to favorites
  addFavorite: async (userId, exerciseId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'workoutStats.favoriteExercises': arrayUnion(exerciseId)
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding favorite:', error);
      return { success: false, error: error.message };
    }
  },

  // Remove exercise from favorites
  removeFavorite: async (userId, exerciseId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'workoutStats.favoriteExercises': arrayRemove(exerciseId)
      });
      return { success: true };
    } catch (error) {
      console.error('Error removing favorite:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user's favorite exercises
  getFavorites: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { 
          success: true, 
          favorites: userData.workoutStats?.favoriteExercises || [] 
        };
      }
      return { success: false, favorites: [] };
    } catch (error) {
      console.error('Error getting favorites:', error);
      return { success: false, favorites: [], error: error.message };
    }
  },

  // Check if exercise is favorite
  isFavorite: async (userId, exerciseId) => {
    try {
      const result = await favoritesService.getFavorites(userId);
      if (result.success) {
        return result.favorites.includes(exerciseId);
      }
      return false;
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  // Toggle favorite status
  toggleFavorite: async (userId, exerciseId) => {
    try {
      const isFav = await favoritesService.isFavorite(userId, exerciseId);
      if (isFav) {
        await favoritesService.removeFavorite(userId, exerciseId);
        return false;
      } else {
        await favoritesService.addFavorite(userId, exerciseId);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }
};