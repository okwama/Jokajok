import React, { useState, useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";

// Placeholder images for demonstration
const gallery1 = "../../public/lovable-uploads/1.jpg";
const gallery2 = "../../public/lovable-uploads/2.jpg";
const gallery3 = "../../public/lovable-uploads/3.jpg";
const gallery4 = "../../public/lovable-uploads/4.jpg";
const gallery5 = "../../public/lovable-uploads/5.jpg";
const gallery7 = "../../public/lovable-uploads/7.jpg";
const gallery8 = "../../public/lovable-uploads/8.jpg";
const gallery9 = "../../public/lovable-uploads/1.jpg";

interface ImageItem {
  src: string;
  title: string;
  width: number;
  height: number;
}

interface PositionedImage extends ImageItem {
  x: number;
  y: number;
  scaledWidth: number;
  scaledHeight: number;
}

const MasonryGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [positionedImages, setPositionedImages] = useState<PositionedImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compact selection of 8 images for homepage
  const images: ImageItem[] = [
    { src: gallery1, title: "Mountain Vista", width: 300, height: 400 },
    { src: gallery2, title: "Ocean Waves", width: 300, height: 300 },
    { src: gallery3, title: "Forest Path", width: 300, height: 450 },
    { src: gallery4, title: "Desert Landscape", width: 300, height: 350 },
    { src: gallery5, title: "City Skyline", width: 300, height: 400 },
    { src: gallery7, title: "Coastal View", width: 300, height: 280 },
    { src: gallery8, title: "Rolling Hills", width: 300, height: 380 },
    { src: gallery9, title: "Sunset Beach", width: 300, height: 320 },
  ];

  // Calculate compact masonry layout
  const calculateMasonryLayout = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    
    // Responsive gaps and columns
    let cols = 4;
    let gap = 16;
    
    if (containerWidth < 480) {
      cols = 1;
      gap = 8;
    } else if (containerWidth < 640) {
      cols = 2;
      gap = 12;
    } else if (containerWidth < 768) {
      cols = 2;
      gap = 16;
    } else if (containerWidth < 1024) {
      cols = 3;
      gap = 16;
    } else {
      cols = 4;
      gap = 16;
    }

    const columnWidth = (containerWidth - gap * (cols - 1)) / cols;
    const columnHeights = new Array(cols).fill(0);
    
    const positioned: PositionedImage[] = images.map((image) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Calculate scaled dimensions
      const scaledWidth = columnWidth;
      const scaledHeight = (image.height / image.width) * scaledWidth;
      
      // Position the image
      const x = shortestColumnIndex * (columnWidth + gap);
      const y = columnHeights[shortestColumnIndex];
      
      // Update column height
      columnHeights[shortestColumnIndex] += scaledHeight + gap;
      
      return {
        ...image,
        x,
        y,
        scaledWidth,
        scaledHeight,
      };
    });

    setPositionedImages(positioned);
  };

  useEffect(() => {
    const handleResize = () => {
      calculateMasonryLayout();
    };

    calculateMasonryLayout();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLightbox = (src: string) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Calculate max height to fill the section
  const maxHeight = Math.max(...positionedImages.map(img => img.y + img.scaledHeight)) || 400;

  return (
    <>
      <div className="w-full">
        {/* Full Section Masonry Grid */}
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ height: maxHeight || 400 }}
        >
          {positionedImages.map((image, index) => (
            <div
              key={index}
              className="absolute group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
              style={{
                left: `${image.x}px`,
                top: `${image.y}px`,
                width: `${image.scaledWidth}px`,
                height: `${image.scaledHeight}px`,
              }}
              onClick={() => openLightbox(image.src)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-none sm:rounded-lg shadow-sm sm:shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-none sm:rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Clean border effect */}
                <div className="absolute inset-0 rounded-none sm:rounded-lg border border-white/10 group-hover:border-white/40 transition-colors duration-300" />
              </div>
            </div>
          ))}
          
          {/* Subtle dark overlay for better contrast on dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGallery;