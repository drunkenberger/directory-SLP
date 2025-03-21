import { useTranslation } from 'next-i18next';
import { Place } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface PlaceCardProps {
  place: Place;
  featured?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function PlaceCard({ place, featured, onClick, isSelected }: PlaceCardProps) {
  const { t } = useTranslation('common');
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Category colors map for accent colors
  const categoryColors: Record<string, string> = {
    restaurant: 'border-amber-600 text-amber-600 bg-amber-50',
    cafe: 'border-emerald-600 text-emerald-600 bg-emerald-50',
    bar: 'border-purple-600 text-purple-600 bg-purple-50',
    hotel: 'border-blue-600 text-blue-600 bg-blue-50',
    museum: 'border-red-600 text-red-600 bg-red-50',
    park: 'border-green-600 text-green-600 bg-green-50',
    shop: 'border-orange-600 text-orange-600 bg-orange-50',
    service: 'border-indigo-600 text-indigo-600 bg-indigo-50',
    other: 'border-gray-600 text-gray-600 bg-gray-50',
  };

  // Get default image based on category
  const getDefaultImage = (category: string) => {
    const defaultImages: Record<string, string> = {
      restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      cafe: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
      bar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
      hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      museum: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3',
      park: 'https://images.unsplash.com/photo-1551717743-49959800b1f6',
      shop: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      service: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    };
    return defaultImages[category] || 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd';
  };

  // Process image URL to handle various formats
  const getImageUrl = (url: string | undefined) => {
    console.log(`Processing image URL for ${place.name}:`, { originalUrl: url });
    
    if (!url) {
      console.log(`No URL provided for ${place.name}, using default image`);
      return getDefaultImage(place.category);
    }
    
    try {
      // Clean the URL first
      url = url.trim();
      console.log(`Cleaned URL for ${place.name}:`, url);
      
      // Handle Google Drive links
      if (url.includes('drive.google.com')) {
        console.log(`Processing Google Drive URL for ${place.name}`);
        // Handle different Google Drive URL formats
        let fileId = null;
        
        // Format: /file/d/[ID]/view
        const fileIdMatch = url.match(/\/file\/d\/([-\w]{25,})/);
        if (fileIdMatch) {
          fileId = fileIdMatch[1];
          console.log(`Found file ID from /file/d/ format:`, fileId);
        }
        
        // Format: /open?id=[ID]
        const idParamMatch = url.match(/[?&]id=([-\w]{25,})/);
        if (!fileId && idParamMatch) {
          fileId = idParamMatch[1];
          console.log(`Found file ID from open?id format:`, fileId);
        }
        
        // Format: /uc?id=[ID]
        const ucIdMatch = url.match(/\/uc\?.*id=([-\w]{25,})/);
        if (!fileId && ucIdMatch) {
          fileId = ucIdMatch[1];
          console.log(`Found file ID from uc?id format:`, fileId);
        }
        
        if (fileId) {
          const processedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
          console.log(`Processed Google Drive URL for ${place.name}:`, processedUrl);
          return processedUrl;
        } else {
          console.error(`Could not extract file ID from Google Drive URL for ${place.name}:`, url);
        }
      }
      
      // Handle Blogger URLs
      if (url.includes('blogger.googleusercontent.com')) {
        console.log(`Processing Blogger URL for ${place.name}`);
        const processedUrl = url.split('=')[0];
        console.log(`Processed Blogger URL:`, processedUrl);
        return processedUrl;
      }
      
      // Handle TripAdvisor URLs
      if (url.includes('tripadvisor.com')) {
        console.log(`Using TripAdvisor URL as is for ${place.name}:`, url);
        return url;
      }
      
      // For all other URLs, validate the URL
      try {
        new URL(url);
        console.log(`Valid direct URL for ${place.name}:`, url);
        return url;
      } catch (urlError) {
        console.error(`Invalid URL format for ${place.name}:`, url);
        return getDefaultImage(place.category);
      }
    } catch (error) {
      console.error(`Error processing image URL for ${place.name}:`, error);
      return getDefaultImage(place.category);
    }
  };
  
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden shadow-elegant hover-lift transition-all duration-300 cursor-pointer ${featured ? 'featured-card border-t-4 border-primary' : ''} ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageError ? getDefaultImage(place.category) : getImageUrl(place.imageUrl)}
          alt={place.name}
          className={`object-cover transition-transform duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={featured}
          onError={() => setImageError(true)}
        />
        
        {/* Category Badge */}
        <div className={`absolute top-4 left-4 z-10 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${categoryColors[place.category] || categoryColors.other}`}>
            {t(`categories.${place.category}`)}
          </span>
        </div>
        
        {/* Featured Badge */}
        {place.featured && (
          <div className={`absolute top-4 right-4 z-10 transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}>
            <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary text-white">
              {t('featured')}
            </span>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-100'}`}></div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className={`font-serif text-xl font-bold text-gray-900 mb-2 line-clamp-1 transition-colors duration-300 ${isHovered ? 'text-primary' : ''}`}>
          {place.name}
        </h3>
        
        <div className="flex items-center mb-3">
          {/* Rating */}
          {place.rating && (
            <div className={`flex items-center mr-4 transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(place.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} transition-all duration-300 ${isHovered && i < Math.floor(place.rating || 0) ? 'scale-125' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">{place.rating.toFixed(1)}</span>
            </div>
          )}
          
          {/* Price Level */}
          {place.priceLevel && (
            <div className="text-sm text-gray-600">
              {Array(place.priceLevel).fill('$').join('')}
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {place.description}
        </p>
        
        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="line-clamp-1">{place.address}</span>
        </div>
        
        {/* Tags */}
        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {place.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
            {place.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                +{place.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
            {t('placeCard.viewDetails')}
          </span>
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
} 