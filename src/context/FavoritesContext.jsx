// src/context/FavoritesContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Carregar favoritos do localStorage quando o componente monta
    useEffect(() => {
        const savedFavorites = localStorage.getItem('movieFavorites');
        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                setFavorites(parsedFavorites);
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
                setFavorites([]);
            }
        }
        setIsInitialized(true); // Marca como inicializado após carregar
    }, []);

    // Salvar no localStorage sempre que favorites muda (mas não na primeira renderização)
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('movieFavorites', JSON.stringify(favorites));
        }
    }, [favorites, isInitialized]);

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            // Verifica se já existe pra não duplicar
            if (prev.some(fav => fav.imdbID === movie.imdbID)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.imdbID !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.imdbID === movieId);
    };

    const toggleFavorite = (movie) => {
        if (isFavorite(movie.imdbID)) {
            removeFromFavorites(movie.imdbID);
        } else {
            addToFavorites(movie);
        }
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
    }
    return context;
};
