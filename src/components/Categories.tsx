
import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    id: 1,
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    link: '/shop/outerwear'
  },
  {
    id: 2,
    name: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80',
    link: '/shop/dresses'
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    link: '/shop/accessories'
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl md:text-5xl mb-4 tracking-wide">SHOP BY CATEGORY</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collections by category and find your perfect style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className="group relative block h-[400px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-black">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="font-bebas text-3xl md:text-4xl mb-2 tracking-wider">
                    {category.name}
                  </h3>
                  <span className="inline-block border-b border-white pb-1 text-sm uppercase tracking-wider">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
