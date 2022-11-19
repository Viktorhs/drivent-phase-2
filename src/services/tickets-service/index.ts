import { notFoundError } from "@/errors";
import { TicketsType } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Ticket } from "@prisma/client";

async function listAllTicketsTypes(): Promise<TicketsType[]> {
  const tickets = await ticketsRepository.findTicketsTypes();
  return tickets;
}

async function listUserTickets(userId: number) {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollmentId.id) {
    throw notFoundError();
  }

  const tickets = await ticketsRepository.findUserTicketsByEnrollmentId(enrollmentId.id);

  if ( !tickets ) {
    throw notFoundError();
  }

  return tickets;
}

async function storeAndListTicket(userId: number, ticketTypeId: number) {
  const enrollmentId = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollmentId.id) {
    throw notFoundError();
  }
  
  const storeTicket: Omit<Ticket, "id" | "createdAt" | "updatedAt"> ={
    status: "RESERVED",
    ticketTypeId,
    enrollmentId: enrollmentId.id
  };
  
  await ticketsRepository.insertOneTicket(storeTicket);

  return await ticketsRepository.findUserTicketsByEnrollmentId(enrollmentId.id);
}

const ticketsService = {
  listAllTicketsTypes,
  listUserTickets,
  storeAndListTicket
};
  
export default ticketsService;
