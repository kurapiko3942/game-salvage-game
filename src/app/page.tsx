"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '../components/ui/pagination';
import Image from 'next/image';
import { Game } from '@/components/type';

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
const convertToAbsoluteURL = (url: string) => {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  return url;
};

const HomePage: React.FC = () => {
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const loadGameData = async (query: string) => {
    if (!query) {
      query = 'Mario';  // デフォルトのクエリ
    }
    try {
      const result = await fetchIGDBData(query);
      
      // リリース日で降順にソート
      const sortedData = result.sort((a, b) => (b.first_release_date || 0) - (a.first_release_date || 0));
      
      setData(sortedData);
      setFilteredData(sortedData);
      setCurrentPage(1); // 検索時にページをリセット
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    loadGameData('Mario'); // 初期ロード時にデフォルトのクエリを指定
  }, []);

  const handleSearch = () => {
    loadGameData(searchQuery);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 現在のページに表示するデータを計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - 2 && page <= currentPage + 2)
      ) {
        paginationItems.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        page === currentPage - 3 ||
        page === currentPage + 3
      ) {
        paginationItems.push(
          <PaginationItem key={`ellipsis-${page}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return paginationItems;
  };

  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-4">
        <p className="mb-2 text-gray-600">Enter the name of a game to search for its details</p>
        <div className="flex justify-between items-center w-full max-w-lg bg-white bg-opacity-80 rounded-lg p-4 shadow-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm w-full"
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
        {currentItems.map(game => (
          <Link key={game.id} href={`/games/${game.id}`} passHref>
            <Card className="max-w-md mx-auto my-4 shadow-lg w-80 h-96 bg-white bg-opacity-80 rounded-lg overflow-hidden cursor-pointer">
              <CardHeader className="relative h-40">
                {game.screenshots && game.screenshots.length > 0 ? (
                  <Image src={convertToAbsoluteURL(game.screenshots[0].url.replace('thumb', '1080p'))} alt={game.name} layout="fill" objectFit="cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
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
                    Company: {game.involved_companies[0].company.name || 'N/A'}
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
      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationPrevious onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
          {renderPaginationItems()}
          <PaginationNext onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default HomePage;
