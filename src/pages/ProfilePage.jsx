import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import profileAvatar from "../assets/images/profile-avatar.png";
import editIcon from "../assets/images/edit.png";
import emailIcon from "../assets/images/email.png";
import shieldIcon from "../assets/images/shield.png";
import linkIcon from "../assets/images/link-icon2.png";
import logoutIcon from "../assets/images/logout.png";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.email ? user.email.split("@")[0] : "User";
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="max-w-xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Account Management
            </p>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-lg font-semibold text-gray-900">
                  Profile
                </h1>

                <span className="px-3 py-1 text-[10px] font-semibold uppercase bg-blue-50 text-blue-600 rounded-full">
                  Pro Member
                </span>
              </div>

              {/* User */}
              <div className="mt-6 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={profileAvatar}
                    alt="Profile"
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <img
                    src={editIcon}
                    alt="Edit"
                    className="absolute -bottom-1 -right-1 w-6 h-6 object-contain cursor-pointer"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    {displayName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {user?.email || "No email available"}
                  </p>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-[10px] uppercase font-semibold tracking-wide text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-2 text-sm text-gray-800">
                    {user?.email || "Not available"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-[10px] uppercase font-semibold tracking-wide text-gray-400">
                    Account Tenure
                  </p>

                  <p className="mt-2 text-sm text-gray-800">
                    Member since: {joinedDate}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 bg-blue-700 rounded-lg px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={linkIcon}
                    alt="Links"
                    className="w-5 h-5 object-contain"
                  />

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-blue-100">
                      Active Assets
                    </p>

                    <p className="text-white font-bold text-xl">12</p>
                  </div>
                </div>

                <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-500 transition">
                  View Links
                </button>
              </div>

              {/* Settings */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={emailIcon}
                      alt="Email"
                      className="w-4 h-4 object-contain"
                    />

                    <span className="text-sm text-gray-700">
                      Email Notifications
                    </span>
                  </div>

                  <button className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={shieldIcon}
                      alt="Security"
                      className="w-4 h-4 object-contain"
                    />

                    <span className="text-sm text-gray-700">
                      Two-Factor Authentication
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold uppercase text-red-500">
                    Disabled
                  </span>
                </div>
              </div>

              {/* Logout */}
              <div className="mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full h-11 border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 transition"
                >
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    className="w-4 h-4 object-contain"
                  />
                  Logout Session
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              Your data is encrypted using AES-256 standards.{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}