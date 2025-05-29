
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import VideoPlayer from '@/components/VideoPlayer';

const VideoWatch = () => {
  const { id } = useParams<{ id: string }>();

  // Mock video data - in real app, this would come from an API
  const videoData = {
    "1": {
      id: "1",
      title: "Meet Maria: Master Leather Craftsperson",
      description: "Follow Maria through her daily routine as she transforms raw leather into beautiful, functional art pieces. With over 20 years of experience, Maria shares the ancient techniques passed down through generations of Kenyan artisans. From selecting the finest hides to the final stitching, witness the meticulous process that makes each JokaJok product unique. Maria's workshop, nestled in the heart of Nairobi's artisan district, is where tradition meets innovation. She speaks about the cultural significance of leather work in her community and how it provides sustainable livelihoods for local families.",
      thumbnail: "/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png",
      duration: "8:24",
      category: "Artisan Stories",
      views: "12,459",
      uploadDate: "2024-01-15",
      tags: ["Craftsmanship", "Leather Work", "Kenya", "Tradition"]
    },
    "2": {
      id: "2",
      title: "The Art of Traditional Beadwork",
      description: "Dive deep into the colorful world of African beadwork, where each bead tells a story and every pattern carries meaning. This documentary-style video explores the intricate techniques used by Maasai artisans to create stunning jewelry and decorative pieces. Learn about the symbolism behind different colors and patterns, and how this ancient art form continues to evolve in contemporary fashion. The video takes you through the entire process, from selecting traditional materials to the final assembly of complex beaded designs.",
      thumbnail: "/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png",
      duration: "12:15",
      category: "Cultural Heritage",
      views: "8,732",
      uploadDate: "2024-01-12",
      tags: ["Beadwork", "Maasai", "Culture", "Jewelry"]
    }
  };

  const video = videoData[id as keyof typeof videoData];

  if (!video) {
    return (
      <div className="min-h-screen bg-charred-wood flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-soft-sand mb-4">Video not found</h1>
          <Link to="/blog">
            <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedVideos = [
    {
      id: "3",
      title: "From Raw Hide to Beautiful Bags",
      thumbnail: "/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png",
      duration: "15:30",
      views: "5,623"
    },
    {
      id: "4",
      title: "Community Impact Stories",
      thumbnail: "/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png",
      duration: "6:45",
      views: "9,841"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 27, 24, 0.8), rgba(30, 27, 24, 0.9)), url('/lovable-uploads/7cc2147c-4961-4230-8e23-a8fd6d332ca6.png')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/blog">
            <Button 
              variant="ghost" 
              className="text-soft-sand hover:text-copper-wood-300 hover:bg-copper-wood-800/50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Stories
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main video section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="mb-6">
              <VideoPlayer
                videoId={video.id}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                duration={video.duration}
                category={video.category}
              />
            </div>

            {/* Video info */}
            <Card className="bg-dark-clay-100/90 backdrop-blur-sm border-copper-wood-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-serif font-bold text-soft-sand mb-2">
                      {video.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-copper-wood-400">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-300">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-300">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-300">
                      <Download className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>

                <div className="border-t border-copper-wood-700 pt-4">
                  <h3 className="text-lg font-semibold text-soft-sand mb-3">Description</h3>
                  <p className="text-copper-wood-300 leading-relaxed mb-4">
                    {video.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-burnished-copper-500/20 text-burnished-copper-300 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with related videos */}
          <div className="lg:col-span-1">
            <Card className="bg-dark-clay-100/90 backdrop-blur-sm border-copper-wood-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-soft-sand mb-4">Related Videos</h3>
                <div className="space-y-4">
                  {relatedVideos.map((relatedVideo) => (
                    <Link 
                      key={relatedVideo.id} 
                      to={`/video/${relatedVideo.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={relatedVideo.thumbnail} 
                            alt={relatedVideo.title}
                            className="w-24 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {relatedVideo.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-soft-sand group-hover:text-burnished-copper-300 transition-colors line-clamp-2">
                            {relatedVideo.title}
                          </h4>
                          <p className="text-xs text-copper-wood-400 mt-1">
                            {relatedVideo.views} views
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWatch;
