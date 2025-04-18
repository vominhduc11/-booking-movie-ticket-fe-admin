import React, { useState } from 'react';
import {
    Search,
    Edit,
    MoreVertical,
    Filter,
    Plus,
    Calendar,
    Clock
} from 'lucide-react';

const ShowtimesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [theaterFilter, setTheaterFilter] = useState('All Theaters');
    const [movieFilter, setMovieFilter] = useState('All Movies');
    const [dateFilter, setDateFilter] = useState('');

    // Sample showtime data
    const showtimes = [
        {
            id: 1,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            room: 'Room 1',
            date: '2025-01-15',
            time: '10:00',
            status: 'Scheduled',
            capacity: 120,
            soldTickets: 38
        },
        {
            id: 2,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            room: 'Room 1',
            date: '2025-01-15',
            time: '14:30',
            status: 'Scheduled',
            capacity: 120,
            soldTickets: 62
        },
        {
            id: 3,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            room: 'Room 1',
            date: '2025-01-15',
            time: '18:00',
            status: 'Scheduled',
            capacity: 120,
            soldTickets: 105
        },
        {
            id: 4,
            movie: 'Space Adventure 3',
            theater: 'Cineplex Downtown',
            room: 'Room 1',
            date: '2025-01-15',
            time: '21:30',
            status: 'Scheduled',
            capacity: 120,
            soldTickets: 45
        },
        {
            id: 5,
            movie: 'Midnight in Tokyo',
            theater: 'Cineplex Downtown',
            room: 'Room 2',
            date: '2025-02-28',
            time: '12:15',
            status: 'Scheduled',
            capacity: 150,
            soldTickets: 38
        },
        {
            id: 6,
            movie: 'Midnight in Tokyo',
            theater: 'Cineplex Downtown',
            room: 'Room 2',
            date: '2025-02-28',
            time: '17:45',
            status: 'On Sale',
            capacity: 150,
            soldTickets: 95
        },
        {
            id: 7,
            movie: 'Midnight in Tokyo',
            theater: 'Cineplex Downtown',
            room: 'Room 2',
            date: '2025-02-28',
            time: '22:00',
            status: 'On Sale',
            capacity: 150,
            soldTickets: 68
        },
        {
            id: 8,
            movie: 'The Lost City',
            theater: 'MovieMax Central',
            room: 'Hall A',
            date: '2025-03-10',
            time: '13:00',
            status: 'Coming Soon',
            capacity: 200,
            soldTickets: 0
        },
        {
            id: 9,
            movie: 'The Lost City',
            theater: 'MovieMax Central',
            room: 'Hall A',
            date: '2025-03-10',
            time: '16:30',
            status: 'Coming Soon',
            capacity: 200,
            soldTickets: 0
        },
        {
            id: 10,
            movie: 'The Lost City',
            theater: 'MovieMax Central',
            room: 'Hall A',
            date: '2025-03-10',
            time: '20:00',
            status: 'Coming Soon',
            capacity: 200,
            soldTickets: 0
        }
    ];

    // Filter showtimes based on search query and filters
    const filteredShowtimes = showtimes.filter((showtime) => {
        const matchesSearch =
            searchQuery === '' ||
            showtime.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
            showtime.theater
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            showtime.room.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTheater =
            theaterFilter === 'All Theaters' ||
            showtime.theater === theaterFilter;
        const matchesMovie =
            movieFilter === 'All Movies' || showtime.movie === movieFilter;
        const matchesDate = dateFilter === '' || showtime.date === dateFilter;

        return matchesSearch && matchesTheater && matchesMovie && matchesDate;
    });

    // Function to determine status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'On Sale':
                return 'bg-green-100 text-green-800';
            case 'Scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'Coming Soon':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            case 'Completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get unique movies and theaters for filters
    const uniqueMovies = [
        'All Movies',
        ...new Set(showtimes.map((showtime) => showtime.movie))
    ];
    const uniqueTheaters = [
        'All Theaters',
        ...new Set(showtimes.map((showtime) => showtime.theater))
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Showtimes</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add Showtime</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Theater:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={theaterFilter}
                        onChange={(e) => setTheaterFilter(e.target.value)}
                    >
                        {uniqueTheaters.map((theater) => (
                            <option key={theater} value={theater}>
                                {theater}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Movie:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={movieFilter}
                        onChange={(e) => setMovieFilter(e.target.value)}
                    >
                        {uniqueMovies.map((movie) => (
                            <option key={movie} value={movie}>
                                {movie}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Date:</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="date"
                            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center ml-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search movies, theaters..."
                            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="ml-2 bg-white border border-gray-300 px-3 py-1.5 rounded-md">
                        <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Showtimes Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Movie
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Theater / Room
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {showtime.movie}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{showtime.theater}</div>
                                    <div className="text-xs text-gray-400">
                                        {showtime.room}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(showtime.date).toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                    {showtime.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(showtime.status)}`}
                                    >
                                        {showtime.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${(showtime.soldTickets / showtime.capacity) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span>
                                            {showtime.soldTickets}/
                                            {showtime.capacity}
                                        </span>
                                    </div>
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
