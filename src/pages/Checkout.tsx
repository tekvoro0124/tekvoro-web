/**
 * Checkout Page
 * Shipping address, payment method selection, order review
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CartItem {
  productName?: string;
  quantity: number;
  price: number;
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
}

export default function Checkout() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('shipping'); // shipping, payment, review
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: 'USA'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderLoading, setOrderLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = () => {
    if (step === 'shipping') {
      const required: (keyof typeof formData)[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'postal'];
      return required.every(field => formData[field].trim() !== '');
    }
    return true;
  };

  const createOrder = async () => {
    if (!validateStep()) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setOrderLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        '/api/orders',
        {
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postal: formData.postal,
            country: formData.country
          },
          paymentMethod
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success && cart) {
        navigate(`/order/${response.data.orderId}`, {
          state: { orderId: response.data.orderId, amount: cart.totalAmount }
        });
      }
    } catch (err: unknown) {
      const error = err as any;
      alert('Failed to create order: ' + (error.response?.data?.message || error.message));
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading checkout...</div>;
  }

  if (!cart || !cart.items || (cart.items && cart.items.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-white rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-4">
          {['shipping', 'payment', 'review'].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-2 rounded ${
                step === s ? 'bg-blue-600' : s === 'shipping' ? 'bg-blue-300' : 'bg-gray-200'
              }`} />
              <p className="text-sm mt-2 capitalize">{s}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8">
              {/* Shipping Address */}
              {step === 'shipping' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="postal"
                      placeholder="Postal Code"
                      value={formData.postal}
                      onChange={handleInputChange}
                      className="px-4 py-2 border rounded-lg"
                      required
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e as any)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option>USA</option>
                      <option>Canada</option>
                      <option>India</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              {step === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                      { id: 'wallet', name: 'Digital Wallet', icon: '📱' },
                      { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
                      { id: 'upi', name: 'UPI', icon: '₹' }
                    ].map(method => (
                      <label key={method.id} className="border-2 rounded-lg p-4 cursor-pointer hover:bg-blue-50" style={{
                        borderColor: paymentMethod === method.id ? '#2563eb' : '#e5e7eb'
                      }}>
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <span className="mr-2">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Review */}
              {step === 'review' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order Review</h2>
                  
                  {/* Shipping Address */}
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.postal}</p>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <p className="capitalize">{paymentMethod}</p>
                  </div>

                  {/* Items */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Items</h3>
                    {cart.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm mb-2">
                        <span>{item.productName} x{item.quantity}</span>
                        <span>${(item.subtotal ?? item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                {(step === 'payment' || step === 'review') && (
                  <button
                    onClick={() => setStep(step === 'payment' ? 'shipping' : 'payment')}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (step === 'shipping') setStep('payment');
                    else if (step === 'payment') setStep('review');
                    else createOrder();
                  }}
                  disabled={!validateStep() || orderLoading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
                >
                  {step === 'review' ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 pb-4 border-b text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(cart.subtotal || 0).toFixed(2)}</span>
                </div>
                {(cart.discountAmount ?? 0) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${(cart.discountAmount ?? 0).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cart.taxAmount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${(cart.shippingAmount || 0).toFixed(2)}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                ${(cart.totalAmount || 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
