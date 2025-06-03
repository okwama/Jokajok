import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import VideoCarousel from '@/components/VideoCarousel';

const Blog = () => {
  const videoCategories = [
    {
      title: "Artisan Stories",
      videos: [
        {
          id: "1",
          title: "Meet Maria: Master Leather Craftsperson",
          thumbnail: "/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png",
          duration: "8:24",
          category: "artisan",
          description: "Follow Maria through her daily routine as she transforms raw leather into beautiful, functional art pieces."
        },
        {
          id: "2",
          title: "The Art of Traditional Beadwork",
          thumbnail: "/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png",
          duration: "12:15",
          category: "artisan",
          description: "Dive deep into the colorful world of African beadwork, where each bead tells a story."
        },
        {
          id: "3",
          title: "From Raw Hide to Beautiful Bags",
          thumbnail: "/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png",
          duration: "15:30",
          category: "artisan",
          description: "Witness the complete transformation process from raw materials to finished products."
        },
        {
          id: "4",
          title: "Community Impact Stories",
          thumbnail: "/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png",
          duration: "6:45",
          category: "artisan",
          description: "See how our partnerships create positive change in local communities."
        }
      ]
    },
    {
      title: "Behind the Scenes",
      videos: [
        {
          id: "5",
          title: "Workshop Tour: Where Magic Happens",
          thumbnail: "/lovable-uploads/54ea69d9-3a59-46b5-8602-3d40a5c950ac.png",
          duration: "10:22",
          category: "behind-scenes",
          description: "Take an exclusive tour of our artisan workshops and see the craftsmanship up close."
        },
        {
          id: "6",
          title: "Quality Control Process",
          thumbnail: "/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png",
          duration: "7:18",
          category: "behind-scenes",
          description: "Learn about our rigorous quality standards and testing procedures."
        },
        {
          id: "7",
          title: "Packaging with Love",
          thumbnail: "/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png",
          duration: "5:33",
          category: "behind-scenes",
          description: "See how each product is carefully packaged with attention to every detail."
        },
        {
          id: "8",
          title: "Design Process Revealed",
          thumbnail: "/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png",
          duration: "13:45",
          category: "behind-scenes",
          description: "Follow our design team as they create new products from concept to completion."
        }
      ]
    },
    {
      title: "Cultural Heritage",
      videos: [
        {
          id: "9",
          title: "The History of African Leather Work",
          thumbnail: "/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png",
          duration: "18:12",
          category: "culture",
          description: "Explore the rich history and cultural significance of leather craftsmanship in Africa."
        },
        {
          id: "10",
          title: "Symbols and Meanings in African Art",
          thumbnail: "/lovable-uploads/54ea69d9-3a59-46b5-8602-3d40a5c950ac.png",
          duration: "14:28",
          category: "culture",
          description: "Understand the deep meanings behind traditional African symbols and patterns."
        },
        {
          id: "11",
          title: "Traditional vs Modern Techniques",
          thumbnail: "/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png",
          duration: "11:55",
          category: "culture",
          description: "See how ancient techniques are being adapted for modern production."
        },
        {
          id: "12",
          title: "Preserving Ancient Crafts",
          thumbnail: "/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png",
          duration: "9:17",
          category: "culture",
          description: "Learn about efforts to preserve traditional craftsmanship for future generations."
        }
      ]
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Maasai Beadwork: A Cultural Journey',
      excerpt: 'Discover the rich history and intricate techniques behind traditional Maasai beadwork, where every color tells a story.',
      author: 'Amara Kone',
      date: '2024-01-15',
      category: 'Culture',
      image: '/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png',
      readTime: '5 min read',
      slug: 'maasai-beadwork-cultural-journey'
    },
    {
      id: 2,
      title: 'Sustainable Fashion: How Traditional Crafts Shape Modern Style',
      excerpt: 'Explore how ancient African textile traditions are influencing contemporary sustainable fashion movements worldwide.',
      author: 'Kwame Asante',
      date: '2024-01-12',
      category: 'Sustainability',
      image: '/lovable-uploads/54ea69d9-3a59-46b5-8602-3d40a5c950ac.png',
      readTime: '8 min read',
      slug: 'sustainable-fashion-traditional-crafts'
    },
    {
      id: 3,
      title: 'From Nairobi to New York: Our Artisan Partnership Stories',
      excerpt: 'Meet the talented artisans behind our beautiful products and learn about our fair trade partnerships across Africa.',
      author: 'Fatima Al-Rashid',
      date: '2024-01-10',
      category: 'Stories',
      image: '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      readTime: '6 min read',
      slug: 'artisan-partnership-stories'
    },
    {
      id: 4,
      title: 'The Symbolism Behind African Textile Patterns',
      excerpt: 'Delve into the meaningful symbols and patterns found in traditional African textiles and their cultural significance.',
      author: 'Zara Mwangi',
      date: '2024-01-08',
      category: 'Culture',
      image: '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      readTime: '7 min read',
      slug: 'african-textile-patterns-symbolism'
    },
    {
      id: 5,
      title: 'Caring for Your Handcrafted Leather Goods',
      excerpt: 'Learn the best practices for maintaining and preserving your authentic African leather accessories for years to come.',
      author: 'Omar Hassan',
      date: '2024-01-05',
      category: 'Care Guide',
      image: '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png',
      readTime: '4 min read',
      slug: 'caring-handcrafted-leather-goods'
    },
    {
      id: 6,
      title: 'The Journey of a JokaJok Bag: From Concept to Creation',
      excerpt: 'Take a behind-the-scenes look at our design process and see how traditional techniques meet modern innovation.',
      author: 'Amina Sekou',
      date: '2024-01-03',
      category: 'Behind the Scenes',
      image: '/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png',
      readTime: '10 min read',
      slug: 'jokajok-bag-journey-creation'
    }
  ];

  const categories = ['All', 'Culture', 'Sustainability', 'Stories', 'Care Guide', 'Behind the Scenes'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Culture': 'bg-orange-100 text-orange-800',
      'Sustainability': 'bg-orange-100 text-orange-800',
      'Stories': 'bg-orange-100 text-orange-800',
      'Care Guide': 'bg-orange-100 text-orange-800',
      'Behind the Scenes': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-swahili-dust-100 text-swahili-dust-800';
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 27, 24, 0.85), rgba(30, 27, 24, 0.9)), url('/lovable-uploads/7cc2147c-4961-4230-8e23-a8fd6d332ca6.png')`
      }}
    >
      {/* Hero Section */}
      <section className="py-16 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-soft-sand mb-4">
            Stories from Africa
          </h1>
          <p className="text-xl text-copper-wood-300 max-w-2xl mx-auto">
            Discover the rich culture, traditions, and stories behind every piece in our collection
          </p>
        </div>
      </section>

      {/* Video Content Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-soft-sand mb-8 text-center">
            Video Stories
          </h2>
          {videoCategories.map((category, index) => (
            <VideoCarousel 
              key={index}
              title={category.title} 
              videos={category.videos} 
            />
          ))}
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-copper-wood-600 text-copper-wood-300 hover:bg-copper-wood-800"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-soft-sand mb-8 text-center">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-dark-clay-100/90 backdrop-blur-sm border border-copper-wood-700">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <span className="text-sm text-copper-wood-400">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-soft-sand mb-3 group-hover:text-burnished-copper-300 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-copper-wood-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-copper-wood-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="p-0 h-auto text-burnished-copper-300 hover:text-burnished-copper-200 group">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-soft-sand mb-4">
            Stay Connected with Our Stories
          </h2>
          <p className="text-xl text-copper-wood-300 mb-8">
            Subscribe to get the latest stories, cultural insights, and artisan spotlights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-copper-wood-600 focus:outline-none focus:ring-2 focus:ring-burnished-copper-500 bg-dark-clay-100/80 text-soft-sand placeholder-copper-wood-400"
            />
            <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
