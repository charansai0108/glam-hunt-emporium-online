
import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah J.',
    text: 'The quality of clothes from Glam Hunt is exceptional. I love how each piece feels premium and lasts so long.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80'
  },
  {
    id: 2,
    name: 'Michael T.',
    text: 'Finally found a brand that matches my style perfectly. The customer service is also top-notch!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1012&q=80'
  },
  {
    id: 3,
    name: 'Alicia K.',
    text: 'I always receive compliments when I wear Glam Hunt pieces. The designs are unique and so stylish.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl md:text-5xl mb-4 tracking-wide">WHAT OUR CUSTOMERS SAY</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it – hear what our happy customers have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 shadow-sm border border-gray-100 rounded-sm">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4" 
                        fill={i < testimonial.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
