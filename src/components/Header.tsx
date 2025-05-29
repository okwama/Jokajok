import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items: cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const cartItemsCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header className="bg-charred-wood border-b border-copper-wood-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/jk.png" alt="JokaJok" className="h-8 w-8" />
            <span className="text-2xl font-serif font-bold text-soft-sand">
              JokaJok
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-copper-wood-400 hover:text-copper-wood-300 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-copper-wood-400 hover:text-copper-wood-300 transition-colors">
              Products
            </Link>
            <Link to="/blog" className="text-copper-wood-400 hover:text-copper-wood-300 transition-colors">
              Stories
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:text-copper-wood-300">
                <Search className="h-5 w-5" />
              </Button>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:text-copper-wood-300">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:text-copper-wood-300">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-burnished-copper-500 text-charred-wood text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/account">
                    <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:text-copper-wood-300">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-copper-wood-400 hover:text-copper-wood-300"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-copper-wood-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-copper-wood-400 hover:text-copper-wood-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-charred-wood border-t border-copper-wood-700">
              <Link
                to="/"
                className="block px-3 py-2 text-copper-wood-400 hover:text-copper-wood-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-copper-wood-400 hover:text-copper-wood-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-copper-wood-400 hover:text-copper-wood-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Stories
              </Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:text-copper-wood-300">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-burnished-copper-500 text-charred-wood text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
                {user ? (
                  <>
                    <Link to="/account">
                      <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:text-copper-wood-300">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="text-copper-wood-400 hover:text-copper-wood-300"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-copper-wood-300">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="bg-burnished-copper-500 hover:bg-burnished-copper-600 text-charred-wood">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
