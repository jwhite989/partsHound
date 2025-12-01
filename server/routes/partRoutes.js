import { Router } from "express";
import {
  getAllParts,
  getSinglePart,
  createPart,
} from "../controllers/partController.js";

const router = Router();

router.get("/", getAllParts);
router.get("/:id", getSinglePart);
router.post("/", createPart);

export default router;
