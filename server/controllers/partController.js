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
    const allowedFields = [
      "partNumber",
      "name",
      "manufacturer",
      "quantity",
      "unitPrice",
      "category",
      "supplier",
      "lowStock",
    ];

    const update = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        update[field] = req.body[field];
      }
    }

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
    res.status(400).json({ message: error.message });
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
