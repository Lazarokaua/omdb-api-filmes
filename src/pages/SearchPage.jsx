
import React, { useState, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieList } from '../components/MovieList';
import { Pagination } from "../components/Pagination";

export const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;

    const fetchMovies = useCallback(async (term, page = 1) => {
        if (!term?.trim()) return;

        setLoading(true);
        setError('');

        try {
            const url = `https://www.omdbapi.com/?s=${encodeURIComponent(term)}&page=${page}&apikey=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Erro na conexão com a API');
            }

            const data = await response.json();

            if (data.Response === "True") {
                const uniqueMovies = data.Search.filter((movie, index, self) =>
                    index === self.findIndex((m) => m.imdbID === movie.imdbID)
                );

                setMovies(uniqueMovies);
                setTotalPages(Math.ceil(data.totalResults / 10));
                setHasSearched(true);
            } else {
                setMovies([]);
                setError(data.Error || 'Filme não encontrado');
                setTotalPages(0);
            }
        } catch (err) {
            setError('Erro ao conectar com a API. Tente novamente.');
            setMovies([]);
            setTotalPages(0);
            console.error('Erro na busca:', err);
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
        setHasSearched(false);
        fetchMovies(term, 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchMovies(searchTerm, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Busca de Filmes
            </h1>

            <SearchBar onSearch={handleSearch} />

            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-lg mt-2">Buscando filmes...</p>
                </div>
            )}

            {error && (
                <div className="text-center py-8">
                    <p className="text-red-500 text-lg bg-red-50 p-4 rounded-lg inline-block">
                        {error}
                    </p>
                </div>
            )}

            {!loading && !error && movies.length > 0 && (
                <>
                    <div className="mb-4 text-center text-gray-600">
                        Mostrando página {currentPage} de {totalPages}
                        {searchTerm && ` para "${searchTerm}"`}
                    </div>
                    <MovieList movies={movies} />
                </>
            )}

            {!loading && !error && hasSearched && movies.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">
                        Nenhum filme encontrado. Tente outra busca.
                    </p>
                </div>
            )}

            {!loading && !error && movies.length > 0 && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};
