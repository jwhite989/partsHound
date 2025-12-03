import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { apiCall } from "../utils/apiClient";
import AddPartForm from "../components/AddPartForm";

export default function EditPartPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    partNumber: "",
    partName: "",
    manufacturer: "",
    quantity: "",
    unitPrice: "",
    category: "",
    supplier: "",
    lowStock: "",
  });

  // Fetch the part data on mount
  useEffect(() => {
    const fetchPart = async () => {
      try {
        const res = await fetch(`/api/parts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch part");
        const part = await res.json();

        setFormData({
          partNumber: part.partNumber,
          partName: part.name,
          manufacturer: part.manufacturer,
          quantity: part.quantity.toString(),
          unitPrice: part.unitPrice.toString(),
          category: part.category,
          supplier: part.supplier,
          lowStock: part.lowStock.toString(),
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPart();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPart = {
      partNumber: formData.partNumber,
      name: formData.partName,
      manufacturer: formData.manufacturer,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      category: formData.category,
      supplier: formData.supplier,
      lowStock: parseInt(formData.lowStock),
      lastModifiedBy: user?.name,
    };

    try {
      const res = await apiCall(`/api/parts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedPart),
      });

      if (!res.ok) throw new Error("Failed to update part");

      setError(null);
      navigate("/inventory");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    // Reset to original values - would need to re-fetch or store original data
    navigate("/inventory");
  };

  if (loading) return <p className="p-4 text-gray-600">Loading part data...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Edit Part</h1>
          <p className="text-slate-600">Update automotive part details</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <AddPartForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          isEditing={true}
        />

        <div className="mt-8 text-center">
          <a
            href="/inventory"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Inventory
          </a>
        </div>
      </div>
    </div>
  );
}
