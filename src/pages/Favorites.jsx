// src/pages/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Favorites = () => {
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

            {/* TODO: Implementar lista de favoritos com localStorage */}
        </div>
    );
};
