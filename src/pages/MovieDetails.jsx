// src/pages/MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.Response === "True") {
                    setMovie(data);
                } else {
                    setError(data.Error || 'Filme não encontrado');
                }
            } catch (err) {
                setError('Erro ao carregar detalhes do filme');
                console.error('Erro:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id, apiKey]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-lg mt-2">Carregando detalhes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-8">
                    <p className="text-red-500 text-lg bg-red-50 p-4 rounded-lg inline-block">
                        {error}
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Voltar à Busca
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
                ← Voltar
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
                            alt={movie.Title}
                            className="w-full h-96 md:h-full object-cover"
                        />
                    </div>

                    <div className="md:w-2/3 p-8">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">
                            {movie.Title}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <span className="font-semibold text-gray-600">Ano:</span>
                                <p className="text-gray-800">{movie.Year}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Duração:</span>
                                <p className="text-gray-800">{movie.Runtime}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Gênero:</span>
                                <p className="text-gray-800">{movie.Genre}</p>
                            </div>

                            <div>
                                <span className="font-semibold text-gray-600">Diretor:</span>
                                <p className="text-gray-800">{movie.Director}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="font-semibold text-gray-600">Elenco:</span>
                            <p className="text-gray-800 mt-1">{movie.Actors}</p>
                        </div>

                        <div className="mb-6">
                            <span className="font-semibold text-gray-600">Sinopse:</span>
                            <p className="text-gray-800 mt-1 leading-relaxed">{movie.Plot}</p>
                        </div>

                        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-100 px-4 py-2 rounded-lg">
                                    <span className="font-semibold text-yellow-800">
                                        ⭐ {movie.imdbRating}/10
                                    </span>
                                </div>

                                <button
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    onClick={() => console.log('Adicionar aos favoritos:', movie.imdbID)}
                                >
                                    ❤️ Adicionar aos Favoritos
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
