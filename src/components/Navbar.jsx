import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Navbar() {
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
            <a href="#" className="text-blue-600 font-medium">
              Dashboard
            </a>
            <a href="#">Analytics</a>
            <a href="#">Links</a>
          </div>
        </div>

        {/* Right Side */}
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

      </div>
    </nav>
  );
}