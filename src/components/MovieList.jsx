import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export const MovieList = ({ movies }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">

          {/* Link para detalhes - imagem e título */}
          <Link to={`/movie/${movie.imdbID}`}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
              alt={`Pôster de ${movie.Title}`}
              className="w-full h-96 object-cover hover:opacity-75 transition-opacity"
            />
          </Link>

          <div className="p-4">
            {/* Título clicável */}
            <Link to={`/movie/${movie.imdbID}`}>
              <h3 className="text-lg font-bold truncate hover:text-blue-600 transition-colors cursor-pointer">
                {movie.Title}
              </h3>
            </Link>

            <p className="text-gray-600 mt-1 mb-3">
              {movie.Year}
            </p>

            {/* Botões de ação */}
            <div className="flex gap-2">
              <Link
                to={`/movie/${movie.imdbID}`}
                className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm text-center rounded-lg hover:bg-blue-600 transition-colors"
              >
                Ver Detalhes
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie);
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  isFavorite(movie.imdbID)
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={isFavorite(movie.imdbID) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                {isFavorite(movie.imdbID) ? '💔' : '❤️'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
