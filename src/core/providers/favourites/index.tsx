import React, { createContext, useContext, useEffect, useState } from 'react';
import { Restaurant } from '@/features/restaurants/models';
import { storage } from '@/core/cache';

const FAVORITES_KEY = 'favourite_restaurants';

interface FavoritesContextType {
  favorites: Restaurant[];
  addFavorite: (restaurant: Restaurant) => void;
  removeFavorite: (restaurantId: number) => void;
  toggleFavorite: (restaurant: Restaurant) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  useEffect(() => {
    const favoritesStr = storage.getString(FAVORITES_KEY);
    if (favoritesStr) {
      try {
        setFavorites(JSON.parse(favoritesStr));
      } catch (e) {
        console.error('Error parsing favorites from MMKV', e);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: Restaurant[]) => {
    setFavorites(newFavorites);
    storage.set(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addFavorite = (restaurant: Restaurant) => {
    if (!favorites.some(r => r.id === restaurant.id)) {
      saveFavorites([...favorites, restaurant]);
    }
  };

  const removeFavorite = (restaurantId: number) => {
    saveFavorites(favorites.filter(r => r.id !== restaurantId));
  };

  const toggleFavorite = (restaurant: Restaurant) => {
    if (favorites.some(r => r.id === restaurant.id)) {
      removeFavorite(restaurant.id);
    } else {
      addFavorite(restaurant);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
