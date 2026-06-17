import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import backIcon from "../assets/images/back.png";
import eyeIcon from "../assets/images/eye2.png";
import analyticsIcon from "../assets/images/analytics.png";
import qrIcon from "../assets/images/qr-code.png";
import linkIcon from "../assets/images/link-icon.png";
import lightningIcon from "../assets/images/lightning.png";

export default function CreateLinkPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [slug, setSlug] = useState("");

  const previewUrl = slug
    ? `https://short.link/${slug}`
    : "https://short.link/your-short-link";

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // Integrasi POST /api/links
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <img src={backIcon} alt="Back" className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Create New Short Link
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Transform your long URLs into clean, manageable assets.
          </p>

          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <form onSubmit={handleSubmit}>
              {/* Destination URL */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-gray-800 mb-2">
                  Destination URL <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <img
                    src={linkIcon}
                    alt="Link"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-2"
                  />

                  <input
                    type="url"
                    placeholder="https://example.com/your-long-url-here"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 border border-gray-200 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <p className="mt-1 text-[11px] italic text-gray-400">
                  Ensure your URL starts with http:// or https://
                </p>
              </div>

              {/* Custom Slug */}
              <div className="mt-6">
                <label className="block text-[11px] font-bold uppercase tracking-wide text-gray-800 mb-2">
                  Custom Slug (Optional)
                </label>

                <div className="flex h-11 border border-gray-200 rounded-md overflow-hidden">
                  <div className="px-4 flex items-center text-sm text-gray-600 bg-gray-50 border-r border-gray-200">
                    short.link/
                  </div>

                  <input
                    type="text"
                    placeholder="my-custom-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 px-4 text-sm focus:outline-none"
                  />
                </div>

                <p className="mt-1 text-[11px] italic text-gray-400">
                  Leave blank to generate a random unique identifier.
                </p>
              </div>

              {/* Live Preview */}
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-blue-600">
                  <img src={eyeIcon} alt="Preview" className="w-4 h-4" />
                  Live Preview
                </div>

                <p className="mt-2 text-sm text-gray-800">
                  Your short link will be:{" "}
                  <span className="font-medium text-blue-600">
                    {previewUrl}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex items-center gap-6">
                <button
                  type="submit"
                  className="h-11 px-6 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Create Link

                  <img
                    src={lightningIcon}
                    alt="Create"
                    className="w-3 h-3"
                  />
                </button>

                <Link
                  to="/dashboard"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="flex items-start gap-4">
              <img
                src={analyticsIcon}
                alt="Analytics"
                className="w-12 h-12 object-contain shrink-0"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  Real-time Analytics
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Track every click, geographical location, and referral source
                  instantly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img
                src={qrIcon}
                alt="QR Code"
                className="w-12 h-12 object-contain shrink-0"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  Auto-generated QR
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Every link automatically creates a high-resolution QR code for
                  print.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}