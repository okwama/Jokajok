
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-swahili-dust-800 text-swahili-dust-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-copper-600 rounded-full flex items-center justify-center">
                <span className="text-swahili-dust-50 font-bold text-lg font-serif">JJ</span>
              </div>
              <span className="text-xl font-serif font-bold">JokaJok</span>
            </div>
            <p className="text-swahili-dust-300 text-sm leading-relaxed">
              Celebrating African heritage through authentic craftsmanship. 
              Each piece tells a story of tradition, culture, and timeless elegance.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-swahili-dust-400 hover:text-copper-wood-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-swahili-dust-400 hover:text-copper-wood-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-swahili-dust-400 hover:text-copper-wood-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Products</Link></li>
              <li><Link to="/blog" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Blog</Link></li>
              <li><Link to="/account" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping-info" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Returns</Link></li>
              <li><Link to="/size-guide" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Size Guide</Link></li>
              <li><Link to="/care-instructions" className="text-swahili-dust-300 hover:text-copper-wood-400 transition-colors">Care Instructions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-copper-wood-400" />
                <span className="text-swahili-dust-300 text-sm">Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-copper-wood-400" />
                <span className="text-swahili-dust-300 text-sm">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-copper-wood-400" />
                <span className="text-swahili-dust-300 text-sm">hello@jokajok.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-swahili-dust-700 mt-8 pt-8 text-center">
          <p className="text-swahili-dust-400 text-sm">
            © 2024 JokaJok. All rights reserved. Made with ❤️ in Africa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
