import type { Ticket } from "@/types/Ticket"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useTickets } from "@/hooks/useTickets";
import { useState } from "react";

// Interface defining the props that this component receives
interface TicketModalAgentProps {
    ticket: Ticket;
}

// Main component for agent ticket management
export function TicketModalAgent({ ticket }: TicketModalAgentProps) {
    // Hook to access ticket management functions (refresh, etc.)
    const { refreshTickets } = useTickets();
    
    // State to track if we're currently processing a request
    const [isProcessing, setIsProcessing] = useState(false);

    // Function to handle setting ticket status to "IN_PROGRESS"
    const handleSetInProgress = async () => {
        try {
            // Set processing state to show loading
            setIsProcessing(true);
            
            // Make API call to update ticket status to IN_PROGRESS
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/tickets/${ticket.id}/in-progress`, { 
                method: "PATCH" 
            });
            
            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to set ticket in progress");
            }
            
            // Refresh the ticket list to show updated data
            await refreshTickets();
            
            // Close the modal by triggering the close button
            const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
            if (closeButton) {
                closeButton.click();
            }
            
        } catch (error) {
            // Log any errors that occur during the process
            console.error("Error setting ticket in progress:", error);
        } finally {
            // Always reset processing state
            setIsProcessing(false);
        }
    }

    // React 19.1 form action function to handle ticket solving
    // This function is called when the form is submitted
    const handleSolveTicket = async (formData: FormData) => {
        try {
            // Set processing state to show loading
            setIsProcessing(true);
            
            // Get the solution text from the form data
            const solution = formData.get('solution') as string;
            
            // Make API call to solve the ticket (set status to CLOSED and add solution)
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/tickets/${ticket.id}/solve`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ solution })
            });
            
            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Failed to solve ticket");
            }
            
            // Refresh the ticket list to show updated data
            await refreshTickets();
            
            // Close the modal by triggering the close button
            const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
            if (closeButton) {
                closeButton.click();
            }
            
        } catch (error) {
            // Log any errors that occur during the process
            console.error("Error solving ticket:", error);
        } finally {
            // Always reset processing state
            setIsProcessing(false);
        }
    }

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
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header with agent identification */}
            <div className="border-b pb-3 sm:pb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Agent Dashboard</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage and resolve customer tickets</p>
            </div>

            {/* Main form for ticket management */}
            <form className="space-y-4 sm:space-y-6" action={handleSolveTicket}>
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
                        Customer Description
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

                {/* Solution Input Section */}
                <div className="space-y-2">
                    <Label htmlFor="ticketSolution" className="text-sm font-medium text-gray-700">
                        Solution / Resolution
                    </Label>
                    <Textarea 
                        placeholder="Provide a detailed solution or resolution for this ticket..." 
                        name="solution"
                        defaultValue={ticket.solution} 
                        id="ticketSolution" 
                        className="min-h-24 sm:min-h-32 resize-none text-sm sm:text-base"
                        required
                    />
                    <p className="text-xs text-gray-500">
                        This solution will be sent to the customer when the ticket is closed.
                    </p>
                </div>

                {/* Action Buttons Section - Responsive layout */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    {/* Set In Progress Button */}
                    <DialogClose asChild>
                        <Button 
                            type="button"
                            variant={"outline"}
                            className="flex-1 cursor-pointer text-sm py-2 sm:py-2 sm:text-base"
                            onClick={handleSetInProgress}
                            disabled={isProcessing || ticket.status === "IN_PROGRESS"}
                        >
                            {isProcessing ? "Processing..." : "Set In Progress"}
                        </Button>
                    </DialogClose>
                    
                    {/* Solve Ticket Button */}
                    <Button 
                        type="submit"
                        className="flex-1 cursor-pointer bg-green-600 hover:bg-green-500 text-white text-sm sm:text-base py-2 sm:py-2"
                        disabled={isProcessing || ticket.status === "CLOSED"}
                    >
                        {isProcessing ? "Processing..." : "Solve Ticket"}
                    </Button>
                </div>
            </form>
        </div>
    )
}