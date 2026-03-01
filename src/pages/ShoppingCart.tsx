/**
 * Shopping Cart Page
 * Review cart items, apply coupons, proceed to checkout
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CartItem {
  productId?: string;
  productName?: string;
  quantity: number;
  price: number;
  image?: string;
  subtotal?: number;
}

interface Cart {
  items?: CartItem[];
  itemCount?: number;
  subtotal?: number;
  taxAmount?: number;
  shippingAmount?: number;
  discountAmount?: number;
  totalAmount?: number;
  couponCode?: string;
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data.cart);
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cart/remove',
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchCart();
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cart/update-quantity',
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchCart();
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      alert('Please enter a coupon code');
      return;
    }
    try {
      setApplyCouponLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cart/apply-coupon',
        { couponCode },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Coupon applied!');
      fetchCart();
      setCouponCode('');
    } catch (err) {
      alert('Invalid coupon code');
    } finally {
      setApplyCouponLoading(false);
    }
  };

  const proceedToCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return <div className="p-8">Loading cart...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some items to get started!</p>
            <button
              onClick={() => navigate('/marketplace')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.itemCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg">
              {cart.items?.map((item: CartItem, idx: number) => (
                <div
                  key={idx}
                  className={`p-6 flex gap-6 border-b ${
                    idx === (cart.items?.length ?? 0) - 1 ? '' : 'border-b'
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image && (
                      <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.productName}</h3>
                    <p className="text-gray-600 text-sm mb-4">Product ID: {item.productId}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.productId ?? '', item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId ?? '', parseInt(e.target.value))}
                        className="w-12 text-center border rounded py-1"
                      />
                      <button
                        onClick={() => updateQuantity(item.productId ?? '', item.quantity + 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price and Remove */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ${(item.subtotal ?? item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId ?? '')}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate('/marketplace')}
              className="mt-6 text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${(cart.subtotal || 0).toFixed(2)}</span>
                </div>
                {(cart.discountAmount ?? 0) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${(cart.discountAmount ?? 0).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span className="font-medium">${(cart.taxAmount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${(cart.shippingAmount || 0).toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${(cart.totalAmount || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                  <button
                    onClick={applyCoupon}
                    disabled={applyCouponLoading}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-medium disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {cart.couponCode && (
                  <p className="text-sm text-green-600 mt-2">Code "{cart.couponCode}" applied</p>
                )}
              </div>

              {/* Proceed to Checkout */}
              <button
                onClick={proceedToCheckout}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-2 text-xs text-gray-600 text-center">
                <p>🔒 Secure checkout</p>
                <p>✓ Money-back guarantee</p>
                <p>📦 Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
