import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./connection/database";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/todolist/apis", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;