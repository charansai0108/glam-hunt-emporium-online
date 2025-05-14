
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2786&q=80")',
            opacity: 0.8
          }}
        />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider animate-fade-in">
          DISCOVER YOUR STYLE
        </h1>
        <p className="text-lg md:text-xl max-w-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Explore our new collection and find the perfect pieces to express your unique style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            asChild
            className="bg-white text-black hover:bg-gray-200 min-w-[150px] font-bebas text-lg tracking-wider py-6"
          >
            <Link to="/shop">SHOP NOW</Link>
          </Button>
          <Button 
            asChild
            variant="outline" 
            className="text-white border-white hover:bg-white/10 min-w-[150px] font-bebas text-lg tracking-wider py-6"
          >
            <Link to="/collections">EXPLORE</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
