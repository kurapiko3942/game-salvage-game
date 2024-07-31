"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import Image from 'next/image';
import { Game } from '@/components/type';
import Header from '@/components/layouts/header';
import Loading from '@/components/layouts/loading';

const fetchIGDBData = async (query: string): Promise<Game[]> => {
  console.log('Fetching data with query:', query);  // クエリのログ出力
  const response = await fetch('/api/igdb', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query })
  });
  const data = await response.json();

  console.log('Response data:', data);  // レスポンスデータのログ出力

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${data.error}`);
  }
  return data;
};

// プロトコル相対URLを絶対URLに変換する関数
const convertToAbsoluteURL = (url: string): string => {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('Mario'); // 初期値を「Mario」に設定

  const loadGameData = useCallback(async (query: string) => {
    try {
      const result = await fetchIGDBData(query);
      const sortedData = result.sort((a, b) => (b.first_release_date || 0) - (a.first_release_date || 0));
      setData(sortedData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || 'Mario';
    setSearchQuery(query);
    loadGameData(query);
  }, [loadGameData]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('query', searchQuery);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    loadGameData(searchQuery);
  };

  if (error) return <div className="text-center text-red-600 mt-4">Error: {error}</div>;
  if (!data.length) return <Loading />;

  return (
    <div className="container mx-auto max-w-full bg-black text-white">
      <Header />
      <div className="flex flex-col items-center mb-4">
        <p className="mb-2 text-gray-400">Enter the name of a game to search for its details</p>
        <div className="flex justify-between items-center w-full max-w-lg bg-gray-800 rounded-lg p-4 shadow-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm w-full bg-black text-white border-gray-600"
            placeholder="Search for games..."
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(game => (
          <Link key={game.id} href={`/games/${game.id}?query=${searchQuery}`} passHref>
            <Card className="max-w-md mx-auto my-4 shadow-lg w-80 h-96 bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
              <CardHeader className="relative h-40">
                {game.screenshots && game.screenshots.length > 0 ? (
                  <Image 
                    src={convertToAbsoluteURL(game.screenshots[0].url.replace('thumb', '1080p'))} 
                    alt={game.name} 
                    layout="fill" 
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-600">
                    No Image Available
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 h-56 overflow-y-auto">
                <CardTitle className="text-xl font-bold">{game.name}</CardTitle>
                {game.first_release_date && (
                  <CardDescription className="text-gray-400">
                    Release Date: {new Date(game.first_release_date * 1000).toLocaleDateString()}
                  </CardDescription>
                )}
                {game.involved_companies && game.involved_companies.length > 0 && (
                  <CardDescription className="text-gray-400">
                    Company: {game.involved_companies[0].company?.name || 'N/A'}
                  </CardDescription>
                )}
                {game.genres && game.genres.length > 0 && (
                  <CardDescription className="text-gray-400">
                    Genres: {game.genres.map((genre) => genre.name).join(', ')}
                  </CardDescription>
                )}
                {game.platforms && game.platforms.length > 0 && (
                  <CardDescription className="text-gray-400">
                    Platforms: {game.platforms.map((platform) => platform.name).join(', ')}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
