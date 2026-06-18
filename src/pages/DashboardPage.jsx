import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SweetAlert from "../components/ui/SweetAlert";

import searchIcon from "../assets/images/search.png";
import filterIcon from "../assets/images/filter.png";
import copyIcon from "../assets/images/copy.png";
import deleteIcon from "../assets/images/delete.png";

import { getUserLinks, deleteLink } from "../services/linkService";

export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadLinks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUserLinks();

        const transformedLinks = data.map((link) => ({
          id: link.id,
          shortUrl:
            link.short_url ||
            (link.slug ? `shrt.lnk/${link.slug}` : "N/A"),
          originalUrl: link.original_url,
          date: new Date(link.created_at)
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            .toUpperCase(),
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

  // reset page saat search berubah
  const filteredLinks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return links;

    return links.filter(
      (link) =>
        link.shortUrl.toLowerCase().includes(query) ||
        link.originalUrl.toLowerCase().includes(query)
    );
  }, [links, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredLinks.length / itemsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const paginatedLinks = useMemo(() => {
    const start = (currentPageSafe - 1) * itemsPerPage;
    return filteredLinks.slice(start, start + itemsPerPage);
  }, [filteredLinks, currentPageSafe]);

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

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deleteLink(id);

      setLinks((prev) => prev.filter((l) => l.id !== id));

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

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f8fa]">
        <div className="max-w-4xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Links
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Manage and track your shortened digital assets.
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-xs uppercase text-gray-400 font-semibold">
                Total Active
              </p>
              <h2 className="text-3xl font-bold text-blue-600">
                {links.length}
              </h2>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <img src={searchIcon} className="w-4 h-4" />
              <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  resetPagination();
                }}
                placeholder="Search..."
                className="w-full outline-none text-sm"
              />
              <img src={filterIcon} className="w-4 h-4 cursor-pointer" />
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-8 text-center text-gray-500">
              Loading your links...
            </div>
          )}

          {/* List */}
          {!loading && filteredLinks.length > 0 && (
            <div className="mt-8 space-y-4">
              {paginatedLinks.map((link) => (
                <div
                  key={link.id}
                  className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between"
                >
                  <div>
                    <a
                      href={link.shortUrl}
                      className="text-blue-600 font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.shortUrl}
                    </a>

                    <p className="text-sm text-gray-500 truncate">
                      {link.originalUrl}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {link.date}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                        className="hover:scale-105 transition"
                      >
                        <img src={copyIcon} className="w-10 h-10" />
                      </button>

                      <button
                        onClick={() => handleDelete(link.id)}
                        disabled={deletingId === link.id}
                        className="hover:scale-105 transition disabled:opacity-50"
                      >
                        <img src={deleteIcon} className="w-10 h-10" />
                      </button>
                    </div>

                    {copiedId === link.id && (
                      <span className="text-xs text-green-600">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination FIXED & CLEAN */}
          {!loading && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between text-sm">
              
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded text-gray-500 hover:text-blue-600 disabled:opacity-40"
              >
                ‹ Prev
              </button>

              {/* Pages */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 rounded transition border border-transparent ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded text-gray-500 hover:text-blue-600 disabled:opacity-40"
              >
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