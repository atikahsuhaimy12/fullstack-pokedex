'use client';

import { useState, useEffect } from 'react';
import PokemonCard from '@/components/PokemonCard';
import SimpleCarousel from '@/components/SimpleCarousel';

interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPokemons = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/pokemons?page=${pageNum}&limit=20`
      );
      const data = await response.json();
      setPokemons(prev => [...prev, ...data]);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Section - Carousel & Banners */}
      <div className="bg-white p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          {/* Carousel */}
          <div className="flex-1">
            <SimpleCarousel />
          </div>
          
          {/* Side Banners */}
          <div className="w-64 space-y-4">
            <div
              className="h-[120px] rounded-lg overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1643725173053-ed68676f1878?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>

            <div
              className="h-[120px] rounded-lg overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1647892591717-28c7fd63bb3f?q=80&w=687&auto=format&fit=crop')",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="max-w-7xl mx-auto mt-8 flex gap-4 px-4">
        {/* Left Static Image */}
        <div className="w-48 h-96 rounded-lg overflow-hidden sticky top-8 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_vector-1728372991253-0fc234c1368d?q=80&w=735&auto=format&fit=crop')",
          }}
        ></div>



        {/* Center - Pokemon List */}
        <div className="flex-1">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg shadow mb-4 sticky top-0 z-10 bg-white"
          />

          {/* Pokemon Grid */}
          <div className="grid grid-cols-3 gap-4">
            {filteredPokemons.map(pokemon => (
              <PokemonCard key={pokemon.name} {...pokemon} />
            ))}
          </div>

          {/* Load More Button */}
          {!searchTerm && (
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={loading}
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>

        {/* Right Static Image */}
        <div
          className="w-48 h-96 rounded-lg overflow-hidden sticky top-8 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_vector-1729506580276-c309b3fbd6a0?q=80&w=722&auto=format&fit=crop')",
          }}
        ></div>
      </div>
    </div>
  );
}