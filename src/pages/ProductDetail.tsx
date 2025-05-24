
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Natural Brown');

  // Mock product data - in real app, this would come from API
  const product = {
    id: id || '1', // Keep as string to match useParams
    name: 'Maasai Leather Tote',
    price: 89,
    images: [
      '/lovable-uploads/0daed206-b752-41cd-801e-f2504ba1502b.png',
      '/lovable-uploads/d19cae6b-1ba4-4ca4-8f45-8fd9e217779c.png',
      '/lovable-uploads/673850a9-e5eb-4247-ad41-baa3193363fb.png'
    ],
    colors: [
      { name: 'Natural Brown', value: '#8B4513', available: true },
      { name: 'Dark Walnut', value: '#654321', available: true },
      { name: 'Cognac', value: '#A0522D', available: true },
      { name: 'Black Coffee', value: '#3C2414', available: false },
      { name: 'Caramel', value: '#C19A6B', available: true }
    ],
    rating: 4.8,
    reviews: 124,
    description: 'This stunning Maasai leather tote is handcrafted by skilled artisans using traditional techniques passed down through generations. Made from premium quality leather and featuring authentic African patterns.',
    features: [
      'Handcrafted by Maasai artisans',
      'Premium quality leather',
      'Traditional African patterns',
      'Spacious interior with pockets',
      'Adjustable straps',
      'Eco-friendly production'
    ],
    materials: 'Genuine leather, cotton lining, brass hardware',
    dimensions: '40cm x 35cm x 15cm',
    inStock: true
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} in ${selectedColor} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-swahili-dust-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link to="/products" className="inline-flex items-center text-copper-wood-600 hover:text-copper-wood-700 mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-swahili-dust-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? 'border-copper-600' : 'border-swahili-dust-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-swahili-dust-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-copper-500 fill-current' : 'text-swahili-dust-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-swahili-dust-600">({product.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  In Stock
                </Badge>
              </div>
              <p className="text-3xl font-bold text-copper-600 mb-6">${product.price}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-swahili-dust-800 mb-2">Description</h3>
              <p className="text-swahili-dust-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-swahili-dust-800 mb-3">Color: {selectedColor}</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color.name)}
                    disabled={!color.available}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.name 
                        ? 'border-copper-600 ring-2 ring-copper-200' 
                        : 'border-swahili-dust-300'
                    } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {!color.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-swahili-dust-600 rotate-45"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-swahili-dust-800 mb-2">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-swahili-dust-600">
                    <div className="w-2 h-2 bg-copper-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-lg font-semibold text-swahili-dust-800">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-copper-600 hover:bg-copper-700"
                  size="lg"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t border-swahili-dust-200">
              <div>
                <h4 className="font-semibold text-swahili-dust-800">Materials:</h4>
                <p className="text-swahili-dust-600">{product.materials}</p>
              </div>
              <div>
                <h4 className="font-semibold text-swahili-dust-800">Dimensions:</h4>
                <p className="text-swahili-dust-600">{product.dimensions}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
