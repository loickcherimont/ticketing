import type { Ticket } from "@/types/Ticket";
import { useEffect, useState } from "react";

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load all tickets once on mount
    useEffect(() => {
        void refreshTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Reload tickets from the server.
     * Useful if you need to hard-refresh the list.
     */
    const refreshTickets = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/tickets`);
            if (!response.ok) throw new Error("Server not found");
            const data: Ticket[] = await response.json();
            setTickets(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Add a newly created ticket to the local React state immediately.
     * This lets the UI update without waiting for a full reload.
     */
    const addTicket = (ticket: Ticket) => {
        setTickets((currentTickets) => [ticket, ...currentTickets]);
    };

    return { tickets, loading, error, addTicket, refreshTickets };
}