import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getProductById } from '@/services/dataService';
import { ArrowLeft, Star, Plus, Minus, Heart, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductColor {
  name: string;
  value: string;
  available: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  tags: string[];
  category: string;
  colors: ProductColor[];
  features: string[];
  materials: string;
  dimensions: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Natural Brown');
  const location = useLocation();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if product data was passed in the route state or fetch it by ID
  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setLoading(false);
    } else if (id) {
      // Fetch product by ID if no product data was passed
      const fetchProduct = async () => {
        try {
          const productData = await getProductById(id);
          if (productData) {
            setProduct(productData);
          } else {
            console.error('Product not found');
            // Optionally redirect to products page or show error
            // navigate('/products');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id, location.state]);



  useEffect(() => {
    console.log('ProductDetail mounted with ID:', id);
    
    const fetchProduct = async () => {
      setLoading(true);
      
      try {
        // Log the current path
        console.log('Current path:', window.location.pathname);
        
        // Check if ID is available
        if (!id) {
          console.error('No product ID provided in URL');
          navigate('/products', { replace: true });
          return;
        }
        
        console.log('Looking for product with ID:', id, 'Type:', typeof id);
        
        // Get the product from the data service
        const foundProduct = await getProductById(id);
        
        if (foundProduct) {
          console.log('Found product:', foundProduct);
          setProduct(foundProduct);
        } else {
          console.error('Product not found. Searched ID:', id);
          // Show a toast before redirecting
          toast({
            title: 'Product not found',
            description: 'The requested product could not be found.',
            variant: 'destructive',
          });
          navigate('/products', { replace: true });
        }
      } catch (error) {
        console.error('Error in fetchProduct:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while loading the product.',
          variant: 'destructive',
        });
        navigate('/products', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Convert price string to number (remove commas and parse)
    const price = parseFloat(product.price.replace(/,/g, ''));
    
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: price,
      image: product.images[0],
      quantity: quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-copper-wood-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charred-wood">Product not found</h2>
          <Link to="/products" className="mt-4 inline-block">
            <Button variant="outline" className="border-copper-wood-600">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
                    className="bg-transparent border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 h-8 flex items-center justify-center bg-dark-clay-100 border border-copper-wood-600 rounded-md">
                    <span className="text-soft-sand font-semibold">{quantity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-transparent border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood flex items-center justify-between px-6"
                  size="lg"
                >
                  <span>Add to Cart</span>
                  <span className="ml-4 border-l border-charred-wood/20 pl-4">
                    Ksh{(parseFloat(product.price.replace(/,/g, '')) * quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </Button>
                <Button variant="outline" size="lg" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800">
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
