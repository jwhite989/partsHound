const CATEGORIES = [
  "engine",
  "transmission",
  "fuel system",
  "driveline",
  "brakes",
  "battery",
  "fluid",
  "suspension",
  "tire",
  "electrical",
  "chassis",
  "body",
  "exhaust",
  "steering",
  "axle",
  "air system",
  "cooling",
  "hvac",
  "lighting",
  "trailer",
  "other",
];

export default function AddPartForm({ formData, onChange, onSubmit }) {
  return (
    <div className="mt-12 mb-8">
      <div className="bg-white shadow-xl rounded-lg border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Part</h2>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormInput
            label="Part Number"
            type="text"
            name="partNumber"
            value={formData.partNumber}
            onChange={onChange}
            placeholder="e.g., ENG-1001"
          />

          <FormInput
            label="Part Name"
            type="text"
            name="partName"
            value={formData.partName}
            onChange={onChange}
            placeholder="e.g., Oil Filter"
          />

          <FormInput
            label="Manufacturer"
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={onChange}
            placeholder="e.g., Bosch"
          />

          <FormInput
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={onChange}
            placeholder="0"
            min="0"
          />

          <FormInput
            label="Unit Price"
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={onChange}
            placeholder="0.00"
            min="0"
            step="0.01"
          />

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              required
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Supplier"
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={onChange}
            placeholder="e.g., AutoPartsPro"
          />

          <FormInput
            label="Low Stock Threshold"
            type="number"
            name="lowStock"
            value={formData.lowStock}
            onChange={onChange}
            placeholder="5"
            min="0"
          />

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Add Part
            </button>
            <button
              type="reset"
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  min,
  step,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-slate-700 mb-2">
        {label} *
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        min={min}
        step={step}
        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>
  );
}
