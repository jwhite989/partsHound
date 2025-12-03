import { useState, useEffect } from "react";

function App() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllParts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/parts");
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

  if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Parts Inventory
          </h1>
          <p className="text-slate-600">
            Manage and track all automotive parts
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-left text-white text-sm font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Part Number</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Manufacturer</th>
                <th className="py-4 px-6 text-center">Quantity</th>
                <th className="py-4 px-6 text-right">Unit Price</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Supplier</th>
                <th className="py-4 px-6 text-center">Low Stock</th>
              </tr>
            </thead>

            <tbody>
              {parts.map((p) => (
                <tr
                  key={p.id || p._id}
                  className="text-sm text-slate-700 border-b border-slate-200 hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 font-semibold text-blue-600">
                    {p.partNumber}
                  </td>
                  <td className="py-4 px-6">{p.name}</td>
                  <td className="py-4 px-6 text-slate-600">{p.manufacturer}</td>

                  <td
                    className={`py-4 px-6 text-center font-semibold ${
                      p.quantity <= p.lowStock
                        ? "text-red-600 bg-red-50"
                        : "text-green-600"
                    }`}
                  >
                    {p.quantity}
                  </td>

                  <td className="py-4 px-6 text-right font-medium text-slate-900">
                    ${p.unitPrice.toFixed(2)}
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {p.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-slate-600">{p.supplier}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        p.lowStock <= 5
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.lowStock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
