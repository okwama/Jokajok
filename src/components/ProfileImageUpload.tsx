
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ currentImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32 rounded-full overflow-hidden bg-swahili-dust-600 border-2 border-copper-wood-600">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-copper-wood-400" />
          </div>
        )}
        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <Camera className="w-6 h-6 text-soft-sand" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      <Button variant="outline" size="sm" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-600 hover:text-charred-wood">
        Upload Photo
      </Button>
    </div>
  );
};

export default ProfileImageUpload;
