
import React, { useState } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  description?: string;
}

interface NetflixStyleVideoCardProps {
  video: Video;
  isLarge?: boolean;
}

const NetflixStyleVideoCard: React.FC<NetflixStyleVideoCardProps> = ({ 
  video, 
  isLarge = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-500 ease-out ${
        isLarge ? 'aspect-[16/9]' : 'aspect-video'
      } ${
        isHovered 
          ? 'scale-110 z-30 shadow-2xl shadow-black/50' 
          : 'scale-100 z-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Thumbnail Container */}
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-dark-clay-100">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110 brightness-75' : 'scale-100 brightness-100'
          }`}
        />
        
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-60'
        }`} />
        
        {/* Duration badge */}
        <div className="absolute top-3 right-3 bg-black/80 text-white text-sm px-3 py-1 rounded-full font-medium">
          {video.duration}
        </div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide">
          {video.category.toUpperCase()}
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`font-serif font-bold text-white mb-2 transition-all duration-300 ${
            isLarge ? 'text-xl' : 'text-lg'
          } ${isHovered ? 'mb-3' : ''}`}>
            {video.title}
          </h3>
          
          {/* Description (shows on hover) */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            {video.description && (
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {video.description}
              </p>
            )}
            
            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              <Link to={`/video/${video.id}`}>
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-white/90 font-semibold px-4 py-2 transition-all duration-200 hover:scale-105"
                >
                  <Play className="h-4 w-4 mr-2" fill="currentColor" />
                  Play
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-400 text-white hover:bg-white/20 backdrop-blur-sm bg-black/20 transition-all duration-200 hover:scale-105"
              >
                <Info className="h-4 w-4 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>

        {/* Central play button (shows on hover) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link to={`/video/${video.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NetflixStyleVideoCard;
