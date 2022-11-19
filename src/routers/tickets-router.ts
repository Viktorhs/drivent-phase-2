import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes);
//.get("/", )
//.post("/", validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);

export { ticketsRouter };
