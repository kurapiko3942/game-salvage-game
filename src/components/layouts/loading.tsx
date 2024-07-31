import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const gifs = [
  '/robot.gif',
  '/robot2.gif',
  '/robot3.gif',
  '/robot4.gif',
  '/baten.gif',
  '/golfa.gif',
  '/oyaji.gif',
  '/cat.gif',
  '/coffeeshop.gif'
];

const Loading: React.FC = () => {
  const [randomGif, setRandomGif] = useState<string>(gifs[0]);
  const [showGif, setShowGif] = useState<boolean>(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    setRandomGif(gifs[randomIndex]);

    const displayDuration = 5000; // 全てのGIFを5秒表示

    const timer = setTimeout(() => {
      setShowGif(false);
    }, displayDuration);

    return () => clearTimeout(timer); // コンポーネントのアンマウント時にタイマーをクリア
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {showGif && (
        <div className={randomGif === '/coffeeshop.gif' ? 'w-full h-full flex items-center justify-center' : ''}>
          <Image
            src={randomGif}
            alt="Loading"
            width={randomGif === '/coffeeshop.gif' ? 1920 : 64} // coffeeshop.gifは大きなサイズに、それ以外は64px
            height={randomGif === '/coffeeshop.gif' ? 1080 : 64} // coffeeshop.gifは大きなサイズに、それ以外は64px
            className={randomGif === '/coffeeshop.gif' ? 'object-cover' : 'mb-4'}
          />
        </div>
      )}
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
