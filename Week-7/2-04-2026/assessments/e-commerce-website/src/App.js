import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Pages
import DashboardHome from './pages/DashboardHome';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Product Pages
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductReviews from './pages/ProductReviews';
import ProductSpecs from './pages/ProductSpecs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            
            {/* Product Module - Dynamic & Nested Routing */}
            <Route path="products" element={<ProductList />} />
            <Route path="products/:productId" element={<ProductDetail />}>
              <Route index element={<Navigate to="reviews" replace />} />
              <Route path="reviews" element={<ProductReviews />} />
              <Route path="specs" element={<ProductSpecs />} />
            </Route>
          </Route>

          {/* Authentication Routes */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
