/**
 * Order Tracking Page
 * View order status and progress
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Order {
  orderId?: string;
  orderStatus?: string;
  paymentStatus?: string;
  createdAt?: string;
  summary?: {
    subtotal?: number;
    totalAmount: number;
    discountAmount?: number;
    taxAmount?: number;
    shippingAmount?: number;
  };
  timeline?: Record<string, string>;
  lineItems?: Array<{ productName: string; quantity: number; price: number; image?: string }>;
  shippingAddress?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postal?: string;
  };
}

export default function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const statusSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
  const statusLabels: Record<string, string> = {
    pending: 'Order Placed',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered'
  };

  useEffect(() => {
    fetchOrder();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(response.data.order);
    } catch (err: unknown) {
      const error = err as any;
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/orders/${orderId}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Order cancelled successfully');
      fetchOrder();
    } catch (err) {
      const error = err as any;
      alert('Failed to cancel order: ' + (error?.response?.data?.message || error?.message));
    }
  };

  const requestReturn = async () => {
    if (!window.confirm('Are you sure you want to request a return for this order?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/orders/${orderId}/return`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('Return request submitted');
      fetchOrder();
    } catch (err) {
      const error = err as any;
      alert('Failed to request return: ' + (error?.response?.data?.message || error?.message));
    }
  };

  if (loading) {
    return <div className="p-8">Loading order...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-white rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            View All Orders
          </button>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.orderStatus ?? 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">Order #{order.orderId}</h1>
              <p className="text-gray-600">
                Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-semibold ${
                order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {order.paymentStatus === 'completed' ? '✓ Paid' : 'Pending Payment'}
              </p>
              <p className="text-2xl font-bold">${order.summary?.totalAmount?.toFixed(2) || 0}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
            order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
            order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
            order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {statusLabels[order.orderStatus ?? 'pending']}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-6">Order Status</h2>
          <div className="relative">
            <div className="flex justify-between">
              {statusSteps.map((step, idx) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  {/* Circle */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2 ${
                    idx <= currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}>
                    {idx < currentStepIndex ? '✓' : idx + 1}
                  </div>
                  {/* Label */}
                  <p className="text-sm text-center text-gray-600 mt-2">
                    {statusLabels[step]}
                  </p>
                  {/* Date */}
                  {order.timeline?.[step] && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.timeline[step]).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.lineItems?.map((item, idx) => (
              <div key={idx} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  {item.image && (
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600 text-sm">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${(order.summary?.subtotal ?? 0).toFixed(2)}</span>
            </div>
            {(order.summary?.discountAmount ?? 0) > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${(order.summary?.discountAmount ?? 0).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (18%)</span>
              <span>${(order.summary?.taxAmount ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${(order.summary?.shippingAmount ?? 0).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${(order.summary?.totalAmount ?? 0).toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
          <p className="font-semibold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
          <p className="text-gray-600">{order.shippingAddress?.address}</p>
          <p className="text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postal}</p>
          <p className="text-gray-600 mt-2">{order.shippingAddress?.email}</p>
          <p className="text-gray-600">{order.shippingAddress?.phone}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
            <button
              onClick={cancelOrder}
              disabled={order.orderStatus === 'shipped' || order.orderStatus === 'processing'}
              className="px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel Order
            </button>
          )}
          {order.orderStatus === 'delivered' && (
            <button
              onClick={requestReturn}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
            >
              Request Return
            </button>
          )}
          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
