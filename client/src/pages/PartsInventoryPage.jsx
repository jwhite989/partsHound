import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PartsTable from "../components/PartsTable";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { apiCall } from "../utils/apiClient";

export default function PartsInventoryPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllParts = async () => {
    try {
      const res = await fetch("/api/parts");
      if (!res.ok) throw new Error("Failed to fetch parts");
      const data = await res.json();
      setParts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllParts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = (partId) => {
    navigate(`/edit-part/${partId}`);
  };

  const handleDelete = async (partId) => {
    try {
      const res = await apiCall(`/api/parts/${partId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete part");

      setParts(parts.filter((p) => (p._id || p.id) !== partId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter parts based on search query
  const filteredParts = parts.filter((part) => {
    const query = searchQuery.toLowerCase();
    return (
      part.partNumber.toLowerCase().includes(query) ||
      part.name.toLowerCase().includes(query) ||
      part.manufacturer.toLowerCase().includes(query) ||
      part.category.toLowerCase().includes(query) ||
      part.supplier.toLowerCase().includes(query)
    );
  });

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-full">
        <div className="flex justify-between items-start mb-8">
          <div>
            <Header />
            <p className="text-slate-600 mt-2">
              Logged in as <span className="font-semibold">{user?.name}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/dashboard"
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              📊 Dashboard
            </Link>
            <Link
              to="/add-part"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              + Add New Part
            </Link>
            <button
              onClick={handleLogout}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white shadow-md rounded-lg border border-slate-200 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
            <div className="flex-1">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                Search Parts
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by part number, name, manufacturer, category, or supplier..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div className="text-slate-600 font-medium whitespace-nowrap">
              {filteredParts.length} / {parts.length} parts
            </div>
          </div>
        </div>

        <PartsTable
          parts={filteredParts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
