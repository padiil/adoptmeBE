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
// app.use(helmet());
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
        // url: "https://logrocket.com",
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
    tags: [
      {
        name: "animals",
        description: "Everything about pets",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
app.use("/api-docs", APIDocsAuth, swaggerUi.serve, swaggerUi.setup(specs));

app.use(APIAuth);
route(app);

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
