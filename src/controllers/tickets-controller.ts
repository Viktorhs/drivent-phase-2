import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes( req: AuthenticatedRequest, res: Response) {
  try {
    const TicketsTypes = await ticketsService.listAllTicktesTypes();
    console.log(TicketsTypes);
    return res.status(httpStatus.OK).send(TicketsTypes);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT).send({});
  }
}
