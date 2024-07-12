'use client';

import { useState } from 'react';
import axios from 'axios';

type Game = {
  id: number;
  name: string;
  cover?: { url: string };
};

export default function query() {
  const [keyword, setKeyword] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const gameRes = await axios.post('/api/search', { keyword });

      setGames(gameRes.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Game Search</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Enter game keyword"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      <div className="mt-4">
        {games.map((game) => (
          <div key={game.id} className="mb-2">
            <h2 className="text-xl">{game.name}</h2>
            {game.cover && <img src={game.cover.url} alt={game.name} />}
          </div>
        ))}
      </div>
    </div>
  );
}
