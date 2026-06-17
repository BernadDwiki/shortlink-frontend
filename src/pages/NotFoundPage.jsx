import { Link } from "react-router-dom";

import Footer from "../components/Footer";

import notFoundIcon from "../assets/images/not-found.png";

import analyticsIcon from "../assets/images/check-analytics.png";
import createLinkIcon from "../assets/images/new-shortlink.png";
import apiIcon from "../assets/images/developer-api.png";

import arrowLeftIcon from "../assets/images/back.png";

export default function NotFoundPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16 flex justify-center">
          <div className="w-full max-w-md">
            {/* Illustration */}
            <div className="flex justify-center">
              <img
                src={notFoundIcon}
                alt="404 Illustration"
                className="w-28 h-28 object-contain"
              />
            </div>

            {/* Content */}
            <div className="text-center mt-4">
              <h1 className="text-5xl font-bold text-blue-600">404</h1>

              <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                Page Not Found
              </h2>

              <p className="mt-4 text-sm text-gray-500 leading-6 max-w-sm mx-auto">
                The page you're looking for doesn't exist. It may have been
                moved, deleted, or the link might be broken.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 mt-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                <img src={arrowLeftIcon} alt="Back" className="w-4 h-4" />
                Go to Dashboard
              </Link>

              <a
                href="mailto:support@example.com"
                className="px-5 py-3 bg-white border border-gray-200 text-blue-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
              >
                Report an Issue
              </a>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-3 mt-12">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <img src={analyticsIcon} alt="Analytics" className="w-5 h-5" />

                <h3 className="mt-3 text-xs font-semibold text-gray-900">
                  Check Analytics
                </h3>

                <p className="mt-2 text-[11px] text-gray-500 leading-4">
                  Track your active links and traffic sources in real-time.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <img
                  src={createLinkIcon}
                  alt="New ShortLink"
                  className="w-5 h-5"
                />

                <h3 className="mt-3 text-xs font-semibold text-gray-900">
                  New ShortLink
                </h3>

                <p className="mt-2 text-[11px] text-gray-500 leading-4">
                  Create a brand new shortened URL in seconds.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <img src={apiIcon} alt="Developer API" className="w-5 h-5" />

                <h3 className="mt-3 text-xs font-semibold text-gray-900">
                  Developer API
                </h3>

                <p className="mt-2 text-[11px] text-gray-500 leading-4">
                  Integrate our link infrastructure into your apps.
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