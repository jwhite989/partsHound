import { useState, useEffect } from "react";
import Header from "./components/Header";
import PartsTable from "./components/PartsTable";
import AddPartForm from "./components/AddPartForm";

function App() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    };

    try {
      const res = await fetch("/api/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPart),
      });

      if (!res.ok) throw new Error("Failed to add part");

      const addedPart = await res.json();
      setParts([...parts, addedPart]);

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

      setError(null);
    } catch (err) {
      setError(err.message);
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
        <Header />

        <PartsTable parts={parts} />

        <AddPartForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
