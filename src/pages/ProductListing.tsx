/**
 * Product Listing Page
 * Displays all marketplace products with filtering and search
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductListing() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    search: ''
  });
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/marketplace/listings', {
        params: {
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search
        }
      });
      setProducts(response.data.listings || []);
      setError(null);
    } catch (err: unknown) {
      setError('Failed to load products');
      console.error(err as any);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, productName: string, price: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cart/add',
        {
          productId,
          quantity: 1,
          price
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert(`${productName} added to cart!`);
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Marketplace</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Garden</option>
                  <option value="books">Books</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${filters.minPrice} - ${filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {products.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    {/* Image */}
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                      <img
                        src={product.image || '/placeholder.png'}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating?.average || 0} ({product.rating?.count || 0})
                        </span>
                      </div>

                      {/* Price and Stock */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            ${product.price}
                          </p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-medium ${
                            product.stock > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(product._id, product.title, product.price)}
                          disabled={product.stock === 0}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
