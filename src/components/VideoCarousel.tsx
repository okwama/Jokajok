
import React, { useRef } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust scroll distance
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-16 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-serif font-bold text-soft-sand">{title}</h2>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="h-10 w-10 p-0 border-copper-wood-600 text-copper-wood-300 hover:bg-copper-wood-800 bg-dark-clay-100/80 backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="h-10 w-10 p-0 border-copper-wood-600 text-copper-wood-300 hover:bg-copper-wood-800 bg-dark-clay-100/80 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
      >
        {videos.map((video) => (
          <div key={video.id} className="flex-none w-80">
            <NetflixStyleVideoCard video={video} isLarge={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
