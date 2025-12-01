// seed/parts.js
import mongoose from "mongoose";
import Part from "./models/Part.js";
import "dotenv/config";

const data = [
  {
    partNumber: "ENG-1001",
    name: "Oil Filter",
    manufacturer: "Bosch",
    quantity: 42,
    unitPrice: 8.99,
    category: "engine",
    supplier: "AutoPartsPro",
  },
  {
    partNumber: "ENG-1002",
    name: "Air Intake Hose",
    manufacturer: "Denso",
    quantity: 15,
    unitPrice: 24.5,
    category: "engine",
    supplier: "Westline Supply",
  },
  {
    partNumber: "BRA-2001",
    name: "Front Brake Pads",
    manufacturer: "Akebono",
    quantity: 30,
    unitPrice: 52.0,
    category: "brakes",
    supplier: "Prime Auto",
  },
  {
    partNumber: "BRA-2002",
    name: "Rear Brake Pads",
    manufacturer: "Akebono",
    quantity: 27,
    unitPrice: 49.75,
    category: "brakes",
    supplier: "Prime Auto",
  },
  {
    partNumber: "SUS-3001",
    name: "Shock Absorber",
    manufacturer: "Monroe",
    quantity: 18,
    unitPrice: 89.99,
    category: "suspension",
    supplier: "AutoPartsPro",
  },
  {
    partNumber: "SUS-3002",
    name: "Control Arm",
    manufacturer: "Moog",
    quantity: 10,
    unitPrice: 110.5,
    category: "suspension",
    supplier: "Mega Supply",
  },
  {
    partNumber: "TRN-4001",
    name: "Transmission Filter",
    manufacturer: "Mann",
    quantity: 14,
    unitPrice: 29.99,
    category: "transmission",
    supplier: "Westline Supply",
  },
  {
    partNumber: "TRN-4002",
    name: "Clutch Kit",
    manufacturer: "LUK",
    quantity: 6,
    unitPrice: 249.0,
    category: "transmission",
    supplier: "Prime Auto",
  },
  {
    partNumber: "ELE-5001",
    name: "Alternator",
    manufacturer: "Bosch",
    quantity: 8,
    unitPrice: 199.99,
    category: "electrical",
    supplier: "Mega Supply",
  },
  {
    partNumber: "ELE-5002",
    name: "Starter Motor",
    manufacturer: "Denso",
    quantity: 11,
    unitPrice: 179.49,
    category: "electrical",
    supplier: "AutoPartsPro",
  },
  {
    partNumber: "TIR-6001",
    name: "All-Season Tire 205/55R16",
    manufacturer: "Michelin",
    quantity: 20,
    unitPrice: 122.0,
    category: "tire",
    supplier: "TireMax",
  },
  {
    partNumber: "TIR-6002",
    name: "Winter Tire 225/65R17",
    manufacturer: "Goodyear",
    quantity: 16,
    unitPrice: 138.5,
    category: "tire",
    supplier: "TireMax",
  },
  {
    partNumber: "CHS-7001",
    name: "Front Wheel Hub",
    manufacturer: "Timken",
    quantity: 12,
    unitPrice: 98.3,
    category: "chassis",
    supplier: "Prime Auto",
  },
  {
    partNumber: "CHS-7002",
    name: "Rear Wheel Hub",
    manufacturer: "Timken",
    quantity: 12,
    unitPrice: 95.1,
    category: "chassis",
    supplier: "Prime Auto",
  },
  {
    partNumber: "BDY-8001",
    name: "Front Bumper Cover",
    manufacturer: "Keystone",
    quantity: 5,
    unitPrice: 210.0,
    category: "body",
    supplier: "BodyLine",
  },
  {
    partNumber: "BDY-8002",
    name: "Headlight Assembly Left",
    manufacturer: "TYC",
    quantity: 9,
    unitPrice: 89.75,
    category: "body",
    supplier: "BodyLine",
  },
  {
    partNumber: "BDY-8003",
    name: "Headlight Assembly Right",
    manufacturer: "TYC",
    quantity: 9,
    unitPrice: 89.75,
    category: "body",
    supplier: "BodyLine",
  },
  {
    partNumber: "EXH-9001",
    name: "Muffler",
    manufacturer: "Walker",
    quantity: 7,
    unitPrice: 134.6,
    category: "exhaust",
    supplier: "ExhaustPro",
  },
  {
    partNumber: "EXH-9002",
    name: "Catalytic Converter",
    manufacturer: "MagnaFlow",
    quantity: 3,
    unitPrice: 420.0,
    category: "exhaust",
    supplier: "ExhaustPro",
  },
  {
    partNumber: "STR-10001",
    name: "Power Steering Pump",
    manufacturer: "A1 Cardone",
    quantity: 10,
    unitPrice: 155.2,
    category: "steering",
    supplier: "AutoPartsPro",
  },
  {
    partNumber: "STR-10002",
    name: "Steering Rack",
    manufacturer: "A1 Cardone",
    quantity: 4,
    unitPrice: 310.0,
    category: "steering",
    supplier: "AutoPartsPro",
  },
  {
    partNumber: "TRL-11001",
    name: "Trailer Light Kit",
    manufacturer: "Curt",
    quantity: 22,
    unitPrice: 39.99,
    category: "trailer",
    supplier: "TowPro",
  },
  {
    partNumber: "TRL-11002",
    name: "Trailer Hitch Ball",
    manufacturer: "Curt",
    quantity: 25,
    unitPrice: 14.75,
    category: "trailer",
    supplier: "TowPro",
  },
  {
    partNumber: "OTH-12001",
    name: "Windshield Washer Fluid",
    manufacturer: "Prestone",
    quantity: 50,
    unitPrice: 4.99,
    category: "other",
    supplier: "Westline Supply",
  },
  {
    partNumber: "OTH-12002",
    name: "Engine Degreaser",
    manufacturer: "Gunk",
    quantity: 33,
    unitPrice: 7.49,
    category: "other",
    supplier: "Westline Supply",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Part.deleteMany({});
    await Part.insertMany(data);

    console.log("Parts seeded.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
