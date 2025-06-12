import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetflixStyleVideoCard from '@/components/NetflixStyleVideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  description?: string;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos }) => {
  const safeVideos = videos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= safeVideos.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(safeVideos.length - itemsPerView, 0) : prev - itemsPerView
    );
  };

  const visibleVideos = safeVideos.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="mb-24 pb-8 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-soft-sand">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0 border-copper-wood-600 text-copper-wood-300 hover:bg-copper-wood-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView >= safeVideos.length}
            className="h-8 w-8 p-0 border-copper-wood-600 text-copper-wood-300 hover:bg-copper-wood-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleVideos.map((video) => (
          <NetflixStyleVideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
