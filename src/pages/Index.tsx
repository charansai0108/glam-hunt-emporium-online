
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Testimonials from '@/components/Testimonials';
import NewsletterBanner from '@/components/NewsletterBanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Testimonials />
        <NewsletterBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
