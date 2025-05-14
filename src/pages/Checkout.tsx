
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Mock checkout data
const orderSummary = {
  subtotal: 216,
  discount: 43.2,
  shipping: 0,
  total: 172.8,
  items: [
    {
      id: 1,
      name: 'Washed Black Denim Jacket',
      price: 120,
      quantity: 1,
      size: 'M',
      color: 'Black',
    },
    {
      id: 4,
      name: 'High Rise Slim Jeans',
      price: 90,
      quantity: 1,
      size: 'S',
      color: 'Blue',
      discountPrice: 72,
    }
  ]
};

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    saveInfo: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast.error(`Please fill out all required fields`);
      return;
    }
    
    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Redirect to confirmation page on success
      navigate('/order-confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-bebas text-3xl md:text-4xl mb-6 tracking-wide">CHECKOUT</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="font-bebas text-xl mb-4 tracking-wide">CONTACT INFORMATION</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="font-bebas text-xl mb-4 tracking-wide">SHIPPING ADDRESS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="font-bebas text-xl mb-4 tracking-wide">PAYMENT METHOD</h2>
                  <div className="bg-gray-50 p-4 rounded-sm">
                    <p className="text-sm">
                      All payments are processed securely through Razorpay. We do not store your payment information.
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 font-bebas text-lg tracking-wide py-6"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'PROCESSING...' : 'COMPLETE ORDER'}
                </Button>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-gray-50 p-6 sticky top-4">
                <h2 className="font-bebas text-xl mb-4 tracking-wide">ORDER SUMMARY</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderSummary.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-start">
                          <span className="bg-gray-200 text-sm w-6 h-6 flex items-center justify-center rounded-full mr-2">
                            {item.quantity}
                          </span>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Size: {item.size}, Color: {item.color}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {item.discountPrice ? (
                          <>
                            <p className="font-medium">${item.discountPrice.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 line-through">${item.price.toFixed(2)}</p>
                          </>
                        ) : (
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount (20%)</span>
                    <span>-${orderSummary.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
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

export default Checkout;
