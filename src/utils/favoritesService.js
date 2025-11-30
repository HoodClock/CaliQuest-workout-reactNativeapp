import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorite_exercises';

export const favoritesService = {
  // Get all favorites
  getFavorites: async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  // Add exercise to favorites
  addFavorite: async (exerciseId) => {
    try {
      const favorites = await favoritesService.getFavorites();
      if (!favorites.includes(exerciseId)) {
        favorites.push(exerciseId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  // Remove exercise from favorites
  removeFavorite: async (exerciseId) => {
    try {
      const favorites = await favoritesService.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== exerciseId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  // Check if exercise is favorite
  isFavorite: async (exerciseId) => {
    try {
      const favorites = await favoritesService.getFavorites();
      return favorites.includes(exerciseId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  // Toggle favorite status
  toggleFavorite: async (exerciseId) => {
    try {
      const isFav = await favoritesService.isFavorite(exerciseId);
      if (isFav) {
        await favoritesService.removeFavorite(exerciseId);
        return false;
      } else {
        await favoritesService.addFavorite(exerciseId);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }
};