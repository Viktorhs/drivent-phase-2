import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getUserPayments, postUserPayments } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getUserPayments)
  .post("/process", postUserPayments);

export { paymentsRouter };
