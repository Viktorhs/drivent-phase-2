import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findUserTicketsByEnrollmentId(id: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id
    },
    include: {
      TicketType: true
    }
  });
}

async function insertOneTicket(ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) {
  return prisma.ticket.create({
    data: ticket
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findUserTicketsByEnrollmentId,
  insertOneTicket
};

export default ticketsRepository;
