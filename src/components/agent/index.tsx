import { useTickets } from "@/hooks/useTickets";
import { TicketRow } from "../TicketRow";
import { useState, useEffect } from "react";

export function Agent() {
    // Hook to access ticket management functions
    const { tickets, loading, error, refreshTickets } = useTickets();
    
    // State to track if we need to refresh the list
    const [refreshed, setRefreshed] = useState(false);
    
    // State for mobile sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Effect to refresh tickets when needed
    useEffect(() => {
        if (refreshed) {
            refreshTickets();
            setRefreshed(false);
        }
    }, [refreshed, refreshTickets]);

    // Function to get count of tickets by status
    const getTicketCountByStatus = (status: string) => {
        return tickets.filter(ticket => ticket.status === status).length;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Header with Hamburger Menu */}
            <div className="lg:hidden bg-white shadow-sm border-b">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="ml-3 text-xl font-bold text-gray-900">Agent Dashboard</h1>
                        </div>
                        <button
                            onClick={() => setRefreshed(true)}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
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
                                <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Manage and resolve customer support tickets
                                </p>
                            </div>
                            
                            {/* Status Summary Cards - Desktop */}
                            <div className="flex gap-4">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                                    <div className="text-2xl font-bold text-yellow-800">
                                        {getTicketCountByStatus("OPEN")}
                                    </div>
                                    <div className="text-xs text-yellow-600">Open</div>
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                                    <div className="text-2xl font-bold text-blue-800">
                                        {getTicketCountByStatus("IN_PROGRESS")}
                                    </div>
                                    <div className="text-xs text-blue-600">In Progress</div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                                    <div className="text-2xl font-bold text-green-800">
                                        {getTicketCountByStatus("CLOSED")}
                                    </div>
                                    <div className="text-xs text-green-600">Closed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-40">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {/* Mobile Status Summary */}
                                <div className="space-y-3 px-3">
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                        <div className="text-xl font-bold text-yellow-800">
                                            {getTicketCountByStatus("OPEN")}
                                        </div>
                                        <div className="text-xs text-yellow-600">Open Tickets</div>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <div className="text-xl font-bold text-blue-800">
                                            {getTicketCountByStatus("IN_PROGRESS")}
                                        </div>
                                        <div className="text-xs text-blue-600">In Progress</div>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <div className="text-xl font-bold text-green-800">
                                            {getTicketCountByStatus("CLOSED")}
                                        </div>
                                        <div className="text-xs text-green-600">Closed</div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

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
                            <div className="text-xs text-green-600">Closed</div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading tickets...</p>
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
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets found</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new ticket.</p>
                    </div>
                )}

                {/* Tickets List */}
                {!loading && !error && tickets.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">
                                All Tickets ({tickets.length})
                            </h2>
                            <button
                                onClick={() => setRefreshed(true)}
                                className="hidden sm:inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>
                            <button
                                onClick={() => setRefreshed(true)}
                                className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
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