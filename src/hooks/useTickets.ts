import type { Ticket } from "@/types/Ticket";
import { useEffect, useState } from "react";

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTickets = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_API}/tickets`);
                if (!response.ok) throw new Error("Server not found");
                const data: Ticket[] = await response.json();
                setTickets(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        loadTickets();
    }, []);

    return { tickets, loading, error }
}