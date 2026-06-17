import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import plusIcon from "../assets/images/plus-icon.png";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
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
              to="/links/create"
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
              alt="User"
              className="w-8 h-8 rounded-full"
            />

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