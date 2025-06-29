import { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import authService from '../appwrite/appwrite';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <Cloud className="w-16 h-16 text-blue-600 animate-pulse" />
            {/* Spinning ring around the logo */}
            <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">DocHost</h1>
        
        {/* Loading Message */}
        <div className="space-y-3">
          <p className="text-lg text-gray-600">Checking authentication...</p>
          
          {/* Loading dots animation */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        
        {/* Subtle message */}
        <p className="text-sm text-gray-500 mt-6">
          Securing your files...
        </p>
      </div>
    </div>
  );
};

// Example ProtectedRoute component structure (without react-router-dom)
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setIsLoggedIn(!!user);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [authService]);

  if (loading) return <LoadingScreen />;
  
  // In your actual implementation, replace this with: <Navigate to="/signin" replace />
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;