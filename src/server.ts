import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { port, corsOrigin } from "./config/constants";
import router from "./routes/index";
import { ResSuccess } from "./utils/responses";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", ...(corsOrigin ? [corsOrigin] : [])],
      },
    },
  })
);
app.use(cors({ origin: corsOrigin || "*" }));
app.use(express.json());
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  new ResSuccess(res, "Welcome to the API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
