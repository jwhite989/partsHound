export default function PartsTable({ parts, onEdit, onDelete }) {
  return (
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
            <th className="py-4 px-6">Added By</th>
            <th className="py-4 px-6">Last Modified By</th>
            <th className="py-4 px-6 text-center">Actions</th>
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

              <td className="py-4 px-6 text-sm text-slate-600">
                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  {p.addedBy}
                </span>
              </td>

              <td className="py-4 px-6 text-sm text-slate-600">
                {p.lastModifiedBy ? (
                  <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                    {p.lastModifiedBy}
                  </span>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>

              <td className="py-4 px-6 text-center">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(p._id || p.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${p.name}?`)) {
                        onDelete(p._id || p.id);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
