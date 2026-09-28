import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Loader from './components/Loader';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductEditor from './pages/products/ProductEditor';
import { useAuth } from './context/AuthContext';

function AppRoutes() {
  const { loading } = useAuth();
  if (loading) return <Loader label="Getting things ready" />;
  return <><Navbar /><Routes>
    <Route path="/" element={<Navigate to="/products" replace />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}><Route path="/products/add" element={<ProductEditor />} /><Route path="/products/edit/:id" element={<ProductEditor edit />} /></Route>
    <Route path="*" element={<Navigate to="/products" replace />} />
  </Routes></>;
}

export default function App() {
  return <BrowserRouter><AuthProvider><AppRoutes /></AuthProvider></BrowserRouter>;
}
