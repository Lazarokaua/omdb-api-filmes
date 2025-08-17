// src/components/SearchBar.jsx
import React, { useState } from 'react';

export function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-8">
            <input
                type="text"
                placeholder="Digite o nome do filme"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                disabled={!searchTerm.trim()}
            >
                Buscar
            </button>
        </form>
    );
}
