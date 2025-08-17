// src/pages/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export const Favorites = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Meus Favoritos
                </h1>

                <div className="text-center py-12">
                    <div className="text-6xl mb-4">📽️</div>
                    <p className="text-xl text-gray-600 mb-6">
                        Você ainda não tem filmes favoritos
                    </p>
                    <p className="text-gray-500 mb-8">
                        Vá para a busca e adicione alguns filmes à sua lista!
                    </p>

                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Buscar Filmes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Meus Favoritos ({favorites.length})
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                                alt={`Pôster de ${movie.Title}`}
                                className="w-full h-72 object-cover hover:opacity-75 transition-opacity"
                            />
                        </Link>

                        <div className="p-4">
                            <Link to={`/movie/${movie.imdbID}`}>
                                <h3 className="text-lg font-bold truncate hover:text-blue-600 transition-colors">
                                    {movie.Title}
                                </h3>
                            </Link>

                            <p className="text-gray-600 mt-1 mb-3">
                                {movie.Year}
                            </p>

                            <button
                                onClick={() => removeFromFavorites(movie.imdbID)}
                                className="w-full px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                            >
                                💔 Remover dos Favoritos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
