import { Router } from "express";
import {
  getAllParts,
  getSinglePart,
  createPart,
  updatePart,
  deletePart,
} from "../controllers/partController.js";

const router = Router();

router.get("/", getAllParts);
router.get("/:id", getSinglePart);
router.post("/", createPart);
router.patch("/:id", updatePart);
router.delete("/:id", deletePart);

export default router;
