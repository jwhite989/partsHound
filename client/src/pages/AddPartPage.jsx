import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AddPartForm from "../components/AddPartForm";
import { apiCall } from "../utils/apiClient";

export default function AddPartPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState(null);
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPart = {
      partNumber: formData.partNumber,
      name: formData.partName,
      manufacturer: formData.manufacturer,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      category: formData.category,
      supplier: formData.supplier,
      lowStock: parseInt(formData.lowStock),
      userName: user?.name,
    };

    try {
      const res = await apiCall("/api/parts", {
        method: "POST",
        body: JSON.stringify(newPart),
      });

      if (!res.ok) throw new Error("Failed to add part");

      const addedPart = await res.json();
      setError(null);

      // Reset form and redirect
      setFormData({
        partNumber: "",
        partName: "",
        manufacturer: "",
        quantity: "",
        unitPrice: "",
        category: "",
        supplier: "",
        lowStock: "",
      });

      // Redirect to parts page after successful submission
      navigate("/inventory");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setFormData({
      partNumber: "",
      partName: "",
      manufacturer: "",
      quantity: "",
      unitPrice: "",
      category: "",
      supplier: "",
      lowStock: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Parts Inventory
          </h1>
          <p className="text-slate-600">
            Add new automotive parts to inventory
          </p>
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
        />

        <div className="mt-8 text-center space-y-2">
          <a
            href="/inventory"
            className="block text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Inventory
          </a>
          <a
            href="/dashboard"
            className="block text-slate-600 hover:text-slate-800 font-semibold"
          >
            📊 View Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
