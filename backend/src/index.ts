import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import router from "./routes/users-routes";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger/swagger-output.json";
// import { initializeRedisClient, redisClient } from "./libs/redis";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req: Request, res: Response) => {
  // redisClient.set("Welcome to Circle App API", "Welcome to Circle App API");
  res.send("Hello welcome to circle!");
});

app.use("/api/v1", router);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

// initializeRedisClient().then(() => {
// });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
