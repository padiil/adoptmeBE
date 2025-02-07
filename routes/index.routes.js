import { getpets } from "../controllers/index.controllers.js";

export const route = (app) => {
  app.get("/api/pets", getpets);
};
