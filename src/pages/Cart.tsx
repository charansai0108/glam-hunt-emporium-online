
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ShoppingBag, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: 'Washed Black Denim Jacket',
    price: 120,
    quantity: 1,
    size: 'M',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
  },
  {
    id: 4,
    name: 'High Rise Slim Jeans',
    price: 90,
    quantity: 1,
    size: 'S',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    discountPercentage: 20
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'GLAM20') {
      setPromoApplied(true);
      toast.success("Promo code applied: 20% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    let price = item.price;
    if (item.discountPercentage) {
      price = price * (1 - item.discountPercentage / 100);
    }
    return total + (price * item.quantity);
  }, 0);
  
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-bebas text-3xl md:text-4xl mb-4 tracking-wide">YOUR SHOPPING BAG</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild className="bg-black hover:bg-gray-800">
                <Link to="/shop">CONTINUE SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items (2 columns on desktop) */}
              <div className="md:col-span-2 space-y-6">
                {/* Cart Header (Desktop only) */}
                <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_auto] gap-4 text-sm text-gray-500 pb-2">
                  <div></div>
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div></div>
                </div>
                
                {/* Cart Items */}
                {cartItems.map((item) => {
                  const itemPrice = item.discountPercentage 
                    ? item.price * (1 - item.discountPercentage / 100) 
                    : item.price;
                  
                  return (
                    <div key={item.id} className="border-b pb-6">
                      <div className="md:grid md:grid-cols-[1fr_3fr_1fr_1fr_auto] gap-4 items-center">
                        {/* Product Image */}
                        <div className="w-24 h-24 md:w-full md:h-32 mb-4 md:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                          <p className="text-sm text-gray-500">Color: {item.color}</p>
                          
                          {/* Mobile Price */}
                          <div className="flex justify-between items-center mt-2 md:hidden">
                            <div>
                              {item.discountPercentage ? (
                                <>
                                  <span className="font-medium">${itemPrice.toFixed(2)}</span>
                                  <span className="ml-2 text-gray-500 line-through">${item.price.toFixed(2)}</span>
                                </>
                              ) : (
                                <span className="font-medium">${item.price.toFixed(2)}</span>
                              )}
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-black"
                              aria-label="Remove item"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Desktop Price */}
                        <div className="hidden md:block">
                          {item.discountPercentage ? (
                            <>
                              <span className="font-medium">${itemPrice.toFixed(2)}</span>
                              <div className="text-gray-500 line-through text-sm">${item.price.toFixed(2)}</div>
                            </>
                          ) : (
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        {/* Quantity */}
                        <div className="flex border border-gray-300 w-24 mt-2 md:mt-0">
                          <button 
                            className="w-8 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <div className="flex-1 text-center py-1">{item.quantity}</div>
                          <button 
                            className="w-8 flex items-center justify-center"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Remove Button (Desktop) */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="hidden md:block text-gray-400 hover:text-black"
                          aria-label="Remove item"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                {/* Continue Shopping */}
                <div>
                  <Button 
                    asChild
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Link to="/shop">
                      <ChevronLeft className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-gray-50 p-6 sticky top-4">
                  <h2 className="font-bebas text-xl mb-4 tracking-wide">ORDER SUMMARY</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (20%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    
                    {/* Promo Code */}
                    {!promoApplied && (
                      <div className="pt-2">
                        <p className="text-sm mb-2">Promo Code</p>
                        <div className="flex gap-2">
                          <Input 
                            type="text" 
                            placeholder="Enter code" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-grow"
                          />
                          <Button 
                            onClick={applyPromoCode}
                            variant="outline"
                          >
                            Apply
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Try "GLAM20" for 20% off</p>
                      </div>
                    )}
                    
                    {/* Checkout Button */}
                    <Button 
                      className="w-full bg-black hover:bg-gray-800 font-bebas text-lg tracking-wide py-6"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? 'Processing...' : 'PROCEED TO CHECKOUT'}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Secure checkout with Razorpay
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
