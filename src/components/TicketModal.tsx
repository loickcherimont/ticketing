// TicketModal.tsx
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import type { Ticket } from "@/types/Ticket";

interface TicketModalProps {
    ticket: Ticket;
}

export function TicketModal({ ticket }: TicketModalProps) {
    return (
        <Dialog>
            <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>Ticket #{ticket.id}</DialogTitle>
                    <DialogDescription>
                        Details 
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="ticketTitle">Title</Label>
                        <Input value={ticket.title} disabled id="ticketTitle"/>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="ticketDescription">Description</Label>
                        <Textarea placeholder="Type your message here." value={ticket.description} disabled id="ticketDescription" className="min-h-32"/>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="ticketStatus">Status</Label>
                        <Input value={ticket.status} disabled id="ticketStatus"/>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <Label htmlFor="ticketSolution">Solution</Label>
                        <Input value={ticket.solution || "—"} disabled id="ticketSolution"/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
