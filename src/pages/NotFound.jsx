import { Cloud, Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="w-16 h-16 text-blue-600" />
          </div>
          
          <div className="mb-6">
            <h1 className="text-8xl font-bold text-gray-200 mb-2">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 text-lg mb-2">
              Oops! The file you're looking for has been moved or deleted.
            </p>
            <p className="text-gray-500">
              Don't worry, your documents are safe in DocHost.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to={'/'}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            
            <Link to={'/signin'}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or check your recent files.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;