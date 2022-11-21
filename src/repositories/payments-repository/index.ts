import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function insertOnePayment(information: Omit<Payment, "id" | "createdAt" | "updatedAt">) {
  return prisma.payment.create({
    data: information
  });
}

function updateStatusPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

const paymentsRepository = {
  findPaymentByTicketId,
  insertOnePayment,
  updateStatusPayment
};

export default paymentsRepository;
