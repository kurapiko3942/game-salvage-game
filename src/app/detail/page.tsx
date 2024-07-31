"use client"
import React from 'react';
import Image from 'next/image';
import Loading from '@/components/layouts/loading';

export default function AppOverview() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">アプリ紹介</h1>
          <p className="text-center text-gray-600">企業側のマーケティングや時代差別による影響を受けにくいゲーム探索ブラウザです。</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">アプリの概要</h2>
          <p className="text-gray-700">
            ここにアプリの概要を記述します。例えば、アプリの目的やターゲットユーザー、解決する問題など。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">使ったオープンデータ</h2>
          <p className="text-gray-700">
            ここに使用したオープンデータの詳細を記述します。データソースやどのようにデータを利用したかを説明します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">アプリの特徴</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>特徴1: ここに最初の特徴を記述します。</li>
            <li>特徴2: ここに次の特徴を記述します。</li>
            <li>特徴3: ここにさらに他の特徴を記述します。</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">何で作った？</h2>
          <p className="text-gray-700">
            ここに使用した技術スタックを記述します。例えば、Next.js、React、TailwindCSS、その他のライブラリやツール。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">今後の展望</h2>
          <p className="text-gray-700">
            ここにアプリの今後の計画や展望を記述します。例えば、新機能の追加や改善予定など。
          </p>
        </section>
      </div>
      
     
    </div>
  );
}
