"use client";

import { Game } from '@/components/type';
import Image from 'next/image';
import { useEffect, useState } from 'react';


const fetchGameDetails = async (id: string): Promise<Game> => {
  const response = await fetch(`/api/igdb?id=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch game details: ${await response.text()}`);
  }
  const data = await response.json();
  console.log('Fetched game details:', JSON.stringify(data, null, 2));  // デバッグ用のログ出力
  return data[0];  // APIレスポンスの最初の要素を返す
};

interface GameDetailsPageProps {
  params: {
    id: string;
  };
}

// プロトコル相対URLを絶対URLに変換する関数
const convertToAbsoluteURL = (url: string) => {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
};

const GameDetailsPage: React.FC<GameDetailsPageProps> = ({ params }) => {
  const { id } = params;
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGameDetails(id)
      .then(data => setGameDetails(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{gameDetails.name}</h1>
      {gameDetails.screenshots && gameDetails.screenshots.length > 0 && (
        <Image 
          src={convertToAbsoluteURL(gameDetails.screenshots[0].url.replace('thumb', '1080p'))} 
          alt={gameDetails.name} 
          className="w-full h-full object-cover"
        />
      )}
      <p>Release Date: {gameDetails.first_release_date ? new Date(gameDetails.first_release_date * 1000).toLocaleDateString() : 'N/A'}</p>
      <p>Company: {gameDetails.involved_companies?.map(company => company.company?.name).join(', ') || 'N/A'}</p>
      <p>Genres: {gameDetails.genres?.map((genre) => genre.name).join(', ') || 'N/A'}</p>
      <p>Platforms: {gameDetails.platforms?.map((platform) => platform.name).join(', ') || 'N/A'}</p>
    </div>
  );
};

export default GameDetailsPage;
