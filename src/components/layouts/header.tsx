import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white text-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <span className="text-2xl font-bold cursor-pointer">MyApp</span>
        </Link>
        <nav className="space-x-4">
          <Link href="/detail" passHref>
            <span className="hover:text-gray-600 transition cursor-pointer">Details</span>
          </Link>
          <Link href="/about" passHref>
            <span className="hover:text-gray-600 transition cursor-pointer">About</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="hover:text-gray-600 transition cursor-pointer">Contact</span>
          </Link>
          <Link href="/mypage" passHref>
            <span className="hover:text-gray-600 transition cursor-pointer">MyPage</span>
          </Link>
          <Link href="/companies" passHref>
            <span className="hover:text-gray-600 transition cursor-pointer">Companies</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
