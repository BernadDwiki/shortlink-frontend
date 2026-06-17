import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";
import eyeIcon from "../assets/images/eye.png";

import Footer from "../components/Footer";
import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const user = await register(email, password);

      if (user?.id) {
        setMessage("Registration successful. Redirecting to login...");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError("Registration succeeded but no user data was returned.");
      }
    } catch (err) {
      setError(err.message || "Unable to complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div>
            {/* Header */}
            <div className="px-6 py-8 text-center border-b border-gray-100">
              <div className="flex justify-center mb-5">
                <img
                  src={logo}
                  alt="ShortLink"
                  className="h-5 object-contain"
                />
              </div>

              <h1 className="text-2xl font-semibold text-gray-900">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Join the elite architects of the web.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden px-6 py-6">
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

              <form onSubmit={handleRegister}>
                {/* Email */}
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

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

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
                        className="w-4 h-4"
                      />
                    </button>
                  </div>

                  <p className="mt-2 text-[10px] uppercase tracking-wider text-gray-400">
                    Minimum 6 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="••••••••"
                      className="w-full h-10 rounded-md border border-gray-300 px-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <img
                        src={eyeIcon}
                        alt="toggle password"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </div>

                {/* Sign Up */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                  {loading ? "Signing up..." : "Sign Up →"}
                </button>

                {/* Terms */}
                <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
                  By signing up, you agree to our{" "}
                  <button type="button" className="text-blue-600 hover:underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </button>
                  .
                </p>
              </form>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center my-6">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}