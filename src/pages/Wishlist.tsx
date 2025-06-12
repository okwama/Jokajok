import { useEffect, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      startTransition(() => navigate('/login'));
    }
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold text-charred-wood mb-8">My Wishlist</h1>
      
      <div className="bg-soft-sand rounded-lg p-8 text-center">
        <Heart className="h-16 w-16 text-copper-wood-400 mx-auto mb-4" />
        <h2 className="text-xl font-serif font-semibold text-charred-wood mb-2">Your wishlist is empty</h2>
        <p className="text-copper-wood-600 mb-6">
          Save items you love by clicking the heart icon on any product.
        </p>
        <Button 
          onClick={() => startTransition(() => navigate('/products'))}
          className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Start Shopping
        </Button>
      </div>
    </div>
  );
};

export default Wishlist; 