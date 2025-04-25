// src/pages/ShowtimesPage.jsx
import React, { useState } from 'react';
import {
    Search,
    Edit,
    MoreVertical,
    Filter,
    Plus,
    Calendar,
    Clock,
    DollarSign,
    Film,
    Building
} from 'lucide-react';

const ShowtimesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cinemaFilter, setCinemaFilter] = useState('All Cinemas');
    const [theaterFilter, setTheaterFilter] = useState('All Theaters');
    const [movieFilter, setMovieFilter] = useState('All Movies');
    const [dateFilter, setDateFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('All Prices');
    const [timeFilter, setTimeFilter] = useState('All Times');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [showFilters, setShowFilters] = useState(false);

    // Sample cinema data
    const cinemas = [
        { id: 1, name: 'CGV Cinema' },
        { id: 2, name: 'Galaxy Cinema' },
        { id: 3, name: 'Lotte Cinema' },
    ];

    // Sample theater data
    const theaters = [
        { id: 1, name: 'Cineplex Downtown', cinema: 'CGV Cinema' },
        { id: 2, name: 'MovieMax Central', cinema: 'Galaxy Cinema' },
        { id: 3, name: 'Starlight Cinema', cinema: 'Lotte Cinema' }
    ];

    // Sample movie data
    const movies = [
        { id: 1, name: 'Space Adventure 3' },
        { id: 2, name: 'The Last Symphony' },
        { id: 3, name: 'Midnight in Tokyo' }
    ];

    // Sample showtime data
    const showtimes = [
        {
            id: 1,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            cinema: 'CGV Cinema',
            room: 'Room 1',
            date: '2025-01-15',
            time: '10:00',
            status: 'On Sale',
            price: 12.50,
            capacity: 120,
            soldTickets: 38
        },
        {
            id: 2,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            cinema: 'CGV Cinema',
            room: 'Room 1',
            date: '2025-01-15',
            time: '14:30',
            status: 'On Sale',
            price: 12.50,
            capacity: 120,
            soldTickets: 62
        },
        {
            id: 3,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            cinema: 'CGV Cinema',
            room: 'Room 1',
            date: '2025-01-15',
            time: '18:00',
            status: 'On Sale',
            price: 15.00,
            capacity: 120,
            soldTickets: 95
        },
        {
            id: 4,
            movie: 'Midnight in Tokyo',
            theater: 'MovieMax Central',
            cinema: 'Galaxy Cinema',
            room: 'Hall A',
            date: '2025-02-28',
            time: '12:15',
            status: 'On Sale',
            price: 10.00,
            capacity: 150,
            soldTickets: 38
        },
        {
            id: 5,
            movie: 'Midnight in Tokyo',
            theater: 'MovieMax Central',
            cinema: 'Galaxy Cinema',
            room: 'Hall A',
            date: '2025-02-28',
            time: '17:45',
            status: 'On Sale',
            price: 12.50,
            capacity: 150,
            soldTickets: 95
        },
        {
            id: 6,
            movie: 'The Last Symphony',
            theater: 'Starlight Cinema',
            cinema: 'Lotte Cinema',
            room: 'Theater 1',
            date: '2025-03-10',
            time: '13:00',
            status: 'Coming Soon',
            price: 12.00,
            capacity: 120,
            soldTickets: 0
        },
        {
            id: 7,
            movie: 'The Last Symphony',
            theater: 'Starlight Cinema',
            cinema: 'Lotte Cinema',
            room: 'Theater 1',
            date: '2025-03-10',
            time: '16:30',
            status: 'Coming Soon',
            price: 12.00,
            capacity: 120,
            soldTickets: 0
        },
        {
            id: 8,
            movie: 'The Last Symphony',
            theater: 'Starlight Cinema',
            cinema: 'Lotte Cinema',
            room: 'Theater 1',
            date: '2025-03-10',
            time: '20:00',
            status: 'Coming Soon',
            price: 15.00,
            capacity: 120,
            soldTickets: 0
        }
    ];

    // Price ranges
    const priceRanges = [
        'All Prices',
        'Under $10',
        '$10 - $15',
        'Over $15'
    ];

    // Time ranges
    const timeRanges = [
        'All Times',
        'Morning (before 12PM)',
        'Afternoon (12PM-5PM)',
        'Evening (after 5PM)'
    ];

    // Status options
    const statusOptions = [
        'All Status',
        'On Sale',
        'Coming Soon',
        'Sold Out',
        'Cancelled'
    ];

    // Filter showtimes based on search query and filters
    const filteredShowtimes = showtimes.filter((showtime) => {
        // Filter by cinema
        if (cinemaFilter !== 'All Cinemas' && showtime.cinema !== cinemaFilter) {
            return false;
        }

        // Filter by theater
        if (theaterFilter !== 'All Theaters' && showtime.theater !== theaterFilter) {
            return false;
        }

        // Filter by movie
        if (movieFilter !== 'All Movies' && showtime.movie !== movieFilter) {
            return false;
        }

        // Filter by date
        if (dateFilter && showtime.date !== dateFilter) {
            return false;
        }

        // Filter by price
        if (priceFilter !== 'All Prices') {
            if (priceFilter === 'Under $10' && showtime.price >= 10) {
                return false;
            } else if (priceFilter === '$10 - $15' && (showtime.price < 10 || showtime.price > 15)) {
                return false;
            } else if (priceFilter === 'Over $15' && showtime.price <= 15) {
                return false;
            }
        }

        // Filter by time of day
        if (timeFilter !== 'All Times') {
            const [hours] = showtime.time.split(':').map(Number);
            
            if (timeFilter === 'Morning (before 12PM)' && hours >= 12) {
                return false;
            } else if (timeFilter === 'Afternoon (12PM-5PM)' && (hours < 12 || hours >= 17)) {
                return false;
            } else if (timeFilter === 'Evening (after 5PM)' && hours < 17) {
                return false;
            }
        }

        // Filter by status
        if (statusFilter !== 'All Status' && showtime.status !== statusFilter) {
            return false;
        }

        // Filter by search term
        if (searchQuery) {
            return (
                showtime.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
                showtime.theater.toLowerCase().includes(searchQuery.toLowerCase()) ||
                showtime.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                showtime.cinema.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return true;
    });

    // Function to determine status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'On Sale':
                return 'bg-green-100 text-green-800';
            case 'Coming Soon':
                return 'bg-yellow-100 text-yellow-800';
            case 'Sold Out':
                return 'bg-red-100 text-red-800';
            case 'Cancelled':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get unique dates for date filter
    const uniqueDates = [...new Set(showtimes.map(showtime => showtime.date))].sort();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Showtimes</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add Showtime</span>
                </button>
            </div>

            {/* Basic Filters */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Cinema:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={cinemaFilter}
                        onChange={(e) => setCinemaFilter(e.target.value)}
                    >
                        <option>All Cinemas</option>
                        {cinemas.map(cinema => (
                            <option key={cinema.id}>{cinema.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Theater:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={theaterFilter}
                        onChange={(e) => setTheaterFilter(e.target.value)}
                    >
                        <option>All Theaters</option>
                        {theaters
                            .filter(theater => cinemaFilter === 'All Cinemas' || theater.cinema === cinemaFilter)
                            .map((theater, index) => (
                                <option key={index}>{theater.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Date:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="">All Dates</option>
                        {uniqueDates.map((date, index) => (
                            <option key={index} value={date}>
                                {new Date(date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center ml-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search showtimes..."
                            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        className="ml-2 bg-white border border-gray-300 px-3 py-1.5 rounded-md"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
                <div className="bg-white p-4 rounded-md shadow mb-6">
                    <h2 className="text-sm font-medium text-gray-700 mb-3">Advanced Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Movie
                            </label>
                            <select
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={movieFilter}
                                onChange={(e) => setMovieFilter(e.target.value)}
                            >
                                <option>All Movies</option>
                                {movies.map(movie => (
                                    <option key={movie.id}>{movie.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price Range
                            </label>
                            <select
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                            >
                                {priceRanges.map((range, index) => (
                                    <option key={index}>{range}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Time of Day
                            </label>
                            <select
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                {timeRanges.map((range, index) => (
                                    <option key={index}>{range}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statusOptions.map((status, index) => (
                                    <option key={index}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Showtimes Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Movie
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cinema/Theater
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Room
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Capacity
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredShowtimes.map((showtime) => (
                            <tr key={showtime.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Film className="text-blue-500 h-4 w-4 mr-2" />
                                        <span className="text-sm font-medium text-gray-900">
                                            {showtime.movie}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {showtime.theater}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {showtime.cinema}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {showtime.room}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                        <span className="text-sm text-gray-900">
                                            {new Date(showtime.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                    {showtime.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                                        <span className="text-sm text-gray-900">
                                            {showtime.price.toFixed(2)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(showtime.status)}`}
                                    >
                                        {showtime.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{
                                                width: `${(showtime.soldTickets / showtime.capacity) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span>
                                        {showtime.soldTickets}/{showtime.capacity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-md mr-2">
                                        <Edit size={16} />
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-md">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredShowtimes.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No showtimes found matching your criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span>{' '}
                                to{' '}
                                <span className="font-medium">
                                    {filteredShowtimes.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {showtimes.length}
                                </span>{' '}
                                showtimes
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination"
                            >
                                
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-700"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Next</span>→
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowtimesPage;