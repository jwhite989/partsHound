import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParts = async () => {
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

    fetchParts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  // Calculate dashboard metrics
  const totalPartEntries = parts.length;
  const totalQuantityInStock = parts.reduce(
    (sum, part) => sum + part.quantity,
    0
  );
  const totalInventoryValue = parts.reduce(
    (sum, part) => sum + part.quantity * part.unitPrice,
    0
  );
  const lowStockCount = parts.filter(
    (part) => part.quantity <= part.lowStock
  ).length;
  const averagePrice =
    totalQuantityInStock > 0 ? totalInventoryValue / totalQuantityInStock : 0;

  // Get recent modifications (last 5)
  const recentParts = [...parts]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  // Category breakdown
  const categoryBreakdown = parts.reduce((acc, part) => {
    acc[part.category] = (acc[part.category] || 0) + part.quantity;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <Header />
            <p className="text-slate-600 mt-2">
              Welcome back, <span className="font-semibold">{user?.name}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/inventory"
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              View Inventory
            </Link>
            <button
              onClick={handleLogout}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Parts Card */}
          <div className="bg-white shadow-lg rounded-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold">
                  Total Quantity In Stock
                </p>
                <p className="text-4xl font-bold text-blue-600 mt-2">
                  {totalQuantityInStock}
                </p>
              </div>
              <div className="text-5xl text-blue-100">📦</div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              All units across {totalPartEntries} part types
            </p>
          </div>

          {/* Inventory Value Card */}
          <div className="bg-white shadow-lg rounded-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold">
                  Inventory Value
                </p>
                <p className="text-4xl font-bold text-green-600 mt-2">
                  ${totalInventoryValue.toFixed(2)}
                </p>
              </div>
              <div className="text-5xl text-green-100">💰</div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Total stock value</p>
          </div>

          {/* Low Stock Alert Card */}
          <div className="bg-white shadow-lg rounded-lg border border-red-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold">
                  Low Stock
                </p>
                <p className="text-4xl font-bold text-red-600 mt-2">
                  {lowStockCount}
                </p>
              </div>
              <div className="text-5xl text-red-100">⚠️</div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Parts need restocking</p>
          </div>

          {/* Average Price Card */}
          <div className="bg-white shadow-lg rounded-lg border border-purple-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-semibold">
                  Avg Price per Unit
                </p>
                <p className="text-4xl font-bold text-purple-600 mt-2">
                  ${averagePrice.toFixed(2)}
                </p>
              </div>
              <div className="text-5xl text-purple-100">💵</div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Average unit cost</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white shadow-lg rounded-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentParts.length > 0 ? (
                recentParts.map((part) => (
                  <div
                    key={part._id || part.id}
                    className="flex items-center justify-between pb-4 border-b border-slate-200 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {part.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {part.lastModifiedBy
                          ? `Modified by ${part.lastModifiedBy}`
                          : `Added by ${part.addedBy}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {part.partNumber}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No parts yet</p>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white shadow-lg rounded-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Category Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown).length > 0 ? (
                Object.entries(categoryBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center flex-1">
                        <span className="text-sm font-medium text-slate-700 capitalize min-w-24">
                          {category}
                        </span>
                        <div className="flex-1 ml-4 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                (count /
                                  Math.max(
                                    ...Object.values(categoryBreakdown)
                                  )) *
                                  100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-semibold text-slate-900 min-w-12 text-right">
                        {count}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="text-slate-500 text-center py-8">
                  No categories yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Low Stock Items Table */}
        {lowStockCount > 0 && (
          <div className="mt-8 bg-white shadow-lg rounded-lg border border-red-200 p-6">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              ⚠️ Low Stock Alert
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-red-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Part Number
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Name
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">
                      Current
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">
                      Threshold
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {parts
                    .filter((p) => p.quantity <= p.lowStock)
                    .map((part) => (
                      <tr
                        key={part._id || part.id}
                        className="border-b border-slate-200 hover:bg-red-50"
                      >
                        <td className="py-3 px-4 font-medium text-blue-600">
                          {part.partNumber}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {part.name}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-red-600">
                          {part.quantity}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-600">
                          {part.lowStock}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
