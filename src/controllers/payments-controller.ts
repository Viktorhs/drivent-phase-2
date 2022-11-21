import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { PaymentEntity } from "@/protocols";

export async function getUserPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId;
  const { userId } = req;

  if (!ticketId) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }

  try {
    const ticket = await paymentsService.listPaymentTicket(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({});
    }else if(error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
  }
}

export async function postUserPayments(req: AuthenticatedRequest, res: Response) {
  const paymentsInformations = req.body as PaymentEntity;
  const { userId } = req;
  
  if (!paymentsInformations.ticketId || !req.body.cardData) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
  
  try {
    const ticket = await paymentsService.InsertPayment(paymentsInformations, userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({});
    }else if(error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({});
    }
  }
}
