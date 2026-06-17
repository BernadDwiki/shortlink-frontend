import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import plusIcon from "../assets/images/plus-icon.png";
import { getToken, getUser, removeToken, removeUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const onStorage = () => {
      setToken(getToken());
      setUser(getUser());
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-10">
          <Link to="/">
            <img
              src={logo}
              alt="ShortLink"
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex gap-8 text-sm">
            <Link
              to="/dashboard"
              className="text-blue-600 font-medium"
            >
              Dashboard
            </Link>

            <Link to="/analytics">
              Analytics
            </Link>

            <Link to="/links">
              Links
            </Link>
          </div>
        </div>

        {/* Right Side */}
        {!token ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium"
            >
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
              <img
                src={plusIcon}
                alt="Create"
                className="w-3 h-3"
              />

              Create New Link
            </Link>

            <img
              src={avatar}
              alt={user?.email || "User"}
              className="w-8 h-8 rounded-full"
            />

            {user?.email && (
              <span className="text-sm text-gray-700">{user.email}</span>
            )}

            <button
              onClick={handleLogout}
              className="text-sm font-medium"
            >
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}