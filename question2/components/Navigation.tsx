// question2/src/components/Navigation.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Social Media Analytics
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/top-users" 
              className={`hover:text-blue-200 ${isActive('/top-users') ? 'underline' : ''}`}
            >
              Top Users
            </Link>
            <Link 
              href="/trending-posts" 
              className={`hover:text-blue-200 ${isActive('/trending-posts') ? 'underline' : ''}`}
            >
              Trending Posts
            </Link>
            <Link 
              href="/feed" 
              className={`hover:text-blue-200 ${isActive('/feed') ? 'underline' : ''}`}
            >
              Feed
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link 
              href="/top-users" 
              className={`block py-2 ${isActive('/top-users') ? 'underline' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Top Users
            </Link>
            <Link 
              href="/trending-posts" 
              className={`block py-2 ${isActive('/trending-posts') ? 'underline' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Trending Posts
            </Link>
            <Link 
              href="/feed" 
              className={`block py-2 ${isActive('/feed') ? 'underline' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Feed
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}