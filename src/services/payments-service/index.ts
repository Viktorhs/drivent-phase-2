import { PaymentEntity } from "./../../protocols";
import { Payment } from "@prisma/client";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function listPaymentTicket(ticketId: number, userId: number) {
  const isValidticket = await ticketsRepository.findUserTicketsByTicketId(ticketId);
 
  if( !isValidticket ) {
    throw notFoundError();
  }
  if( isValidticket.Enrollment.userId !== userId ) {
    throw unauthorizedError();
  }
  
  return await paymentsRepository.findPaymentByTicketId(ticketId);
}

async function InsertPayment(informations: PaymentEntity, userId: number) {
  const isValidticket = await ticketsRepository.findUserTicketsByTicketId(informations.ticketId);
  
  if( !isValidticket ) {
    throw notFoundError();
  }
  if( isValidticket.Enrollment.userId !== userId ) {
    throw unauthorizedError();
  }
  const cardLastDigits: string = informations.cardData.number.toString().slice(-4); 
  const paymentData: Omit<Payment, "id" | "createdAt" | "updatedAt"> =
  {
    ticketId: informations.ticketId,
    value: isValidticket.TicketType.price,
    cardIssuer: informations.cardData.issuer,
    cardLastDigits: cardLastDigits,
  };

  const ticket = await paymentsRepository.insertOnePayment(paymentData);
  await paymentsRepository.updateStatusPayment(informations.ticketId);

  return ticket;
}

const paymentsService = {
  listPaymentTicket,
  InsertPayment
};
  
export default paymentsService;
