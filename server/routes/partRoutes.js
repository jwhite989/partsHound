import { Router } from "express";
import {
  getAllParts,
  getSinglePart,
  createPart,
  updatePart,
  deletePart,
} from "../controllers/partController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getAllParts);
router.get("/:id", getSinglePart);
router.post("/", authMiddleware, createPart);
router.patch("/:id", authMiddleware, updatePart);
router.delete("/:id", authMiddleware, deletePart);

export default router;
