
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FEATURED_PRODUCTS } from '@/components/FeaturedProducts';
import { Plus, Minus, Heart, Share2, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { toast } from 'sonner';

const SHOP_PRODUCTS = [
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

// Extended product data with more details for product page
const PRODUCT_DETAILS = {
  1: {
    description: 'A classic black denim jacket with a worn-in wash. Features button closure, chest pockets, and adjustable button cuffs. Made from 100% cotton with a comfortable fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Blue', 'Gray'],
    materials: '100% Cotton',
    care: 'Machine wash cold, tumble dry low',
    shipping: 'Free shipping on orders over $100',
    returns: '30-day returns. See our return policy for more details.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    ]
  }
};

// Default product details for any product not in PRODUCT_DETAILS
const DEFAULT_PRODUCT_DETAILS = {
  description: 'This premium product is designed with both style and comfort in mind. Made from high-quality materials, it\'s perfect for everyday wear or special occasions.',
  sizes: ['S', 'M', 'L'],
  colors: ['Black', 'White'],
  materials: 'Premium materials',
  care: 'See care instructions on label',
  shipping: 'Free shipping on orders over $100',
  returns: '30-day returns. See our return policy for more details.',
  images: []
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any | null>(null);
  const [productDetails, setProductDetails] = useState<any | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    // Get product based on ID
    const foundProduct = SHOP_PRODUCTS.find(p => p.id === Number(id));
    if (!foundProduct) {
      navigate('/shop');
      return;
    }
    
    setProduct(foundProduct);
    
    // Get product details
    const details = PRODUCT_DETAILS[Number(id) as keyof typeof PRODUCT_DETAILS] || DEFAULT_PRODUCT_DETAILS;
    
    // Combine the product's main image with any additional images
    const allImages = [foundProduct.image, ...(details.images || [])].filter(Boolean);
    details.images = [...new Set(allImages)]; // Remove duplicates
    
    setProductDetails(details);
    
    // Set defaults
    if (details.sizes && details.sizes.length > 0) {
      setSelectedSize(details.sizes[0]);
    }
    
    if (details.colors && details.colors.length > 0) {
      setSelectedColor(details.colors[0]);
    }
  }, [id, navigate]);

  if (!product || !productDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p>Loading product information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    toast.success(`Added ${quantity} ${product.name} to your cart!`);
    // In a real app, we'd add to cart state or make an API call
  };

  const displayPrice = product.isSale && product.discountPercentage 
    ? product.price * (1 - product.discountPercentage / 100) 
    : product.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm">
              <ol className="flex items-center text-gray-500">
                <li><Link to="/" className="hover:text-black">Home</Link></li>
                <li className="mx-2">/</li>
                <li><Link to="/shop" className="hover:text-black">Shop</Link></li>
                <li className="mx-2">/</li>
                <li><Link to={`/shop/${product.category.toLowerCase()}`} className="hover:text-black">{product.category}</Link></li>
                <li className="mx-2">/</li>
                <li className="text-black">{product.name}</li>
              </ol>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square overflow-hidden mb-4">
                <img 
                  src={productDetails.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {productDetails.images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {productDetails.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      className={`w-20 h-20 overflow-hidden border-2 ${selectedImageIndex === idx ? 'border-black' : 'border-transparent'}`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} image ${idx + 1}`}
                        className="w-full h-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div>
              {/* Labels */}
              <div className="mb-4 flex gap-2">
                {product.isNew && (
                  <span className="bg-black text-white px-2 py-1 text-xs font-medium">
                    NEW
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-600 text-white px-2 py-1 text-xs font-medium">
                    SALE
                  </span>
                )}
              </div>
              
              {/* Title and Price */}
              <h1 className="font-bebas text-3xl md:text-4xl mb-2 tracking-wide">{product.name}</h1>
              <div className="flex items-center mb-2">
                {product.isSale && product.discountPercentage ? (
                  <>
                    <span className="text-xl font-medium">${displayPrice.toFixed(2)}</span>
                    <span className="ml-2 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 text-red-600">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Reviews */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  4.9 (24 reviews)
                </span>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-6">{productDetails.description}</p>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Size</h3>
                  <button className="text-sm text-gray-500 underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productDetails.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-500'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-2">
                  {productDetails.colors.map((color: string) => (
                    <button
                      key={color}
                      className={`relative w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        boxShadow: color.toLowerCase() === 'white' ? 'inset 0 0 0 1px #e5e7eb' : 'none'
                      }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center text-white">
                          {color.toLowerCase() === 'white' && <span className="text-black">✓</span>}
                          {color.toLowerCase() !== 'white' && <span>✓</span>}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex border border-gray-300 w-32">
                  <button 
                    className="w-10 flex items-center justify-center"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex-1 text-center py-2">{quantity}</div>
                  <button 
                    className="w-10 flex items-center justify-center"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white hover:bg-gray-800 font-bebas text-lg tracking-wide py-6"
                >
                  ADD TO CART
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Additional Information */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start">
                  <Truck className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{productDetails.shipping}</p>
                </div>
                <div className="flex items-start">
                  <RotateCcw className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>{productDetails.returns}</p>
                </div>
                <div className="flex items-start">
                  <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
                  <p>Secure checkout with Razorpay</p>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              {/* Product Details Tabs */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bebas text-xl mb-2">MATERIALS</h3>
                  <p className="text-gray-600">{productDetails.materials}</p>
                </div>
                <div>
                  <h3 className="font-bebas text-xl mb-2">CARE INSTRUCTIONS</h3>
                  <p className="text-gray-600">{productDetails.care}</p>
                </div>
                <div className="flex items-center gap-4">
                  <h3 className="font-bebas text-xl">SHARE</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
