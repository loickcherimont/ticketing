// import { NewTicketComponent } from './components/NewTicketComponent';
// import { TicketRow } from './components/TicketRow'
// import { useTickets } from './hooks/useTickets';

import { Route, Routes, Link, useLocation } from "react-router";
import { Client } from "./components/client";
import { Agent } from "./components/agent";
import { Error } from "./components/Error";

// export function App() {

//   const { tickets, loading, error, addTicket } = useTickets();

//   return (
//     <>
//      <div className="p-8">
//        <NewTicketComponent onCreated={addTicket} />
//      </div>
//       {loading && <div className="p-8">Loading tickets...</div>}
//       {error && <div className="p-8 text-red-500">Error: {error}</div>}
//       {!loading && !error && tickets.length === 0 && (
//         <div className="p-8 text-gray-500">No tickets found</div>
//       )}
//       {!loading && !error && tickets.length > 0 && (
//         <div className="p-8 flex flex-col gap-2">
//           {tickets.map((ticket) => (<TicketRow key={ticket.id} ticket={ticket} />))}
//         </div>
//       )}
//     </>
//   )
// }

// Responsive Navigation Component
function Navigation() {
    const location = useLocation();
    
    return (
        <nav className="bg-white shadow-sm border-b lg:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-8">
                    <Link
                        to="/"
                        className={`inline-flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                            location.pathname === "/"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer
                    </Link>
                    <Link
                        to="/agent"
                        className={`inline-flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                            location.pathname === "/agent"
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Agent
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navigation /> */}
      <Routes>
        <Route path="/customer" element={<Client />}/>
        <Route path="/agent" element={<Agent />}/>
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  )
}

