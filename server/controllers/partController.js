import Part from "../models/Part.js";

export const getAllParts = async (req, res) => {
  try {
    const parts = await Part.find({});
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSinglePart = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);

    if (!part) {
      return res
        .status(404)
        .json(`message: Could not find part with id: ${req.params.id}`);
    }
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPart = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }

    const newPart = await Part.create(req.body);
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePart = async (req, res) => {
  try {
    const update = {};
    if (req.body.partNumber !== undefined)
      update.partNumber = req.body.partNumber;
    if (req.body.name !== undefined) update.name = req.body.name;
    if (req.body.manufacturer !== undefined)
      update.manufacturer = req.body.manufacturer;
    if (req.body.quantity !== undefined) update.quantity = req.body.quantity;
    if (req.body.unitPrice !== undefined) update.unitPrice = req.body.unitPrice;
    if (req.body.category !== undefined) update.category = req.body.category;
    if (req.body.supplier !== undefined) update.supplier = req.body.supplier;
    if (req.body.lowStock !== undefined) update.lowStock = req.body.lowStock;

    const updateData = await Part.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      return res
        .status(404)
        .json(`message: Could not find part with id: ${req.params.id}`);
    }
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePart = async (req, res) => {
  const partToDelete = await Part.findByIdAndDelete(req.params.id);
  try {
    if (!partToDelete) {
      return res
        .status(404)
        .json(`message: Could not find part with id: ${req.params.id}`);
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
