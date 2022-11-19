import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes, getUserTickets, createNewTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getUserTickets)
  .post("/", createNewTicket);

export { ticketsRouter };
