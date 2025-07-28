import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import routes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
