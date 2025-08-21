import { NewTicketComponent } from './components/NewTicketComponent';
import { TicketRow } from './components/TicketRow'
import { useTickets } from './hooks/useTickets';

function App() {

  const { tickets, loading, error, addTicket } = useTickets();

  return (
    <>
     <div className="p-8">
       <NewTicketComponent onCreated={addTicket} />
     </div>
      {loading && <div className="p-8">Loading tickets...</div>}
      {error && <div className="p-8 text-red-500">Error: {error}</div>}
      {!loading && !error && tickets.length === 0 && (
        <div className="p-8 text-gray-500">No tickets found</div>
      )}
      {!loading && !error && tickets.length > 0 && (
        <div className="p-8 flex flex-col gap-2">
          {tickets.map((ticket) => (<TicketRow key={ticket.id} ticket={ticket} />))}
        </div>
      )}
    </>
  )
}

export default App
