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
