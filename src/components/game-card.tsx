"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardImage } from '../components/ui/card';

const fetchIGDBData = async (query: string) => {
  console.log('Sending query:', query); // クエリのログを追加
  const response = await fetch('/api/igdb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${await response.text()}`);
  }
  return response.json();
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const loadGameData = async (query: string) => {
    try {
      const result = await fetchIGDBData(query);
      setData(result);
      setFilteredData(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    loadGameData(''); // 初期ロード時に空のqueryを指定
  }, []);

  const handleSearch = () => {
    loadGameData(searchQuery);
  };

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm w-full max-w-lg"
          placeholder="Search for games..."
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map(game => (
          <Card key={game.id} className="max-w-md mx-auto my-4 shadow-lg w-80 h-96">
            <CardHeader className="relative h-40">
              {game.screenshots && game.screenshots.length > 0 ? (
                <CardImage src={game.screenshots[0].url.replace('thumb', '1080p')} alt={game.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  No Image Available
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-bold">{game.name}</CardTitle>
              <CardDescription className="text-gray-400">
                Release Date: {new Date(game.first_release_date * 1000).toLocaleDateString()}
              </CardDescription>
              <CardDescription className="text-gray-400">
                Company: {game.involved_companies?.[0]?.company?.name || 'N/A'}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
