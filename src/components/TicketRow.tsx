import type { Ticket } from "@/types/Ticket";
import { TicketModal } from "./TicketModal";
import { useLocation } from "react-router";

interface TicketRowProps {
  ticket: Ticket;
}

export function TicketRow({ ticket }: TicketRowProps) {
  // Get current location to determine if we're in agent or client view
  const location = useLocation();
  const isAgentView = location.pathname === "/agent";

  // Function to get status-based styling for the status badge
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CLOSED":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Function to get priority-based styling for the entire row
  const getRowStyle = (status: string) => {
    switch (status) {
      case "OPEN":
        return "border-l-4 border-l-yellow-400 bg-yellow-50/30";
      case "IN_PROGRESS":
        return "border-l-4 border-l-blue-400 bg-blue-50/30";
      case "CLOSED":
        return "border-l-4 border-l-green-400 bg-green-50/30";
      default:
        return "border-l-4 border-l-gray-400";
    }
  };

  return (
    <>
      {/* Desktop/Tablet Layout */}
      <div className={`hidden sm:flex justify-between items-center p-4 rounded-lg shadow-sm border bg-white hover:shadow-md transition-shadow duration-200 ${getRowStyle(ticket.status)}`}>
        {/* Left side: Ticket information */}
        <div className="flex-1 space-y-1">
          {/* Ticket title with truncation for long titles */}
          <h3 className="font-semibold text-gray-900 truncate max-w-xs">
            {ticket.title}
          </h3>
          
          {/* Ticket ID and creation info */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
              #{ticket.id}
            </span>
            
            {/* Status badge with color coding */}
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(ticket.status)}`}>
              {ticket.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Right side: Action button */}
        <div className="ml-4">
          <TicketModal key={ticket.id} ticket={ticket}/>
        </div>
      </div>

      {/* Mobile Layout - Card Style */}
      <div className={`sm:hidden bg-white rounded-lg shadow-sm border p-4 space-y-3 ${getRowStyle(ticket.status)}`}>
        {/* Header with title and status */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {ticket.title}
            </h3>
          </div>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusStyle(ticket.status)}`}>
            {ticket.status.replace('_', ' ')}
          </span>
        </div>

        {/* Ticket ID */}
        <div className="flex items-center">
          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">
            #{ticket.id}
          </span>
        </div>

        {/* Action button - Full width on mobile */}
        <div className="pt-2">
          <TicketModal key={ticket.id} ticket={ticket}/>
        </div>
      </div>
    </>
  );
}
