import { TicketsType } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";

async function listAllTicktesTypes(): Promise<TicketsType[]> {
  const tickets = await ticketsRepository.findTicketsTypes();
  return tickets;
}

const ticketsService = {
  listAllTicktesTypes
};
  
export default ticketsService;
