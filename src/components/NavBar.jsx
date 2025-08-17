// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-md mb-6">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        🎬 Filmes
                    </Link>

                    <div className="flex gap-6">
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isActive('/')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                            }`}
                        >
                            Buscar
                        </Link>

                        <Link
                            to="/favorites"
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isActive('/favorites')
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                            }`}
                        >
                            Favoritos
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
