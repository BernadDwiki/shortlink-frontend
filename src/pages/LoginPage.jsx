import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";
import googleIcon from "../assets/images/google.png";
import eyeIcon from "../assets/images/eye.png";
import Footer from "../components/Footer";
import { login } from "../services/authService";
import { saveToken, saveUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      const token = result?.token;
      const user = result?.user;

      if (token) {
        saveToken(token);
        if (user) {
          saveUser(user);
        }
        setMessage("Login successful. Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setError("Login succeeded but no token was returned.");
      }
    } catch (err) {
      setError(err.message || "Unable to reach the backend. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img src={logo} alt="ShortLink" className="h-6 object-contain" />
          </div>

          {/* Login Card */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome Back
            </h1>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Please enter your details to sign in.
            </p>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-700">
                {message}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <img
                      src={eyeIcon}
                      alt="toggle password"
                      className="w-6 h-6 object-contain"
                    />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? "Signing in..." : "Log In →"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>

              <span className="px-3 text-[10px] font-medium uppercase tracking-widest text-gray-400">
                Or Continue With
              </span>

              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <button
              type="button"
              className="w-full h-10 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <img
                src={googleIcon}
                alt="Google"
                className="w-4 h-4 object-contain"
              />

              <span className="text-sm text-gray-700">Sign in with Google</span>
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-500">
              Don't have an account? {" "}
            </span>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
