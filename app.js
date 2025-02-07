import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";

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

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "AdoptMe API",
      version: "0.1.0",
      description:
        "This AdoptMe API documentation is a comprehensive guide designed to bridge the gap between frontend and backend teams. With clear and structured documentation, team members can easily understand how to interact with the API and build exciting features for our pet adoption platform.",
      contact: {
        name: "Fadhil Gani",
        email: "fadhilgani2@gmail.com",
      },
    },
    servers: [
      {
        url: "https://adoptme-be.vercel.app/",
      },
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "routes/*.js")],
};

const specs = swaggerJSDoc(options);

// Serve the Swagger documentation at /api-docs
app.use("/api-docs", APIDocsAuth, swaggerUi.serve, swaggerUi.setup(specs));

// Serve Swagger UI static files
app.use(
  "/swagger-ui",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
);

// Apply APIAuth middleware to all other routes
app.use(APIAuth);

// Define your routes
route(app);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
