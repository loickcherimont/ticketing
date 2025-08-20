import type { Ticket } from "@/types/Ticket";
import { TicketModal } from "./TicketModal";

interface TicketRowProps {
  ticket: Ticket;
}

export function TicketRow({ ticket }: TicketRowProps) {
  return (
    <div className="flex justify-between items-center p-3 rounded-md shadow-sm border bg-white w-96">
      <span className="font-medium">{ticket.title}</span>
      <div className="flex gap-4 text-sm text-gray-600">
        <span>ID: {ticket.id}</span>
        <span>Status: {ticket.status}</span>
        <TicketModal key={ticket.id} ticket={ticket}/>
      </div>
    </div>
  );
}
