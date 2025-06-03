
import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductGridSkeleton } from '@/components/ui/product-skeleton';
import LazyImage from '@/components/LazyImage';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import categoriesData from '@/data/categories.json';

const NewReleasesSection = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const newReleases = categoriesData.newReleases;

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuickCheckout = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    });
    // Add quick checkout logic here
  };

  return (
    <section className="py-20 bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-soft-sand mb-4">
            New Releases
          </h2>
          <p className="text-xl text-copper-wood-400 max-w-2xl mx-auto">
            Discover our latest handcrafted pieces, fresh from the artisan workshops
          </p>
        </div>

        <Suspense fallback={<ProductGridSkeleton count={3} />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newReleases.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-dark-clay-100 border border-copper-wood-700 relative">
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-burnished-copper-500 text-charred-wood px-3 py-1 text-xs font-semibold rounded-full z-10">
                    NEW
                  </div>
                )}
                <div className="aspect-square overflow-hidden">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-burnished-copper-500 fill-current' : 'text-copper-wood-600'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-copper-wood-400">({product.rating})</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-soft-sand mb-2">
                    {product.name}
                  </h3>
                  <p className="text-copper-wood-400 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-burnished-copper-500">Ksh{product.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-copper-wood-600 hover:bg-copper-wood-700 text-soft-sand border-0"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      onClick={() => handleQuickCheckout(product)}
                      className="flex-1 bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood border-0"
                      size="sm"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Buy
                    </Button>
                  </div>
                  
                  <Link to={`/products/${product.id}`} className="block mt-2">
                    <Button 
                      variant="outline"
                      className="w-full border-copper-wood-600 text-copper-wood-400 hover:bg-copper-wood-800"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Suspense>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
              View All New Releases
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewReleasesSection;
