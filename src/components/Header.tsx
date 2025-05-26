
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Blog', href: '/blog' },
    
  ];

  return (
    <header className="bg-dark-clay-50 shadow-lg sticky top-0 z-50 border-b border-swahili-dust-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-12 h-12 bg-burnished-copper rounded-full flex items-center justify-center stamped-button">
             <img src="" alt="JJ" className="w-12 h-12" />
            </div> */}
            <span className="text-2xl font-serif font-bold text-soft-sand">JokaJok</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-copper-wood-400 hover:text-copper-wood-300 font-medium transition-all duration-200 relative"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-burnished-copper opacity-0 hover:opacity-20 rounded transition-opacity duration-200"></div>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-copper-wood-400 hover:text-copper-wood-300 hover:bg-swahili-dust-800">
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-copper-wood-300 hover:bg-swahili-dust-800">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline ml-2">{user.name}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="hidden sm:flex text-copper-wood-400 hover:text-copper-wood-300 hover:bg-swahili-dust-800"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-copper-wood-300 hover:bg-swahili-dust-800">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm" className="border-burnished-copper text-copper-wood-400 hover:bg-burnished-copper hover:text-charred-wood">Register</Button>
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-copper-wood-300 hover:bg-swahili-dust-800">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-burnished-copper text-charred-wood"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-copper-wood-400 hover:text-copper-wood-300 hover:bg-swahili-dust-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-swahili-dust-800 rounded-lg mt-2 kanga-pattern">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-copper-wood-400 hover:text-copper-wood-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-copper-wood-400 hover:text-copper-wood-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-copper-wood-400 hover:text-copper-wood-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
