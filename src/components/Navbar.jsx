import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import plusIcon from "../assets/images/plus-icon.png";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex flex-1 items-center gap-4">
          <Link to="/">
            <img src={logo} alt="ShortLink" className="h-8 w-auto mr-6" />
          </Link>

          <div className="hidden sm:flex flex-wrap gap-4 text-sm">
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="sm:hidden rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>

          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-4">
          <div className="flex flex-col gap-3">
            <Link
              to="/dashboard"
              className={
                location.pathname === "/dashboard" ||
                location.pathname.startsWith("/dashboard/")
                  ? "text-blue-800 font-semibold"
                  : "text-gray-700 font-medium hover:text-blue-600"
              }
              onClick={() => setMobileOpen(false)}
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
              onClick={() => setMobileOpen(false)}
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
              onClick={() => setMobileOpen(false)}
            >
              Links
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create-link"
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Create New Link
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {user?.email || "Profile"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
