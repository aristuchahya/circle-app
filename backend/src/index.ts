import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello welcome to circle!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
