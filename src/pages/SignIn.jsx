import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">DocHost</h1>
          <p className="text-gray-600">Your personal cloud storage</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</button>
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
