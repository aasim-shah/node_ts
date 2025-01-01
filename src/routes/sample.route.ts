import express from "express";
import { createItem, getItem } from "../controllers/sample.controller";

const sampleRouter = express.Router();

sampleRouter.get("/item/:id", getItem);
sampleRouter.post("/item", createItem);

export default sampleRouter;
