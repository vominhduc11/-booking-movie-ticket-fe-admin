import React, { useState } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaCalendarAlt,
    FaClock,
    FaTheaterMasks,
    FaFilm,
    FaFilter,
    FaCalendarDay,
    FaSearch
} from 'react-icons/fa';

const MovieSchedulesPage = () => {
    // Sample data for theaters
    const theaters = [
        { id: 1, name: 'Cineplex Downtown' },
        { id: 2, name: 'MovieMax Central' },
        { id: 3, name: 'Starlight Cinema' },
        { id: 4, name: 'Grand Theater' }
    ];

    // Sample data for movies
    const movies = [
        {
            id: 1,
            title: 'Space Adventure 3',
            duration: 142,
            genre: 'Sci-Fi, Action'
        },
        {
            id: 2,
            title: 'The Last Symphony',
            duration: 135,
            genre: 'Drama, Music'
        },
        {
            id: 3,
            title: 'Midnight in Tokyo',
            duration: 118,
            genre: 'Romance, Comedy'
        },
        {
            id: 4,
            title: 'The Lost City',
            duration: 155,
            genre: 'Adventure, Action'
        },
        {
            id: 5,
            title: 'Whispers in the Dark',
            duration: 112,
            genre: 'Horror, Thriller'
        }
    ];

    // Sample data for rooms
    const rooms = [
        { id: 1, name: 'Room 1', theater: 1, capacity: 120 },
        { id: 2, name: 'Room 2', theater: 1, capacity: 80 },
        { id: 3, name: 'Room 3', theater: 1, capacity: 100 },
        { id: 4, name: 'Room 1', theater: 2, capacity: 150 },
        { id: 5, name: 'Room 2', theater: 2, capacity: 100 },
        { id: 6, name: 'Room 1', theater: 3, capacity: 120 },
        { id: 7, name: 'Room 2', theater: 3, capacity: 80 },
        { id: 8, name: 'Room 1', theater: 4, capacity: 200 },
        { id: 9, name: 'Room 2', theater: 4, capacity: 150 },
        { id: 10, name: 'Room 3', theater: 4, capacity: 100 }
    ];

    // Sample data for schedules
    // eslint-disable-next-line
    const [schedules, setSchedules] = useState([
        {
            id: 1,
            movieId: 1,
            theaterId: 1,
            roomId: 1,
            showDate: '2025-03-28',
            showTime: '10:00',
            price: 12.5,
            status: 'Active',
            ticketsSold: 45
        },
        {
            id: 2,
            movieId: 1,
            theaterId: 1,
            roomId: 1,
            showDate: '2025-03-28',
            showTime: '14:30',
            price: 12.5,
            status: 'Active',
            ticketsSold: 78
        },
        {
            id: 3,
            movieId: 1,
            theaterId: 1,
            roomId: 2,
            showDate: '2025-03-28',
            showTime: '18:00',
            price: 15.0,
            status: 'Active',
            ticketsSold: 62
        },
        {
            id: 4,
            movieId: 2,
            theaterId: 2,
            roomId: 4,
            showDate: '2025-03-28',
            showTime: '11:30',
            price: 10.0,
            status: 'Active',
            ticketsSold: 33
        },
        {
            id: 5,
            movieId: 2,
            theaterId: 2,
            roomId: 4,
            showDate: '2025-03-28',
            showTime: '16:00',
            price: 12.5,
            status: 'Active',
            ticketsSold: 56
        },
        {
            id: 6,
            movieId: 3,
            theaterId: 3,
            roomId: 6,
            showDate: '2025-03-28',
            showTime: '19:15',
            price: 14.0,
            status: 'Active',
            ticketsSold: 85
        },
        {
            id: 7,
            movieId: 4,
            theaterId: 4,
            roomId: 8,
            showDate: '2025-03-29',
            showTime: '13:45',
            price: 13.5,
            status: 'Active',
            ticketsSold: 67
        },
        {
            id: 8,
            movieId: 5,
            theaterId: 1,
            roomId: 3,
            showDate: '2025-03-29',
            showTime: '20:30',
            price: 15.5,
            status: 'Active',
            ticketsSold: 72
        },
        {
            id: 9,
            movieId: 5,
            theaterId: 4,
            roomId: 10,
            showDate: '2025-03-29',
            showTime: '22:00',
            price: 15.5,
            status: 'Cancelled',
            ticketsSold: 0
        },
        {
            id: 10,
            movieId: 1,
            theaterId: 2,
            roomId: 5,
            showDate: '2025-03-30',
            showTime: '15:45',
            price: 12.5,
            status: 'Active',
            ticketsSold: 23
        }
    ]);

    // State for filters
    const [filters, setFilters] = useState({
        date: '',
        movie: '',
        theater: '',
        status: 'all'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique dates from schedules
    const dates = [
        ...new Set(schedules.map((schedule) => schedule.showDate))
    ].sort();

    // Helper function to get movie, theater, room by id
    const getMovieById = (id) =>
        movies.find((movie) => movie.id === id) || { title: 'Unknown' };
    const getTheaterById = (id) =>
        theaters.find((theater) => theater.id === id) || { name: 'Unknown' };
    const getRoomById = (id) =>
        rooms.find((room) => room.id === id) || { name: 'Unknown' };

    // Calculate occupancy percentage
    const calculateOccupancy = (schedule) => {
        const room = getRoomById(schedule.roomId);
        return Math.round((schedule.ticketsSold / room.capacity) * 100);
    };

    // Filter schedules based on filter state and search term
    const filteredSchedules = schedules.filter((schedule) => {
        // Filter by date
        if (filters.date && schedule.showDate !== filters.date) {
            return false;
        }

        // Filter by movie
        if (filters.movie && schedule.movieId !== parseInt(filters.movie)) {
            return false;
        }

        // Filter by theater
        if (
            filters.theater &&
            schedule.theaterId !== parseInt(filters.theater)
        ) {
            return false;
        }

        // Filter by status
        if (filters.status !== 'all' && schedule.status !== filters.status) {
            return false;
        }

        // Filter by search term
        if (searchTerm) {
            const movie = getMovieById(schedule.movieId);
            const theater = getTheaterById(schedule.theaterId);
            const searchLower = searchTerm.toLowerCase();

            return (
                movie.title.toLowerCase().includes(searchLower) ||
                theater.name.toLowerCase().includes(searchLower) ||
                schedule.showTime.includes(searchLower)
            );
        }

        return true;
    });

    // Sort schedules by date and time
    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
        const dateCompare = a.showDate.localeCompare(b.showDate);
        if (dateCompare !== 0) return dateCompare;
        return a.showTime.localeCompare(b.showTime);
    });

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentSchedule, setCurrentSchedule] = useState(null);

    // Open modal for adding a new schedule
    const openAddModal = () => {
        setModalMode('add');
        setCurrentSchedule({
            movieId: '',
            theaterId: '',
            roomId: '',
            showDate: '',
            showTime: '',
            price: '',
            status: 'Active'
        });
        setShowModal(true);
    };

    // Open modal for editing a schedule
    const openEditModal = (schedule) => {
        setModalMode('edit');
        setCurrentSchedule({ ...schedule });
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Movie Schedules
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FaPlus className="mr-2" />
                    Add Schedule
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search schedules..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center">
                            <FaCalendarDay className="text-gray-400 mr-2" />
                            <select
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.date}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        date: e.target.value
                                    })
                                }
                            >
                                <option value="">All Dates</option>
                                {dates.map((date) => (
                                    <option key={date} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                        >
                            <FaFilter className="mr-2 text-gray-500" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Expanded filters */}
                {showFilters && (
                    <div className="p-4 bg-gray-50 border-b">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Movie
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.movie}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            movie: e.target.value
                                        })
                                    }
                                >
                                    <option value="">All Movies</option>
                                    {movies.map((movie) => (
                                        <option key={movie.id} value={movie.id}>
                                            {movie.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Theater
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.theater}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            theater: e.target.value
                                        })
                                    }
                                >
                                    <option value="">All Theaters</option>
                                    {theaters.map((theater) => (
                                        <option
                                            key={theater.id}
                                            value={theater.id}
                                        >
                                            {theater.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.status}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            status: e.target.value
                                        })
                                    }
                                >
                                    <option value="all">All Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Schedules Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Movie
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Theater
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Room
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Occupancy
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedSchedules.map((schedule) => {
                                const movie = getMovieById(schedule.movieId);
                                const theater = getTheaterById(
                                    schedule.theaterId
                                );
                                const room = getRoomById(schedule.roomId);
                                const occupancy = calculateOccupancy(schedule);

                                return (
                                    <tr
                                        key={schedule.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="text-gray-500 mr-2" />
                                                <span>{schedule.showDate}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaClock className="text-gray-500 mr-2" />
                                                <span>{schedule.showTime}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaFilm className="text-blue-500 mr-2" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {movie.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {movie.duration} min
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {theater.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaTheaterMasks className="text-gray-500 mr-2" />
                                                <div>
                                                    <div className="text-sm text-gray-900">
                                                        {room.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {room.capacity} seats
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                ${schedule.price.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${
                                                        occupancy > 80
                                                            ? 'bg-green-600'
                                                            : occupancy > 50
                                                              ? 'bg-blue-600'
                                                              : occupancy > 20
                                                                ? 'bg-yellow-400'
                                                                : 'bg-red-400'
                                                    }`}
                                                    style={{
                                                        width: `${occupancy}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {schedule.ticketsSold}/
                                                {room.capacity} ({occupancy}%)
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    schedule.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {schedule.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() =>
                                                    openEditModal(schedule)
                                                }
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {sortedSchedules.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            No schedules found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    Showing {filteredSchedules.length} of {schedules.length}{' '}
                    schedules
                </div>
                <div className="flex">
                    <button className="px-3 py-1 bg-white text-gray-600 border rounded-l hover:bg-gray-50 disabled:opacity-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600">
                        1
                    </button>
                    <button className="px-3 py-1 bg-white text-gray-600 border rounded-r hover:bg-gray-50 disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>

            {/* Add/Edit Schedule Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-medium">
                                {modalMode === 'add'
                                    ? 'Add New Schedule'
                                    : 'Edit Schedule'}
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Movie
                                    </label>
                                    <select
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentSchedule?.movieId || ''}
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                movieId: parseInt(
                                                    e.target.value
                                                )
                                            })
                                        }
                                    >
                                        <option value="">Select Movie</option>
                                        {movies.map((movie) => (
                                            <option
                                                key={movie.id}
                                                value={movie.id}
                                            >
                                                {movie.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Theater
                                    </label>
                                    <select
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentSchedule?.theaterId || ''}
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                theaterId: parseInt(
                                                    e.target.value
                                                )
                                            })
                                        }
                                    >
                                        <option value="">Select Theater</option>
                                        {theaters.map((theater) => (
                                            <option
                                                key={theater.id}
                                                value={theater.id}
                                            >
                                                {theater.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Room
                                    </label>
                                    <select
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentSchedule?.roomId || ''}
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                roomId: parseInt(e.target.value)
                                            })
                                        }
                                        disabled={!currentSchedule?.theaterId}
                                    >
                                        <option value="">Select Room</option>
                                        {rooms
                                            .filter(
                                                (room) =>
                                                    !currentSchedule?.theaterId ||
                                                    room.theater ===
                                                        currentSchedule.theaterId
                                            )
                                            .map((room) => (
                                                <option
                                                    key={room.id}
                                                    value={room.id}
                                                >
                                                    {room.name} ({room.capacity}{' '}
                                                    seats)
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentSchedule?.showDate || ''}
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                showDate: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentSchedule?.showTime || ''}
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                showTime: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price ($)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentSchedule?.price || ''}
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                price: parseFloat(
                                                    e.target.value
                                                )
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={
                                            currentSchedule?.status || 'Active'
                                        }
                                        onChange={(e) =>
                                            setCurrentSchedule({
                                                ...currentSchedule,
                                                status: e.target.value
                                            })
                                        }
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="border-t px-6 py-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {modalMode === 'add'
                                    ? 'Create Schedule'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieSchedulesPage;
