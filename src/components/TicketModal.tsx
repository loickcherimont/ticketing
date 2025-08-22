// TicketModal.tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import type { Ticket } from "@/types/Ticket";
import { useLocation } from "react-router";
import { TicketModalClient } from "./client/TicketModalClient";
import { TicketModalAgent } from "./agent/TicketModalAgent";

interface TicketModalProps {
    ticket: Ticket;
}

export function TicketModal({ ticket }: TicketModalProps) {
    // Get current location to determine if we're in agent or client view
    const location = useLocation();
    const isAgentView = location.pathname === "/agent";

    // Function to get status-based styling for the modal title
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "OPEN":
                return "text-yellow-600";
            case "IN_PROGRESS":
                return "text-blue-600";
            case "CLOSED":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <Dialog>
            {/* Trigger button with responsive styling */}
            <DialogTrigger className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 sm:w-auto w-full justify-center">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="sm:inline hidden">View Details</span>
                <span className="sm:hidden">View</span>
            </DialogTrigger>
            
            {/* Modal content with responsive sizing */}
            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto sm:w-full">
                <DialogHeader className="border-b pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                                Ticket #{ticket.id}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600 mt-1">
                                {isAgentView ? "Agent View - Manage Ticket" : "Customer View - Ticket Details"}
                            </DialogDescription>
                        </div>
                        
                        {/* Status badge in header - responsive positioning */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium border flex-shrink-0 ${getStatusStyle(ticket.status)}`}>
                            <span className="sm:inline hidden">{ticket.status.replace('_', ' ')}</span>
                            <span className="sm:hidden">{ticket.status.split('_')[0]}</span>
                        </div>
                    </div>
                </DialogHeader>
                
                {/* Render appropriate modal content based on view */}
                <div className="py-4">
                    {isAgentView ? (
                        <TicketModalAgent ticket={ticket} />
                    ) : (
                        <TicketModalClient ticket={ticket} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
