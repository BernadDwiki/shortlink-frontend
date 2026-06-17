import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import plusIcon from "../assets/images/plus-icon.png";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-10">
          <Link to="/">
            <img src={logo} alt="ShortLink" className="h-8 w-auto" />
          </Link>

          <div className="flex gap-8 text-sm">
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard" ||
                location.pathname.startsWith("/dashboard/")
                  ? "text-blue-800 font-semibold"
                  : "text-gray-700 font-medium hover:text-blue-600"
              }
            >
              Dashboard
            </Link>

            <Link
              to="/analytics"
              className={
                location.pathname === "/analytics" ||
                location.pathname.startsWith("/analytics/")
                  ? "text-blue-800 font-semibold"
                  : "text-gray-700 font-medium hover:text-blue-600"
              }
            >
              Analytics
            </Link>

            <Link
              to="/links"
              className={
                location.pathname === "/links" ||
                location.pathname.startsWith("/links/")
                  ? "text-blue-800 font-semibold"
                  : "text-gray-700 font-medium hover:text-blue-600"
              }
            >
              Links
            </Link>
          </div>
        </div>

        {/* Right Side */}
        {!isAuthenticated ? (
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium">
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/create-link"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
            >
              <img src={plusIcon} alt="Create" className="w-3 h-3" />
              Create New Link
            </Link>

            <img
              src={avatar}
              alt={user?.email || "User"}
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => navigate("/profile")}
            />

            {user?.email && (
              <span
                className="text-sm text-gray-700 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {user.email}
              </span>
            )}

            <button onClick={handleLogout} className="text-sm font-medium">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
