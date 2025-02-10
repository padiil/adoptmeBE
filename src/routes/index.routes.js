import { getpets, getRandomFacts, getpetById } from "../controllers/index.controllers.js";

export const route = (app) => {
  app.get("/api/pets", getpets);

   
  app.get("/api/random-facts", getRandomFacts);

  app.get("/api/pet/:id", getpetById);

}