/**
 * Admin Order Management Dashboard
 * View all orders, manage status, handle refunds
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

// Type definitions
interface Stats {
  totalOrders?: number;
  pendingRevenue?: number;
  todayRevenue?: number;
  refundRequests?: number;
}

interface ShippingAddress {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface OrderSummary {
  subtotal?: number;
  taxAmount?: number;
  totalAmount?: number;
}

interface LineItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  shippingAddress?: ShippingAddress;
  summary?: OrderSummary;
  lineItems?: LineItem[];
  orderStatus?: string;
  paymentStatus?: string;
  createdAt?: string;
}

export default function AdminOrderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all'); // all, pending, processing, shipped, delivered, cancelled
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stats, setStats] = useState<Stats>({});

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/admin/dashboard', {
        params: { status: filter !== 'all' ? filter : undefined },
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.statistics || {});
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/orders/${orderId}/status`,
        { orderStatus: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchOrders();
      setSelectedOrder(null);
      alert('Order status updated');
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  // Fix STATUS_COLORS index type error
  const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800'
  };

  if (loading && orders.length === 0) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Order Management Dashboard</h1>
          <p className="text-gray-600">Manage all customer orders and refunds</p>
        </div>

        {/* Statistics */}
        {Object.keys(stats).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders || 0}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-gray-600 text-sm">Pending Payment</p>
              <p className="text-3xl font-bold">${(stats.pendingRevenue || 0).toFixed(0)}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-gray-600 text-sm">Today's Revenue</p>
              <p className="text-3xl font-bold text-green-600">${(stats.todayRevenue || 0).toFixed(0)}</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <p className="text-gray-600 text-sm">Refund Requests</p>
              <p className="text-3xl font-bold text-red-600">{stats.refundRequests || 0}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Payment</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order: Order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm">{order.orderId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ${order.summary?.totalAmount?.toFixed(2) || 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full font-medium text-xs ${STATUS_COLORS[order.orderStatus ?? 'pending']}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full font-medium text-xs ${
                          order.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Order #{selectedOrder.orderId}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p>{selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}</p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress?.email}</p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress?.phone}</p>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-3">Items</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedOrder.lineItems?.map((item, idx) => (
                      <div key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                        <span>{item.productName} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="font-semibold mb-2">Update Order Status</h3>
                  <select
                    value={selectedOrder.orderStatus}
                    onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Totals */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between py-2 border-b">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.summary?.subtotal?.toFixed(2) || 0}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Tax:</span>
                    <span>${selectedOrder.summary?.taxAmount?.toFixed(2) || 0}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total:</span>
                    <span>${selectedOrder.summary?.totalAmount?.toFixed(2) || 0}</span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
