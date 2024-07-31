import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white text-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <span className="text-2xl font-bold cursor-pointer">MyGameShop</span>
        </Link>
        <nav className="space-x-4">
          <Link href="/detail" passHref>
            <span className="hover:text-gray-600 transition cursor-pointer">Details</span>
          </Link>
          
         
        </nav>
      </div>
    </header>
  );
};

export default Header;
