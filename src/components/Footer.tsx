
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="mb-16 text-center max-w-md mx-auto">
          <h3 className="font-bebas text-3xl mb-4">JOIN OUR NEWSLETTER</h3>
          <p className="text-gray-300 mb-6">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border-0 text-white placeholder:text-gray-400"
            />
            <Button className="bg-white text-black hover:bg-gray-200 font-medium">
              SUBSCRIBE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h4 className="font-bebas text-xl mb-4">SHOP</h4>
            <ul className="space-y-3">
              <li><Link to="/collections" className="text-gray-300 hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/trending" className="text-gray-300 hover:text-white transition-colors">Trending</Link></li>
              <li><Link to="/sale" className="text-gray-300 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bebas text-xl mb-4">INFORMATION</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="text-gray-300 hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/stores" className="text-gray-300 hover:text-white transition-colors">Our Stores</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bebas text-xl mb-4">CUSTOMER SERVICE</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/size-guide" className="text-gray-300 hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bebas text-xl mb-4">CONNECT WITH US</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="mailto:info@glamhunt.com" className="text-gray-300 hover:text-white">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Email: info@glamhunt.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Glam Hunt. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
