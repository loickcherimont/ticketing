import { TicketModal } from './components/TicketModal';
import { TicketRow } from './components/TicketRow'
import { useTickets } from './hooks/useTickets';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function App() {

  const { tickets, loading, error } = useTickets();

  // refacto: use Skeleton for loading
  if (loading) return <div className="p-8">Loading tickets...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (tickets.length === 0) return <div className="p-8 text-gray-500">No tickets found</div>;



  return (
    <>
      <div className="p-8 flex flex-col gap-2">
        {tickets.map((ticket) => (<TicketRow key={ticket.id} ticket={ticket} />))}
      </div>      
    </>
  )
}

export default App
