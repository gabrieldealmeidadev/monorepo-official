import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API funcionando!",
  });
});

export default app;
