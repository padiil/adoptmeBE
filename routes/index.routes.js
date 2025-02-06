import { getAnimals } from "../controllers/index.controllers.js";

export const route = (app) => {
  app.get("/api/animals", getAnimals);
  
};
