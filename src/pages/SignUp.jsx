import { useState } from "react";
import { Cloud } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/appwrite";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);

    const { name, email, password, confirmPassword } = form;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await authService.createAccount({ name, email, password });
      console.log("Account created:", res);
      navigate("/"); // or wherever you want to redirect
    } catch (err) {
      console.error(err);
      setError("Error:  " + (err.message || "An error occurred"));
      // clear form fields
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join DocHost</h1>
          <p className="text-gray-600">Create your personal cloud storage</p>
        </div>

        <div className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to={'/signin'}
              className="text-blue-600 hover:text-blue-700 ml-1 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
