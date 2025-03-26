import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  // Map of language codes to display names
  const languages = {
    en: 'English',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語'
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.jpeg"
              alt="SLP Descubre Logo"
              width={600}
              height={60}
              className="h-20 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Home
            </Link>
            
            <Link 
              href="/places"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Explore
            </Link>
            
            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              About
            </Link>

            <Link 
              href="/faq"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              FAQ
            </Link>
            
            <Link 
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-1 text-sm border border-gray-200 rounded-md hover:border-gray-300 flex items-center"
              >
                {languages[router.locale as keyof typeof languages] || 'English'}
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => {
                        changeLanguage(code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${router.locale === code ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <div className="bg-gray-50 border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12">
            {/* Categories */}
            <div className="flex space-x-8">
              <Link href="/cultural" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                CULTURAL
                <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">NEW</span>
              </Link>
              <Link href="/places" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                PLACES
              </Link>
              <Link href="/events" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                EVENTS
              </Link>
              <Link href="/services" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                SERVICES
              </Link>
              <Link href="/community" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
                COMMUNITY
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-4 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 mt-2 rounded-md shadow-md animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              href="/places"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            
            <Link 
              href="/about"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Link 
              href="/faq"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            
            <Link 
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-gray-200">
              <div className="relative w-full mb-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-2">Categories</p>
              <div className="space-y-2">
                <Link href="/cultural" className="block text-sm text-gray-700 hover:text-primary">
                  Cultural <span className="ml-1 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">NEW</span>
                </Link>
                <Link href="/places" className="block text-sm text-gray-700 hover:text-primary">
                  Places
                </Link>
                <Link href="/events" className="block text-sm text-gray-700 hover:text-primary">
                  Events
                </Link>
                <Link href="/services" className="block text-sm text-gray-700 hover:text-primary">
                  Services
                </Link>
                <Link href="/community" className="block text-sm text-gray-700 hover:text-primary">
                  Community
                </Link>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Language</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm px-3 py-2 border rounded-md transition-colors ${
                      router.locale === code 
                        ? 'bg-primary/10 text-primary border-primary' 
                        : 'text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 