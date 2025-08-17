// src/App.jsx
import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { MovieList } from './components/MovieList';
import { Pagination } from "./components/Pagination"

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const apiKey = import.meta.env.VITE_API_KEY;

    // Dentro do seu componente App
    const fetchMovies = async (term, page) => {
        if (!term) return;

        setLoading(true);
        setError('');

        try {
            const url = `https://www.omdbapi.com/?s=${term}&page=${page}&apikey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            console.log('A API diz que o total de resultados é:', data.totalResults);

            if (data.Response === "True") {
                // Correção para o erro de chave duplicada
                const uniqueMovies = data.Search.filter((movie, index, self) =>
                    index === self.findIndex((m) => m.imdbID === movie.imdbID)
                );

                setMovies(uniqueMovies);
                setTotalPages(Math.ceil(data.totalResults / 10));
            } else {
                setMovies([]);
                setError(data.Error);
                setTotalPages(0);
            }
        } catch (err) {
            setError('Ocorreu um erro na comunicação com a API. Tente novamente.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
        fetchMovies(term, 1);
    };

    // 2. Crie a função que será passada para o componente Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovies(searchTerm, page); // Busca os filmes para a nova página
    };



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">
                Busca de Filmes
            </h1>
            <SearchBar onSearch={handleSearch} />

            {loading && <p className="text-center text-lg">Carregando...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && <MovieList movies={movies} />}

            {!loading && !error && movies.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

        </div>
    );
}

export default App;
