"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardImage as CardImage } from './ui/card';

const fetchIGDBData = async () => {
  const response = await fetch('/api/igdb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${await response.text()}`);
  }
  return response.json();
};

const GameCard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadGameData = async () => {
    try {
      const result = await fetchIGDBData();
      setData(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    loadGameData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(game => (
          <Card key={game.id} className="max-w-md mx-auto my-4 shadow-lg">
            <CardHeader className="relative h-64">
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
              <CardDescription className="text-gray-600">
                Release Date: {new Date(game.first_release_date * 1000).toLocaleDateString()}
              </CardDescription>
              <CardDescription className="text-gray-600">
                Company: {game.involved_companies?.[0]?.company?.name || 'N/A'}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <button
        onClick={loadGameData}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Load New Games
      </button>
    </div>
  );
};

export default GameCard;
