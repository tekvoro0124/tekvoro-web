/**
 * Product Detail Page
 * Shows product details, reviews, and checkout options
 */

import { useState, useEffect } from 'react';
// Product type definition
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image?: string;
  images?: string[];
  rating?: {
    average?: number;
    count?: number;
  };
  seller?: {
    storeName?: string;
    city?: string;
    country?: string;
    rating?: number;
  };
  specifications?: Record<string, string>;
  reviews?: Array<{
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/marketplace/listings/${productId}`);
      setProduct(response.data.listing);
    } catch (err) {
      console.error('Failed to load product:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    if (!product) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cart/add',
        {
          productId,
          quantity,
          price: product.price
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert(`${quantity} item(s) added to cart!`);
      setQuantity(1);
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  const images = product.images || [product.image || '/placeholder.png'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden mb-4">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg p-6">
            {/* Title and Rating */}
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-600">
                {product.rating?.average || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600 mt-2">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </p>
              )}
            </div>

            {/* Stock and Seller */}
            <div className="mb-6">
              <p className={`font-medium ${
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
              <p className="text-gray-600 mt-2">
                Sold by: <span className="font-medium">{product.seller?.storeName || 'Unknown'}</span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b-2">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6 pb-6 border-b-2">
                <h2 className="font-semibold mb-3">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-600 text-sm">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  className="w-16 text-center border rounded-lg px-2 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {/* Seller Info */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="font-semibold mb-4">Seller Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{product.seller?.storeName}</p>
                <p className="text-sm text-gray-600">{product.seller?.city}, {product.seller?.country}</p>
                {product.seller?.rating && (
                  <p className="text-sm mt-2">
                    <span className="text-yellow-400">★</span> {product.seller.rating} seller rating
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid gap-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{review.reviewer}</p>
                    <span className="text-yellow-400">★ {review.rating}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
