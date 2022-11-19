import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getuserPayments } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getuserPayments);
//.post("/process", postUserPayment);

export { paymentsRouter };
