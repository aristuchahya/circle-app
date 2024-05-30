import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import router from "./routes/users-routes";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello welcome to circle!");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
