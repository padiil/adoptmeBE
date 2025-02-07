import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yamljs";

import { route } from "./routes/index.routes.js";
import APIAuth from "./middlewares/APIAuth.middleware.js";
import APIDocsAuth from "./middlewares/APIDocsAuth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(helmet());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dokumentasi API
const swaggerDocument = YAML.load(path.join(__dirname, "docs/openapi.yml"));
app.use(
  "/api-docs",
  APIDocsAuth,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// static file buat swagger-ui
app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use(APIAuth);

route(app);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
