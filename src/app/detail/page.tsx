"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AppOverview() {
  const gifs = [
    '/robot.gif',
    '/robot2.gif',
    '/robot3.gif',
    '/robot4.gif',
  ];

  return (
    <div className="bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

        <header className="flex flex-col justify-center items-center text-center p-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">アプリ紹介</h1>
          <p className="text-lg max-w-2xl">企業側のマーケティングや時代差別による影響を受けにくいゲーム探索ブラウザです。</p>
          <Link href="/" className="mt-8 bg-purple-700 text-white py-3 px-8 rounded-full shadow-md hover:bg-purple-800 transition duration-300">
            今すぐ始める
          </Link>
        </header>

        <section className="py-16 px-8 bg-gray-50 text-gray-700">
          <h2 className="text-3xl font-semibold mb-8 text-center">使用したオープンデータ</h2>
          <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-md p-8 animate-slide-in">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <Image src="/APIlogo.png" alt="APIロゴ" width={200} height={200} />
              <p className="text-center md:text-left mt-4">Twitch社が提供するゲーム情報をまとめてるAPI</p>
            </div>
            <div className="md:ml-8 flex flex-col items-center md:items-start">
              <div className="flex items-center border p-4 bg-white rounded-lg shadow-sm">
                <Image src="/twitch.png" alt="Twitchロゴ" width={100} height={100} />
              </div>
              <p className="mt-4">↑言わずと知れたゲーム配信特化型プラットフォーム</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-8 bg-white text-gray-700">
          <h2 className="text-3xl font-semibold mb-8 text-center">今までのゲームブラウザ</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">ここにアプリの概要を記述します。例えば、アプリの目的やターゲットユーザー、解決する問題など。</p>
        </section>

        <section className="py-16 px-8 bg-gray-50 text-gray-700">
          <h2 className="text-3xl font-semibold mb-8 text-center">アプリの概要〜何で作った？</h2>
          <div className="bg-gray-400 p-8 mb-8 rounded-lg shadow-md text-center text-white animate-fade-in">
            <h1 className="font-bold text-4xl mb-4">結論:</h1>
            <p className="text-2xl">均等な目でそれぞれを評価できるゲームブラウザが必要だと思ったから。</p>
            <p className="text-2xl mt-4">参考：日本最大手のゲームブラウザ『Gamewith』</p>
            <div className="flex flex-col gap-4 mt-4 w-full">
              <Image src="/gamewith.png" alt="Gamewithスクリーンショット1" width={1200} height={800} className="rounded-lg shadow-sm w-full" />
              <Image src="/gamewith2.png" alt="Gamewithスクリーンショット2" width={1200} height={800} className="rounded-lg shadow-sm w-full" />
              <Image src="/gamewith3.png" alt="Gamewithスクリーンショット3" width={1200} height={800} className="rounded-lg shadow-sm w-full" />
            </div>
          </div>

          <div className="bg-gray-200 p-8 rounded-lg shadow-md text-center">
            <h1 className="font-bold text-2xl mb-2">ゲームっていうすごい面白いもののはずなのに</h1>
            <p className="text-2xl mb-2">何となく情報の羅列・ただのデータっぽく見えた</p>
            <p className="text-2xl">並びも最近だったり売りたいものが先頭に行くように並び替えられている。</p>
          </div>
        </section>

        <section className="py-16 px-8 bg-white text-gray-700">
          <h2 className="text-3xl font-semibold mb-8 text-center">アプリの特徴</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg max-w-3xl mx-auto">
            <li>特徴1: 恣意的にゲームを並び替えない、ありのまま</li>
            <li>特徴2: ゲームをカード形式にして、一枚一枚均等に目が当たるように</li>
            <li>特徴3: ちょっとした遊び心</li>
          </ul>
        </section>

        <section className="py-16 px-8 bg-gradient-to-r from-green-400 to-blue-500 text-white text-center">
          <Link href="/" className="bg-purple-700 text-white py-3 px-8 rounded-full shadow-md hover:bg-purple-800 transition duration-300">
            ブラウザへ
          </Link>
        </section>

        <section className="py-16 px-8 bg-gray-50 text-gray-700">
          <h2 className="text-3xl font-semibold mb-8 text-center">今後の展望</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            APIが日本語対応していなかったので、ほぼ全部英語表記。意外な発見というメリットもあるが、今後日本語にも対応できれば。
          </p>
          <p className="text-lg text-center max-w-3xl mx-auto">
            バグが多い。特に検索対象が見つからないときなどの対応が必要。
          </p>
          <p className="text-lg text-center max-w-3xl mx-auto">
            マイリストや企業年表など、追加したい機能がたくさんあります。
          </p>
          <div className="flex flex-wrap justify-center mt-8">
            {gifs.map((src, index) => (
              <div key={index} className="p-4">
                <Image src={src} alt={`GIF ${index + 1}`} width={150} height={150} className="rounded-lg shadow-md" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
