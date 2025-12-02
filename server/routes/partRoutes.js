import { Router } from "express";
import {
  getAllParts,
  getSinglePart,
  createPart,
  updatePart,
} from "../controllers/partController.js";

const router = Router();

router.get("/", getAllParts);
router.get("/:id", getSinglePart);
router.post("/", createPart);
router.put("/:id", updatePart);

export default router;
