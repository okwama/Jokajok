
import React from 'react';
import { Play, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${
        isLarge ? 'aspect-[16/9]' : 'aspect-video'
      } hover:scale-105 hover:z-10`}
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Duration badge */}
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        
        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
          {video.category.toUpperCase()}
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/50"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/video/${video.id}`);
            }}
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>
      </div>

      {/* Netflix-style info card - always visible */}
      <div className="absolute top-full left-0 right-0 bg-dark-clay-100 border border-copper-wood-700 rounded-b-lg p-4 shadow-2xl transform transition-all duration-300 z-20 h-40 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <h3 className="text-soft-sand font-semibold mb-2 line-clamp-2">
            {video.title}
          </h3>
          <p className="text-copper-wood-400 text-sm line-clamp-2 overflow-hidden">
            {video.description || "Watch this amazing video to learn more about our artisan craftsmanship."}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-3 flex-shrink-0">
          <Button 
            size="sm" 
            className="bg-white text-black hover:bg-white/90"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/video/${video.id}`);
            }}
          >
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-copper-wood-600 text-copper-wood-300 hover:bg-copper-wood-800"
            onClick={(e) => {
              e.stopPropagation();
              // Add more info functionality here later
            }}
          >
            <Info className="h-4 w-4 mr-2" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetflixStyleVideoCard;
