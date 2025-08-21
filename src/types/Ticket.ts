export type Ticket = {
    id: number;
    title: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "CLOSED";
    solution: string;
};
