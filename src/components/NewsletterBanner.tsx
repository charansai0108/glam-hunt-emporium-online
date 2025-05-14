
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterBanner = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-bebas text-4xl md:text-5xl mb-6 tracking-wide">JOIN THE GLAM HUNT FAMILY</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up to our newsletter to receive exclusive offers, early access to new collections, and styling tips directly to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/10 border-0 text-white placeholder:text-gray-400 flex-grow"
            />
            <Button className="bg-white text-black hover:bg-gray-200 font-medium whitespace-nowrap">
              SUBSCRIBE
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
