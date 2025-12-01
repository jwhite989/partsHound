import { Router } from "express";
import { getAllParts, getSinglePart } from "../controllers/partController.js";

const router = Router();

router.get("/", getAllParts);
router.get("/:id", getSinglePart);

export default router;
