import { notFoundError } from "@/errors";
import { TicketsType } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

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

const ticketsService = {
  listAllTicketsTypes,
  listUserTickets
};
  
export default ticketsService;
