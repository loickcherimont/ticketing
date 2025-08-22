import type { Ticket } from "@/types/Ticket"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface TicketModalClientProps {
    ticket: Ticket;
}

export function TicketModalClient({ ticket }: TicketModalClientProps) {
    // Function to get status-based styling
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

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header with customer identification */}
            <div className="border-b pb-3 sm:pb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ticket Details</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">View your support ticket information</p>
            </div>

            {/* Ticket Title Section */}
            <div className="space-y-2">
                <Label htmlFor="ticketTitle" className="text-sm font-medium text-gray-700">
                    Ticket Title
                </Label>
                <Input 
                    value={ticket.title} 
                    disabled 
                    id="ticketTitle"
                    className="bg-gray-50 border-gray-200 text-gray-900 text-sm sm:text-base"
                />
            </div>

            {/* Ticket Description Section */}
            <div className="space-y-2">
                <Label htmlFor="ticketDescription" className="text-sm font-medium text-gray-700">
                    Your Description
                </Label>
                <Textarea 
                    value={ticket.description} 
                    disabled 
                    id="ticketDescription" 
                    className="min-h-24 sm:min-h-32 bg-gray-50 border-gray-200 text-gray-900 resize-none text-sm sm:text-base"
                />
            </div>

            {/* Current Status Section with color coding */}
            <div className="space-y-2">
                <Label htmlFor="ticketStatus" className="text-sm font-medium text-gray-700">
                    Current Status
                </Label>
                <div className={`px-3 py-2 rounded-md border text-sm font-medium ${getStatusStyle(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                </div>
            </div>

            {/* Solution Section - Only show if there's a solution */}
            {ticket.solution && (
                <div className="space-y-2">
                    <Label htmlFor="ticketSolution" className="text-sm font-medium text-gray-700">
                        Agent Response
                    </Label>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                        <p className="text-sm text-blue-900 whitespace-pre-wrap leading-relaxed">
                            {ticket.solution}
                        </p>
                    </div>
                    <p className="text-xs text-gray-500">
                        This is the response from our support team.
                    </p>
                </div>
            )}

            {/* Status-specific messages */}
            {ticket.status === "OPEN" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 sm:p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Ticket Received</h3>
                            <p className="mt-1 text-xs sm:text-sm text-yellow-700">
                                Your ticket has been received and is waiting to be assigned to an agent.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {ticket.status === "IN_PROGRESS" && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">In Progress</h3>
                            <p className="mt-1 text-xs sm:text-sm text-blue-700">
                                An agent is currently working on your ticket. You'll receive a response soon.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {ticket.status === "CLOSED" && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 sm:p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Resolved</h3>
                            <p className="mt-1 text-xs sm:text-sm text-green-700">
                                Your ticket has been resolved. If you need further assistance, please create a new ticket.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 