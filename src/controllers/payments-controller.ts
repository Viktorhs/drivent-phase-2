import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";

export async function getuserPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const { userId } = req;

  if (!ticketId) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const ticket = await paymentsService.listPaymentTicket(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
