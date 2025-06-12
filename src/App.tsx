import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Account from '@/pages/Account';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import VideoWatch from '@/pages/VideoWatch';
import SizeGuide from '@/pages/SizeGuide';
import CareInstructions from '@/pages/CareInstructions';
import ShippingInfo from '@/pages/ShippingInfo';
import Returns from '@/pages/Returns';
import OrderTracking from '@/pages/OrderTracking';
import WorkAtJokaJok from '@/pages/WorkAtJokaJok';
import NotFound from '@/pages/NotFound';
import Admin from '@/pages/Admin';
import AdminLogin from '@/pages/admin/login';
import AdminRegister from '@/pages/admin/register';
import AdminRoutes from '@/routes/AdminRoutes';
import Wishlist from '@/pages/Wishlist';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-charred-wood">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/video/:id" element={<VideoWatch />} />
                  <Route path="/size-guide" element={<SizeGuide />} />
                  <Route path="/care-instructions" element={<CareInstructions />} />
                  <Route path="/shipping" element={<ShippingInfo />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/order-tracking" element={<OrderTracking />} />
                  <Route path="/work-at-jokajok" element={<WorkAtJokaJok />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/register" element={<AdminRegister />} />
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster />
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
