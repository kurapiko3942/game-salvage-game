import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 py-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" passHref>
            <span className="cursor-pointer hover:text-gray-400 transition">Home</span>
          </Link>
          <Link href="/details" passHref>
            <span className="cursor-pointer hover:text-gray-400 transition">Details</span>
          </Link>
          <Link href="/about" passHref>
            <span className="cursor-pointer hover:text-gray-400 transition">About</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="cursor-pointer hover:text-gray-400 transition">Contact</span>
          </Link>
        </div>
        <div className="text-sm">
          &copy; 2024 MyApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
