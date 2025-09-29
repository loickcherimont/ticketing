import { useTickets } from "@/hooks/useTickets";
import { NewTicketComponent } from "../NewTicketComponent";
import { TicketRow } from "../TicketRow";
import { useState } from "react";

export function Client() {
    // Hook to access ticket management functions
    const { tickets, loading, error, addTicket } = useTickets();
    
    // State for mobile create ticket toggle
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Function to get count of tickets by status
    const getTicketCountByStatus = (status: string) => {
        return tickets.filter(ticket => ticket.status === status).length;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm border-b">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Customer Support</h1>
                            <p className="text-sm text-gray-600">Create and track tickets</p>
                        </div>
                        <button
                            onClick={() => setIsCreateOpen(!isCreateOpen)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Ticket
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Create and track your support tickets
                                </p>
                            </div>
                            
                            {/* Status Summary Cards - Desktop */}
                            <div className="flex gap-4">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 lg:w-32">
                                    <div className="text-2xl font-bold text-yellow-800">
                                        {getTicketCountByStatus("OPEN")}
                                    </div>
                                    <div className="text-xs text-yellow-600">Open</div>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 lg:w-32">
                                    <div className="text-2xl font-bold text-blue-800">
                                        {getTicketCountByStatus("IN_PROGRESS")}
                                    </div>
                                    <div className="text-xs text-blue-600">In Progress</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 lg:w-32">
                                    <div className="text-2xl font-bold text-green-800">
                                        {getTicketCountByStatus("CLOSED")}
                                    </div>
                                    <div className="text-xs text-green-600">Resolved</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
                {/* Mobile Status Summary - Horizontal Cards */}
                <div className="lg:hidden mb-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-yellow-800">
                                {getTicketCountByStatus("OPEN")}
                            </div>
                            <div className="text-xs text-yellow-600">Open</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-blue-800">
                                {getTicketCountByStatus("IN_PROGRESS")}
                            </div>
                            <div className="text-xs text-blue-600">Progress</div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-green-800">
                                {getTicketCountByStatus("CLOSED")}
                            </div>
                            <div className="text-xs text-green-600">Resolved</div>
                        </div>
                    </div>
                </div>

                {/* Create New Ticket Section - Mobile Collapsible */}
                <div className="lg:hidden mb-6">
                    {isCreateOpen && (
                        <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900">Create New Ticket</h2>
                                <button
                                    onClick={() => setIsCreateOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <NewTicketComponent onCreated={addTicket} />
                        </div>
                    )}
                </div>

                {/* Create New Ticket Section - Desktop */}
                <div className="hidden lg:block mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Create New Ticket</h2>
                        <NewTicketComponent onCreated={addTicket} />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading your tickets...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading tickets</h3>
                                <p className="mt-1 text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && tickets.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {isCreateOpen ? "Fill out the form above to create your first ticket." : "Tap 'New Ticket' to create your first support ticket."}
                        </p>
                    </div>
                )}

                {/* Tickets List */}
                {!loading && !error && tickets.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">
                                Your Tickets ({tickets.length})
                            </h2>
                        </div>
                        
                        <div className="grid gap-4">
                            {tickets.map((ticket) => (
                                <TicketRow key={ticket.id} ticket={ticket} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}