import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";

async function listPaymentTicket(ticketId: number, userId: number) {
  const ticket = await paymentsRepository.findPaymentByTicketId(ticketId);

  if( !ticket ) {
    throw notFoundError;
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if( userId !== enrollment.userId ) {
    throw unauthorizedError;
  } 

  return ticket;
}

const paymentsService = {
  listPaymentTicket
};
  
export default paymentsService;
