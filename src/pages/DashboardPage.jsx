import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SweetAlert from "../components/ui/SweetAlert";

import searchIcon from "../assets/images/search.png";
import filterIcon from "../assets/images/filter.png";
import copyIcon from "../assets/images/copy.png";
import deleteIcon from "../assets/images/delete.png";
import linkIcon from "../assets/images/link-icon2.png";

import { getUserLinks, deleteLink } from "../services/linkService";

export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadLinks = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getUserLinks();
        
        // Transform backend data to match UI structure (use backend-provided short_url)
        const transformedLinks = data.map((link) => ({
          id: link.id,
          shortUrl: link.short_url || (link.slug ? `shrt.lnk/${link.slug}` : "N/A"),
          originalUrl: link.original_url,
          date: new Date(link.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).toUpperCase(),
          clicks: "0",
        }));
        
        setLinks(transformedLinks);
      } catch (err) {
        setError(err.message || "Failed to load links");
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    loadLinks();
  }, []);

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      setError(err.message || "Failed to copy URL");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await SweetAlert.confirm({
      title: "Delete this link?",
      text: "This action cannot be undone.",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteLink(id);
      setLinks((currentLinks) => currentLinks.filter((link) => link.id !== id));
      SweetAlert.success({
        title: "Deleted!",
        text: "Your link has been deleted.",
      });
    } catch (err) {
      setError(err.message || "Failed to delete link");
      SweetAlert.error({
        text: err.message || "Failed to delete link",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f8fa]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Links
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage and track your shortened digital assets.
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold">
                Total Active
              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                {links.length}
              </h2>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Search */}
          <div className="mt-8">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={searchIcon}
                  alt="Search"
                  className="w-4 h-4"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by URL or original address..."
                  className="w-full outline-none text-sm"
                />
              </div>

              <img
                src={filterIcon}
                alt="Filter"
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <p className="text-gray-500">Loading your links...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && links.length === 0 && !error && (
            <div className="mt-8 text-center py-12">
              <p className="text-gray-500">No links yet. Create your first shortened link!</p>
            </div>
          )}

          {/* Links List */}
          {!loading && (
            <div className="mt-8 space-y-4">
              {links
                .filter((link) => {
                  const query = searchTerm.trim().toLowerCase();
                  if (!query) {
                    return true;
                  }

                  return (
                    link.shortUrl.toLowerCase().includes(query) ||
                    link.originalUrl.toLowerCase().includes(query)
                  );
                })
                .map((link) => (
                <div
                  key={link.id}
                  className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={linkIcon}
                        alt="Link"
                        className="w-4 h-2"
                      />

                      <a
                        href={link.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        {link.shortUrl}
                      </a>
                    </div>

                    <p className="mt-2 text-sm text-gray-500 truncate max-w-md">
                      {link.originalUrl}
                    </p>

                    <p className="mt-3 text-xs tracking-widest text-gray-400 uppercase">
                      {link.date} • {link.clicks} Clicks
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                        className="transition-transform hover:scale-105"
                      >
                        <img
                          src={copyIcon}
                          alt="Copy"
                          className="w-10 h-10"
                        />
                      </button>
                      {copiedId === link.id && (
                        <span className="text-xs text-green-600 mt-1">Copied</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(link.id)}
                      className="transition-transform hover:scale-105"
                      disabled={deletingId === link.id}
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-10 h-10"
                      />
                    </button>
                    {deletingId === link.id && (
                      <span className="text-xs text-gray-500 mt-1">Deleting...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && links.length > 0 && (
            <div className="mt-10 flex items-center justify-between text-sm text-gray-500">
              <button className="hover:text-blue-600 transition">
                ‹ Prev Page
              </button>

              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  1
                </span>

                <span>of</span>

                <span>1</span>
              </div>

              <button className="hover:text-blue-600 transition">
                Next ›
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}