import { Router } from "express";
import sampleRouter from "./sample.route";
const router = Router();

router.use("/sample", sampleRouter);

export default router;
