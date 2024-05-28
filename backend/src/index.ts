import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
import threadsRoutes from "./routes/threadsRoutes";
import cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;
    app.use(express.json());

    app.use(cors());

    app.use("/api", threadsRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
