"use client";

import { Game } from '@/components/type';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/layouts/loading';

const fetchGameDetails = async (id: string): Promise<Game> => {
  const response = await fetch(`/api/igdb?id=${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch game details: ${await response.text()}`);
  }
  const data = await response.json();
  console.log('Fetched game details:', JSON.stringify(data, null, 2));
  return data[0];
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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGameDetails(id)
      .then(data => setGameDetails(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <div className="text-center text-red-600 mt-4">Error: {error}</div>;
  if (!gameDetails) return <Loading/>;

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center">{gameDetails.name}</h1>
      {gameDetails.screenshots && gameDetails.screenshots.length > 0 && (
        <div className="mb-4">
          <Image 
            src={convertToAbsoluteURL(gameDetails.screenshots[0].url.replace('thumb', '1080p'))} 
            alt={gameDetails.name} 
            width={1280}
            height={720}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">General Information</h2>
          <p><span className="font-bold">Release Date:</span> {gameDetails.first_release_date ? new Date(gameDetails.first_release_date * 1000).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-bold">Company:</span> {gameDetails.involved_companies?.map(company => company.company?.name).join(', ') || 'N/A'}</p>
          <p><span className="font-bold">Genres:</span> {gameDetails.genres?.map((genre) => genre.name).join(', ') || 'N/A'}</p>
          <p><span className="font-bold">Platforms:</span> {gameDetails.platforms?.map((platform) => platform.name).join(', ') || 'N/A'}</p>
          <p><span className="font-bold">Total Rating:</span> {gameDetails.total_rating ? `${gameDetails.total_rating} (${gameDetails.total_rating_count} votes)` : 'N/A'}</p>
          <p><span className="font-bold">Aggregated Rating:</span> {gameDetails.aggregated_rating ? `${gameDetails.aggregated_rating} (${gameDetails.aggregated_rating_count} reviews)` : 'N/A'}</p>
          {gameDetails.websites && gameDetails.websites.length > 0 && (
            <p><span className="font-bold">Websites:</span> {gameDetails.websites.map((website) => (
              <a key={website.url} href={website.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-words">{website.url}</a>
            )).join(', ')}</p>
          )}
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Story and Summary</h2>
          <p><span className="font-bold">Storyline:</span> {gameDetails.storyline || 'N/A'}</p>
          <p><span className="font-bold">Summary:</span> {gameDetails.summary || 'N/A'}</p>
          {gameDetails.videos && gameDetails.videos.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Videos</h2>
              {gameDetails.videos.map((video) => (
                <iframe
                  key={video.video_id}
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mb-4"
                ></iframe>
              ))}
            </div>
          )}
        </div>
      </div>
      <Link href={`/?query=${searchQuery}`} passHref>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Back to Search Results
        </button>
      </Link>
    </div>
  );
};

export default GameDetailsPage;
