import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes, getUserTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getUserTickets);
//.post("/", validateBody(createEnrollmentSchema), postCreateOrUpdateEnrollment);

export { ticketsRouter };
