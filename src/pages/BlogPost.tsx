
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data
  const post = {
    title: 'The Art of Maasai Beadwork: A Cultural Journey',
    author: 'Amara Kone',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Culture',
    image: '/lovable-uploads/1f2da5fd-3141-4cf1-bd07-05ce4871338d.png',
    content: `
      <p>The Maasai people of East Africa have been creating stunning beadwork for centuries, with each piece telling a story that transcends generations. This ancient art form is not merely decorative—it serves as a language, a marker of identity, and a connection to the spiritual world.</p>

      <h2>The Language of Colors</h2>
      <p>In Maasai culture, every color carries deep significance. Red represents bravery, strength, and unity—the color of the warrior's blood and the fierce courage required to protect the community. White symbolizes purity, health, and peace, often used in ceremonies and celebrations of new life.</p>

      <p>Blue, though traditionally rare in Maasai beadwork due to the scarcity of blue beads, represents the sky and water—essential elements for life. When blue beads became more accessible through trade, they were incorporated to represent energy and hospitality.</p>

      <h2>The Craft of Creation</h2>
      <p>Creating traditional Maasai beadwork requires patience, skill, and deep cultural knowledge. The process begins with selecting the right beads, often made from seeds, shells, or later, glass beads obtained through trade. Each piece is meticulously planned, with patterns that tell specific stories or convey particular meanings.</p>

      <p>Young Maasai girls learn this art from their mothers and grandmothers, starting with simple patterns and gradually mastering the complex designs that mark important life transitions. The creation of beadwork is a communal activity, bringing women together to share stories, wisdom, and strengthen community bonds.</p>

      <h2>Modern Interpretations</h2>
      <p>Today, Maasai beadwork continues to evolve while maintaining its cultural roots. Contemporary artisans blend traditional techniques with modern designs, creating pieces that honor their heritage while appealing to global markets. This evolution has provided economic opportunities for Maasai communities while preserving their cultural traditions.</p>

      <p>At JokaJok, we work directly with Maasai artisans to ensure that their traditional knowledge is respected and fairly compensated. Each beaded piece in our collection carries the authentic spirit of Maasai culture, connecting you to a tradition that spans centuries.</p>

      <h2>Supporting Artisan Communities</h2>
      <p>When you purchase authentic Maasai beadwork, you're not just buying a beautiful accessory—you're supporting a living culture and providing sustainable income for artisan communities. These partnerships help preserve traditional skills while allowing artisans to thrive in the modern economy.</p>

      <p>The next time you admire a piece of Maasai beadwork, remember that you're looking at more than decoration. You're witnessing a cultural language, a work of art, and a bridge between ancient wisdom and contemporary life.</p>
    `
  };

  return (
    <div className="min-h-screen bg-swahili-dust-50">
      {/* Header Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-swahili-dust-900/60 to-transparent"></div>
        
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="absolute top-8 left-8 inline-flex items-center text-swahili-dust-50 hover:text-copper-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <Badge className="bg-copper-600 text-white mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-swahili-dust-50 mb-4">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-swahili-dust-200">
          <div className="flex items-center space-x-6 text-swahili-dust-600">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-swahili-dust-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(
                /<h2>/g, '<h2 class="text-2xl font-serif font-bold text-swahili-dust-800 mt-8 mb-4">'
              ).replace(
                /<p>/g, '<p class="mb-6 text-lg leading-relaxed">'
              )
            }}
          />
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-swahili-dust-100 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-copper-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {post.author.split(' ').map(name => name[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-swahili-dust-800 mb-2">
                {post.author}
              </h3>
              <p className="text-swahili-dust-600">
                A passionate storyteller and cultural enthusiast, {post.author} has spent years documenting the rich traditions of African artisanship. Through her writing, she aims to bridge the gap between ancient wisdom and modern appreciation for handcrafted excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-serif font-bold text-swahili-dust-800 mb-6">
            Related Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/blog/sustainable-fashion-traditional-crafts" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/54ea69d9-3a59-46b5-8602-3d40a5c950ac.png" 
                    alt="Sustainable Fashion"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-bold text-swahili-dust-800 group-hover:text-copper-600 transition-colors">
                    Sustainable Fashion: How Traditional Crafts Shape Modern Style
                  </h4>
                </div>
              </div>
            </Link>
            
            <Link to="/blog/african-textile-patterns-symbolism" className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png" 
                    alt="Textile Patterns"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-bold text-swahili-dust-800 group-hover:text-copper-600 transition-colors">
                    The Symbolism Behind African Textile Patterns
                  </h4>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
