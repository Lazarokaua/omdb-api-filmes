import React, { useState } from 'react';
import { MovieList } from './MovieList';


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }

    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  return (
    // Container principal com padding
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Busca de Filmes</h1>

      {/* Formulário centralizado */}
      <form onSubmit={handleSearch} className="flex justify-center gap-4 mb-12">
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // Estilo do campo de input
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          // Estilo do botão
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Buscar
        </button>
      </form>

      <MovieList movies={movies}/>
    </div>
  );
}

export default SearchBar;
