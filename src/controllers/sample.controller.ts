import { Request, Response, NextFunction } from "express";
import { ResError, ResSuccess, asyncHandler } from "../utils/responses";

const getItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const item = await fakeDatabaseCall(id);

  if (!item) throw new ResError(404, "Item not found");
  res.status(200).json(new ResSuccess(item, "Item retrieved successfully"));
});

const createItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;

  if (!name || !description) throw new ResError(400, "Name and description are required");

  const newItem = await fakeDatabaseSave({ name, description });
  res.status(201).json(new ResSuccess(newItem, "Item created successfully"));
});

const fakeDatabaseCall = async (id: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomOutcome = Math.random();
      const item = randomOutcome > 0.2 ? { id, name: "Sample Item", description: "A sample description" } : null;
      randomOutcome > 0.2 ? resolve(item) : reject(new ResError(500, "Database error occurred"));
    }, 500);
  });
};

const fakeDatabaseSave = async (itemData: { name: string; description: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomOutcome = Math.random();
      const savedItem = randomOutcome > 0.2 ? { id: "2", ...itemData } : null;
      randomOutcome > 0.2 ? resolve(savedItem) : reject(new ResError(500, "Failed to save item"));
    }, 500);
  });
};

export { getItem, createItem };
