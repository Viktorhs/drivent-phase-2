import { prisma } from "@/config";

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

const ticketsRepository = {
  findTicketsTypes,
  findUserTicketsByEnrollmentId
};

export default ticketsRepository;
