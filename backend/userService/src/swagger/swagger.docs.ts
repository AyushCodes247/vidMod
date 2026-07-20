import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import swaggerSpec from "./swagger.config.js";

const swaggerDocs = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  );
};

export default swaggerDocs;