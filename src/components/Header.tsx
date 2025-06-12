import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
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

  const categories = [
    { name: 'Men', href: '/products?category=men' },
    { name: 'Ladies', href: '/products?category=ladies' },
    { name: 'Safari', href: '/products?category=safari' },
    { name: 'Redline', href: '/products?category=redline' },
  ];

  return (
    <header className="bg-charred-wood border-b border-copper-wood-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="../logo.png" alt="JokaJok" className="h-10 w-50" />
            {/* <span className="text-2xl font-serif font-bold text-soft-sand">
            
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood transition-colors px-3 py-2 rounded-md">
              Home
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood transition-colors">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-charred-wood border border-copper-wood-700">
                      {categories.map((category) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            to={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-charred-wood-700/50 hover:text-copper-wood-300 focus:bg-charred-wood-700/50 focus:text-copper-wood-300 text-copper-wood-400"
                          >
                            <div className="text-sm font-bold leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-copper-wood-500">
                              Explore our {category.name.toLowerCase()} collection
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/blog" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood transition-colors px-3 py-2 rounded-md">
              Stories
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
                <Search className="h-5 w-5" />
              </Button>
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
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
                    <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
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
                    <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
                      Log In
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
              className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood"
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
                className="block px-3 py-2 text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood transition-colors rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <div className="px-3 py-2">
                <div className="text-burnished-copper-400 font-medium mb-2">Products</div>
                <div className="pl-4 space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block py-1 px-2 text-copper-wood-500 hover:bg-burnished-copper-500 hover:text-charred-wood transition-colors rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/blog"
                className="block px-3 py-2 text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood transition-colors rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Stories
              </Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
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
                      <Button variant="ghost" size="icon" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:bg-burnished-copper-500 hover:text-charred-wood">
                        Log In
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
