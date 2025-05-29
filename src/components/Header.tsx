
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
  ];

  const menCollection = [
    'DOUBLE STRAP', 'CIGAR POUCH', 'DIGITAL NOMAD', 'DOUBLE STRAP NUBUCK',
    'MAINEST SATCHEL', 'LAPTOP SLEEVE', 'WANDERLUST', 'URBAN NATIVE',
    'SWOYO', 'RETRO SAFARI', 'NAYABINGI DRUM'
  ];

  const ladiesCollection = [
    'AFRICAN SUMMER', 'MALKIA', 'TEKA', 'WENDO', 'WARIDI',
    'KANINI KASEO', 'WANDERLUST', 'YASMINE'
  ];

  const safariCollection = [
    'THAYAH WEEKENDER', 'KIFARU 360', 'WARIDI', 'OTONGOLO MONEY MAKER',
    'TEKA', 'WANDERLUST LADIES', 'YASMINE', 'KIFARU 360 LARGE CHECKIN',
    'CAMACHO', 'CAMACHO SCORPION', 'DIGITAL NOMAD'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-dark-clay-50 shadow-lg sticky top-0 z-50 border-b border-copper-wood-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold text-soft-sand">JokaJok</span>
          </Link>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-copper-wood-400 hover:text-burnished-copper-500 bg-transparent">
                    Ladies
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-4 bg-dark-clay-100 border border-copper-wood-700">
                      <h3 className="font-serif font-semibold text-soft-sand mb-3">LADIES COLLECTION</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {ladiesCollection.map((item, index) => (
                          <Link
                            key={index}
                            to={`/products?category=ladies&item=${encodeURIComponent(item)}`}
                            className="text-copper-wood-400 hover:text-burnished-copper-500 text-sm py-1"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-copper-wood-400 hover:text-burnished-copper-500 bg-transparent">
                    Men
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-4 bg-dark-clay-100 border border-copper-wood-700">
                      <h3 className="font-serif font-semibold text-soft-sand mb-3">MEN'S COLLECTION</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {menCollection.map((item, index) => (
                          <Link
                            key={index}
                            to={`/products?category=men&item=${encodeURIComponent(item)}`}
                            className="text-copper-wood-400 hover:text-burnished-copper-500 text-sm py-1"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-copper-wood-400 hover:text-burnished-copper-500 bg-transparent">
                    Safari
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-4 bg-dark-clay-100 border border-copper-wood-700">
                      <h3 className="font-serif font-semibold text-soft-sand mb-3">SAFARI COLLECTION</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {safariCollection.map((item, index) => (
                          <Link
                            key={index}
                            to={`/products?category=safari&item=${encodeURIComponent(item)}`}
                            className="text-copper-wood-400 hover:text-burnished-copper-500 text-sm py-1"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/products?category=redline"
                    className="text-copper-wood-400 hover:text-burnished-copper-500 font-medium transition-all duration-200 relative"
                  >
                    Redline
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-copper-wood-400 hover:text-burnished-copper-500 font-medium transition-all duration-200 relative"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-burnished-copper-500 opacity-0 hover:opacity-20 rounded transition-opacity duration-200"></div>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 bg-dark-clay-100 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copper-wood-400 hover:text-burnished-copper-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-burnished-copper-500 hover:bg-swahili-dust-700">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline ml-2">{user.email}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="hidden sm:flex text-copper-wood-400 hover:text-burnished-copper-500 hover:bg-swahili-dust-700"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-burnished-copper-500 hover:bg-swahili-dust-700">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm" className="border-burnished-copper-500 text-burnished-copper-500 hover:bg-burnished-copper-500 hover:text-charred-wood">Register</Button>
                </Link>
              </div>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="text-copper-wood-400 hover:text-burnished-copper-500 hover:bg-swahili-dust-700">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-burnished-copper-500 text-charred-wood"
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
              className="md:hidden text-copper-wood-400 hover:text-burnished-copper-500 hover:bg-swahili-dust-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-swahili-dust-800 rounded-lg mt-2 border border-copper-wood-700">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-dark-clay-100 border-copper-wood-600 text-soft-sand placeholder:text-copper-wood-400"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copper-wood-400"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              <Link
                to="/products?category=ladies"
                className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ladies
              </Link>
              <Link
                to="/products?category=men"
                className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/products?category=safari"
                className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Safari
              </Link>
              <Link
                to="/products?category=redline"
                className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Redline
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-copper-wood-400 hover:text-burnished-copper-500 font-medium"
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
