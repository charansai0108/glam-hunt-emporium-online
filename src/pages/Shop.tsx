
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductCard, FEATURED_PRODUCTS, Product } from '@/components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

// Extended product data for shop page
const SHOP_PRODUCTS: Product[] = [
  ...FEATURED_PRODUCTS,
  {
    id: 5,
    name: 'Leather Biker Jacket',
    price: 350,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    category: 'Jackets',
    isNew: true
  },
  {
    id: 6,
    name: 'Relaxed Fit T-Shirt',
    price: 35,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    category: 'T-Shirts'
  },
  {
    id: 7,
    name: 'Wide Leg Trousers',
    price: 120,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    category: 'Pants'
  },
  {
    id: 8,
    name: 'Cashmere Scarf',
    price: 95,
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'Accessories',
    isSale: true,
    discountPercentage: 15
  }
];

const CATEGORIES = ['All', 'Jackets', 'Sweaters', 'Coats', 'Jeans', 'T-Shirts', 'Pants', 'Accessories'];

const Shop = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(SHOP_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 350]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  React.useEffect(() => {
    // Filter products based on URL params
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    // Apply filters
    applyFilters();
  }, [location.search]);

  const applyFilters = () => {
    let filtered = [...SHOP_PRODUCTS];
    
    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Price filter
    filtered = filtered.filter(product => {
      const effectivePrice = product.isSale && product.discountPercentage 
        ? product.price * (1 - product.discountPercentage / 100) 
        : product.price;
      
      return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    });
    
    // New only filter
    if (showNewOnly) {
      filtered = filtered.filter(product => product.isNew);
    }
    
    // Sale only filter
    if (showSaleOnly) {
      filtered = filtered.filter(product => product.isSale);
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Default sorting (featured)
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  React.useEffect(() => {
    applyFilters();
  }, [selectedCategory, priceRange, showNewOnly, showSaleOnly, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-bebas text-4xl md:text-5xl mb-2 tracking-wide">SHOP ALL</h1>
            <nav className="text-sm breadcrumbs">
              <ul className="flex items-center text-gray-500">
                <li><Link to="/" className="hover:text-black">Home</Link></li>
                <li className="mx-2">/</li>
                <li>Shop</li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filters Button */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </span>
                {mobileFiltersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Filters */}
            <aside className={`md:w-64 md:flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
              <div className="border-b pb-6 mb-6">
                <h3 className="font-bebas text-xl mb-4">CATEGORIES</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      className={`block py-1 ${selectedCategory === category ? 'font-medium text-black' : 'text-gray-500 hover:text-black'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="font-bebas text-xl mb-4">PRICE RANGE</h3>
                <Slider
                  defaultValue={[0, 350]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div className="border-b pb-6 mb-6">
                <h3 className="font-bebas text-xl mb-4">FILTER BY</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Checkbox 
                      id="new-only"
                      checked={showNewOnly}
                      onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
                    />
                    <label htmlFor="new-only" className="ml-2 text-sm">New Arrivals</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="sale-only"
                      checked={showSaleOnly}
                      onCheckedChange={(checked) => setShowSaleOnly(checked as boolean)}
                    />
                    <label htmlFor="sale-only" className="ml-2 text-sm">On Sale</label>
                  </div>
                </div>
              </div>
              
              <div className="md:hidden mt-4">
                <Button 
                  variant="default"
                  className="w-full"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort Controls */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <p className="text-sm text-gray-500">{filteredProducts.length} products</p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm mr-2">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-none bg-transparent focus:ring-0"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              
              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="font-medium text-lg mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('All');
                      setPriceRange([0, 350]);
                      setShowNewOnly(false);
                      setShowSaleOnly(false);
                      setSortBy('featured');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
