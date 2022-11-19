import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getTicketsTypes( req: AuthenticatedRequest, res: Response) {
  try {
    const TicketsTypes = await ticketsService.listAllTicketsTypes();
    return res.status(httpStatus.OK).send(TicketsTypes);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT).send({});
  }
}

export async function getUserTickets( req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const userTikctes = await ticketsService.listUserTickets(userId);

    return res.status(httpStatus.OK).send(userTikctes);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
