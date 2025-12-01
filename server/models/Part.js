import mongoose from "mongoose";

const partSchema = new mongoose.Schema(
  {
    partNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [1, "Part Number must have at least 1 character."],
      maxlength: [50, "Part Number cannot have more than 50 characters."],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be at least 1."],
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "Unit price cannot be negative."],
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: [
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
        ],
        message: "{VALUE} is not a valid category",
      },
      default: "other",
    },
    supplier: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Part = mongoose.model("Part", partSchema);

export default Part;
