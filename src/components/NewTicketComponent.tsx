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
            <DialogTrigger asChild className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                <Button variant="outline">Open a ticket</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create new ticket</DialogTitle>
                        <DialogDescription>
                            Complete your ticket. Click "send" when it's done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">

                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="ticketTitle">Title</Label>
                            <Input id="ticketTitle" name="ticket_title" required disabled={isLoading} />
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="ticketDescription">Description</Label>
                            <Textarea placeholder="Type your message here." id="ticketDescription" name="ticket_description" className="min-h-32" required disabled={isLoading} />
                        </div>

                        {/* <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="ticketStatus">Status</Label>
                            <Input id="ticketStatus" name="ticket_status" defaultValue={"open"} disabled className="uppercase"/>
                        </div> */}

                        {/* <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="ticketSolution">Solution</Label>
                            <Input disabled id="ticketSolution" name="ticket_solution" />
                        </div> */}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isLoading}>
                                Cancel
                            </Button>
                        </DialogClose>
                        {/* Don't put "submit" button between DialogClose tags */}
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}