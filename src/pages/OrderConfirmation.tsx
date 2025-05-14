
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Package, MapPin, TruckIcon } from 'lucide-react';

const OrderConfirmation = () => {
  // Mock order details
  const orderDetails = {
    orderNumber: 'GL-5791432',
    date: 'May 14, 2025',
    email: 'customer@example.com',
    shippingAddress: '123 Main St, Apt 4B, New York, NY 10001, USA',
    paymentMethod: 'Credit Card (Razorpay)',
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
        price: 72, // Already showing discounted price
        quantity: 1,
        size: 'S',
        color: 'Blue',
      }
    ],
    subtotal: 192,
    shipping: 0,
    total: 192
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Order Success Message */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="font-bebas text-3xl md:text-4xl mb-4 tracking-wide">ORDER CONFIRMED</h1>
              <p className="text-gray-600 max-w-lg mx-auto">
                Thank you for your purchase! Your order has been confirmed and will be shipped soon.
              </p>
            </div>
            
            {/* Order Information */}
            <div className="bg-gray-50 p-6 mb-8 rounded-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="font-bebas text-xl mb-2 tracking-wide">ORDER INFORMATION</h2>
                  <p><strong>Order number:</strong> {orderDetails.orderNumber}</p>
                  <p><strong>Date:</strong> {orderDetails.date}</p>
                  <p><strong>Email:</strong> {orderDetails.email}</p>
                  <p><strong>Payment method:</strong> {orderDetails.paymentMethod}</p>
                </div>
                <div>
                  <h2 className="font-bebas text-xl mb-2 tracking-wide">SHIPPING ADDRESS</h2>
                  <p>{orderDetails.shippingAddress}</p>
                </div>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="mb-8">
              <h2 className="font-bebas text-xl mb-4 tracking-wide">ORDER STATUS</h2>
              <div className="relative">
                {/* Status line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 z-0"></div>
                
                {/* Status steps */}
                <div className="relative z-10 space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">Order confirmed</h3>
                      <p className="text-sm text-gray-500">May 14, 2025 at 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-500">Processing order</h3>
                      <p className="text-sm text-gray-500">Estimated: May 15, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500">
                      <TruckIcon className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-500">Shipped</h3>
                      <p className="text-sm text-gray-500">Estimated: May 16-17, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-500">Delivered</h3>
                      <p className="text-sm text-gray-500">Estimated: May 18-20, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-8">
              <h2 className="font-bebas text-xl mb-4 tracking-wide">ORDER DETAILS</h2>
              
              <div className="space-y-4 mb-6">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4">
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
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{orderDetails.shipping === 0 ? 'Free' : `$${orderDetails.shipping.toFixed(2)}`}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button asChild className="bg-black hover:bg-gray-800">
                <Link to="/shop">CONTINUE SHOPPING</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/account/orders">VIEW ALL ORDERS</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
