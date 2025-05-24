
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
}

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= videos.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(videos.length - itemsPerView, 0) : prev - itemsPerView
    );
  };

  const visibleVideos = videos.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-serif font-bold text-swahili-dust-800">{title}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerView >= videos.length}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleVideos.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative aspect-video bg-swahili-dust-200 rounded-lg overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <Play className="h-12 w-12 text-swahili-dust-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-swahili-dust-50 text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <h3 className="mt-2 text-sm font-medium text-swahili-dust-800 group-hover:text-copper-wood-600 transition-colors">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
