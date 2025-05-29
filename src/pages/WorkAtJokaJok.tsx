
import React from 'react';
import { Mail, MapPin, Users, Heart, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WorkAtJokaJok = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Diverse Team',
      description: 'Work with talented people from across Africa and beyond'
    },
    {
      icon: Heart,
      title: 'Purpose-Driven',
      description: 'Make a real impact preserving and celebrating African heritage'
    },
    {
      icon: Star,
      title: 'Growth Opportunities',
      description: 'Develop your skills in a fast-growing, dynamic environment'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Your contributions are valued and celebrated'
    }
  ];

  const openPositions = [
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Nairobi, Kenya',
      type: 'Full-time'
    },
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Artisan Relations Manager',
      department: 'Operations',
      location: 'Lagos, Nigeria',
      type: 'Full-time'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Cape Town, South Africa',
      type: 'Contract'
    }
  ];

  // Masonry grid images using placeholder images
  const masonryImages = [
    {
      src: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=300&fit=crop',
      alt: 'Team collaboration in our Nairobi office',
      height: 'h-64'
    },
    {
      src: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=500&fit=crop',
      alt: 'Artisan workshop visit',
      height: 'h-80'
    },
    {
      src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=250&fit=crop',
      alt: 'Creative brainstorming session',
      height: 'h-56'
    },
    {
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop',
      alt: 'Team building retreat',
      height: 'h-72'
    },
    {
      src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=350&fit=crop',
      alt: 'Product development workshop',
      height: 'h-64'
    },
    {
      src: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=450&fit=crop',
      alt: 'Celebrating team achievements',
      height: 'h-76'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-serif font-bold text-soft-sand mb-6">
            Work at JokaJok
          </h1>
          <p className="text-xl text-copper-wood-400 mb-8 leading-relaxed">
            Join our mission to celebrate African heritage through authentic craftsmanship. 
            Be part of a team that's making a real difference in preserving traditional arts 
            while building the future of African commerce.
          </p>
          <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood text-lg px-8 py-3">
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Masonry Image Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-soft-sand text-center mb-12">
            Life at JokaJok
          </h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {masonryImages.map((image, index) => (
              <div key={index} className="break-inside-avoid">
                <div className={`${image.height} overflow-hidden rounded-lg shadow-lg border border-copper-wood-700`}>
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-soft-sand text-center mb-12">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-dark-clay-100 border-copper-wood-700 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-burnished-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-charred-wood" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-soft-sand mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-copper-wood-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-soft-sand text-center mb-12">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="bg-dark-clay-100 border-copper-wood-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-soft-sand mb-2">
                        {position.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-copper-wood-400">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-soft-sand mb-6">
            Don't See Your Role?
          </h2>
          <p className="text-xl text-copper-wood-400 mb-8">
            We're always looking for talented individuals who share our passion for African heritage. 
            Send us your resume and let us know how you'd like to contribute.
          </p>
          <div className="flex justify-center">
            <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood text-lg px-8 py-3">
              <Mail className="h-5 w-5 mr-2" />
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkAtJokaJok;
