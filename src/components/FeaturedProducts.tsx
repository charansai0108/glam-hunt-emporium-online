import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discountPercentage?: number;
  description?: string;
};

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Washed Black Denim Jacket',
    price: 120,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
    category: 'Jackets',
    isNew: true
  },
  {
    id: 2,
    name: 'Oversized Cotton Sweatshirt',
    price: 85,
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    category: 'Sweaters'
  },
  {
    id: 3,
    name: 'Classic Wool Blend Coat',
    price: 245,
    image: 'https://images.unsplash.com/photo-1548624313-0396c75ad2c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    category: 'Coats'
  },
  {
    id: 4,
    name: 'High Rise Slim Jeans',
    price: 90,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    category: 'Jeans',
    isSale: true,
    discountPercentage: 20
  }
];

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, price, image, category, isNew, isSale, discountPercentage, description } = product;
  
  const displayPrice = isSale && discountPercentage 
    ? price * (1 - discountPercentage / 100) 
    : price;
  
  return (
    <div className="group">
      <Link to={`/product/${id}`} className="block relative aspect-[3/4] overflow-hidden mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {isNew && (
          <span className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium">
            NEW
          </span>
        )}
        {isSale && (
          <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-medium">
            SALE
          </span>
        )}
      </Link>
      <div>
        <h3 className="font-bebas text-xl tracking-wide">
          <Link to={`/product/${id}`} className="hover:underline">
            {name}
          </Link>
        </h3>
        <p className="text-gray-500 text-sm mb-2">{category}</p>
        <div className="flex items-center">
          {isSale && discountPercentage ? (
            <>
              <span className="font-medium">${displayPrice.toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through text-sm">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium">${price.toFixed(2)}</span>
          )}
        </div>
        {description && (
          <p className="text-gray-600 text-sm mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl md:text-5xl mb-4 tracking-wide">FEATURED PRODUCTS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the season's must-have pieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-black text-white hover:bg-gray-800 min-w-[200px] font-bebas text-lg tracking-wider"
          >
            <Link to="/shop">VIEW ALL PRODUCTS</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
export { FEATURED_PRODUCTS, ProductCard };
