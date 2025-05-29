
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  description,
  thumbnail,
  duration,
  category
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (showControls) {
      timeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + seconds);
    }
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        poster={thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onMouseMove={() => setShowControls(true)}
        onClick={togglePlay}
      >
        {/* Placeholder for video source - in real implementation, you'd have actual video files */}
        <source src={`/videos/${videoId}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Netflix-style overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Play button overlay for when video is paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 text-white border-2 border-white/30"
            onClick={togglePlay}
          >
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onMouseEnter={() => setShowControls(true)}
      >
        {/* Progress bar */}
        <div 
          className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-4"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-red-600 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full shadow-lg" />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => skip(-10)}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => skip(10)}
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {duration}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Netflix-style title and info */}
      <div className="absolute bottom-16 left-4 right-4">
        <div className="mb-2">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            {category.toUpperCase()}
          </span>
        </div>
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
