
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  { title: 'HOME', href: '/' },
  { title: 'SHOP', href: '/shop' },
  { title: 'COLLECTIONS', href: '/collections' },
  { title: 'NEW ARRIVALS', href: '/new-arrivals' },
  { title: 'SALE', href: '/sale' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-none md:w-48">
            <Link to="/" className="block">
              <h1 className="text-3xl sm:text-4xl font-bebas tracking-wider">GLAM HUNT</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:flex-1 md:justify-center">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    className="font-bebas text-lg tracking-wide hover:text-gray-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Shopping bag" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-50 flex flex-col px-4 py-8 md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bebas tracking-wider">GLAM HUNT</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className="font-bebas text-2xl tracking-wide block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <Link 
            to="/account" 
            className="flex items-center space-x-2 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="h-5 w-5" />
            <span>Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
