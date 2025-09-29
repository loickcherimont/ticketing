import type { Ticket } from "@/types/Ticket";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

// Beginner note: a "callback" is a function passed from a parent component.
// We call it to notify the parent when something happens here (a ticket is created).
type NewTicketProps = {
    onCreated: (ticket: Ticket) => void;
}

export function NewTicketComponent({ onCreated }: NewTicketProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const created = await createTicket(formData);

        setIsLoading(false);

        // Open dialog only if the creation is successful
        if (created) {
            // Notify parent so it can update its list immediately
            onCreated(created);
            setOpen(false);
            event.currentTarget.reset();
        }
    }

    // Beginner note: talks to the server to create the ticket.
    // Returns the created Ticket (with id) or null if it fails.
    const createTicket = async (formData: FormData): Promise<Ticket | null> => {
        console.log("Begin: createTicket function")
        const newTicket: Omit<Ticket, "id"> = {
            // id: Date.now(),
            title: formData.get("ticket_title") as string,
            description: formData.get("ticket_description") as string,
            status: "OPEN",
            solution: "",
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTicket),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }
            const data: Ticket = await response.json();
            console.log("Success:", data);
            return data;
        } catch (err: any) {
            // setError(err.message || "Something went wrong");
            console.error("From NewTicketComponent: ", err);
            return null;
        } finally {
            console.log("End for createTicket function.")
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-auto px-4 py-2 text-white rounded-md text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 sm:text-base">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {/* <span className="sm:inline hidden">Open a ticket</span> */}
                    <span>Open a ticket</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto sm:w-full">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">Create new ticket</DialogTitle>
                        <DialogDescription className="text-sm">
                            Complete your ticket. Click "send" when it's done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="ticketTitle" className="text-sm font-medium">Title</Label>
                            <Input
                                id="ticketTitle"
                                name="ticket_title"
                                required
                                disabled={isLoading}
                                className="text-sm sm:text-base"
                                placeholder="Brief description of your issue"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="ticketDescription" className="text-sm font-medium">Description</Label>
                            <Textarea
                                placeholder="Type your message here. Be as detailed as possible..."
                                id="ticketDescription"
                                name="ticket_description"
                                className="min-h-24 sm:min-h-32 text-sm sm:text-base resize-none"
                                required
                                disabled={isLoading}
                            />
                        </div>

                    </div>
                    <DialogFooter style={{ justifyContent: "space-around", }}>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                type="button"
                                disabled={isLoading}
                                className="w-32 text-sm cursor-pointer sm:text-base"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        {/* Don't put "submit" button between DialogClose tags */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-32 text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 sm:text-base"
                        >
                            {isLoading ? "Sending..." : "Send"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}