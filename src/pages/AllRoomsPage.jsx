// src/pages/AllRoomsPage.jsx
import React, { useState } from 'react';
import { Search, Edit, MoreVertical, Filter, Plus, ChevronDown, Grid, Save } from 'lucide-react';

const AllRoomsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [theaterFilter, setTheaterFilter] = useState('All Theaters');
    const [cinemaFilter, setCinemaFilter] = useState('All Cinemas');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [showModal, setShowModal] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [seatLayout, setSeatLayout] = useState([]);
    const [selectedSeatType, setSelectedSeatType] = useState('standard');

    // Sample cinema data
    const cinemas = [
        { id: 1, name: 'CGV Cinema' },
        { id: 2, name: 'Galaxy Cinema' },
        { id: 3, name: 'Lotte Cinema' },
    ];

    // Sample room data
    const rooms = [
        {
            id: 1,
            name: 'Room 1',
            cinema: 'CGV Cinema',
            theater: 'Cineplex Downtown',
            capacity: 120,
            rows: 10,
            columns: 12,
            type: 'Standard',
            seatLayout: [
                ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
                ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
                ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
                ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
                ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard'],
                ['standard', 'standard', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'standard', 'standard'],
                ['standard', 'standard', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'standard', 'standard'],
                ['standard', 'standard', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'vip', 'standard', 'standard'],
                ['standard', 'standard', 'couple', 'couple', 'couple', 'couple', 'couple', 'couple', 'standard', 'standard'],
                ['standard', 'standard', 'couple', 'couple', 'couple', 'couple', 'couple', 'couple', 'standard', 'standard'],
            ],
            status: 'Active'
        },
        {
            id: 2,
            name: 'Room 2',
            cinema: 'CGV Cinema',
            theater: 'Cineplex Downtown',
            capacity: 150,
            rows: 12,
            columns: 15,
            type: 'IMAX',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Room 3',
            cinema: 'CGV Cinema',
            theater: 'Cineplex Downtown',
            capacity: 80,
            rows: 8,
            columns: 10,
            type: 'VIP',
            status: 'Maintenance'
        },
        {
            id: 4,
            name: 'Hall A',
            cinema: 'Galaxy Cinema',
            theater: 'MovieMax Central',
            capacity: 200,
            rows: 15,
            columns: 20,
            type: 'Standard',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Hall B',
            cinema: 'Galaxy Cinema',
            theater: 'MovieMax Central',
            capacity: 180,
            rows: 15,
            columns: 18,
            type: '3D',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Theater 1',
            cinema: 'Lotte Cinema',
            theater: 'Starlight Cinema',
            capacity: 120,
            rows: 10,
            columns: 12,
            type: 'Standard',
            status: 'Active'
        },
        {
            id: 7,
            name: 'Theater 2',
            cinema: 'Lotte Cinema',
            theater: 'Starlight Cinema',
            capacity: 90,
            rows: 9,
            columns: 10,
            type: 'Premium',
            status: 'Reserved'
        },
        {
            id: 8,
            name: 'Main Hall',
            cinema: 'Lotte Cinema',
            theater: 'Grand Theater',
            capacity: 300,
            rows: 20,
            columns: 15,
            type: 'Premium',
            status: 'Active'
        },
        {
            id: 9,
            name: 'Small Theater',
            cinema: 'Galaxy Cinema',
            theater: 'Grand Theater',
            capacity: 75,
            rows: 7,
            columns: 11,
            type: 'Standard',
            status: 'Closed'
        }
    ];

    // Filter rooms based on search query and filters
    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            searchQuery === '' ||
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.theater.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.type.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTheater =
            theaterFilter === 'All Theaters' || room.theater === theaterFilter;
        const matchesCinema =
            cinemaFilter === 'All Cinemas' || room.cinema === cinemaFilter;
        const matchesStatus =
            statusFilter === 'All Status' || room.status === statusFilter;

        return matchesSearch && matchesTheater && matchesCinema && matchesStatus;
    });

    // Function to determine status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Maintenance':
                return 'bg-red-100 text-red-800';
            case 'Reserved':
                return 'bg-yellow-100 text-yellow-800';
            case 'Closed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get unique theaters for filter
    const uniqueTheaters = ['All Theaters', ...new Set(rooms.map(room => room.theater))];

    // Initialize seat layout when opening the edit modal
    const openEditModal = (room) => {
        setCurrentRoom(room);
        
        // If room has an existing seat layout, use it
        if (room.seatLayout) {
            setSeatLayout(room.seatLayout);
        } else {
            // Otherwise, create a default layout based on rows and columns
            const newLayout = [];
            for (let i = 0; i < room.rows; i++) {
                const row = [];
                for (let j = 0; j < room.columns; j++) {
                    row.push('standard');
                }
                newLayout.push(row);
            }
            setSeatLayout(newLayout);
        }
        
        setShowModal(true);
    };

    // Function to update a seat type
    const updateSeatType = (rowIndex, colIndex) => {
        const newLayout = [...seatLayout];
        newLayout[rowIndex][colIndex] = selectedSeatType;
        setSeatLayout(newLayout);
    };

    // Function to get seat style based on type
    const getSeatStyle = (type) => {
        switch (type) {
            case 'standard':
                return 'bg-blue-500 hover:bg-blue-600';
            case 'vip':
                return 'bg-purple-500 hover:bg-purple-600';
            case 'couple':
                return 'bg-pink-500 hover:bg-pink-600 w-10';
            case 'disabled':
                return 'bg-gray-300 hover:bg-gray-400';
            case 'empty':
                return 'bg-transparent border border-dashed border-gray-300';
            default:
                return 'bg-blue-500 hover:bg-blue-600';
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Room Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add Room</span>
                </button>
            </div>

            {/* Filters */}
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
                        {uniqueTheaters.map((theater, index) => (
                            <option key={index} value={theater}>
                                {theater}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Status:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Maintenance</option>
                        <option>Reserved</option>
                        <option>Closed</option>
                    </select>
                </div>

                <div className="flex items-center ml-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search rooms..."
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

            {/* Rooms Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Room Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cinema
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Theater
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Capacity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Layout
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
                        {filteredRooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {room.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.cinema}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.theater}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.capacity} seats
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.rows} × {room.columns}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(room.status)}`}
                                    >
                                        {room.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        className="text-gray-500 hover:text-gray-700 bg-gray-100 p-1 rounded-md mr-2"
                                        onClick={() => openEditModal(room)}
                                    >
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
                                    {filteredRooms.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {rooms.length}
                                </span>{' '}
                                rooms
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

            {/* Edit Room Modal with Seat Layout */}
            {showModal && currentRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto py-10">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
                        <div className="border-b px-6 py-4 sticky top-0 bg-white z-10 flex justify-between items-center">
                            <h3 className="text-lg font-medium">Edit Room - {currentRoom.name}</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left side - Room properties */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-lg border-b pb-2">Room Properties</h4>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentRoom.name}
                                        onChange={(e) => setCurrentRoom({...currentRoom, name: e.target.value})}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cinema</label>
                                        <select
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={currentRoom.cinema}
                                            onChange={(e) => setCurrentRoom({...currentRoom, cinema: e.target.value})}
                                        >
                                            {cinemas.map(cinema => (
                                                <option key={cinema.id}>{cinema.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Theater</label>
                                        <select
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={currentRoom.theater}
                                            onChange={(e) => setCurrentRoom({...currentRoom, theater: e.target.value})}
                                        >
                                            {uniqueTheaters.filter(t => t !== 'All Theaters').map((theater, idx) => (
                                                <option key={idx}>{theater}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                                        <select
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={currentRoom.type}
                                            onChange={(e) => setCurrentRoom({...currentRoom, type: e.target.value})}
                                        >
                                            <option>Standard</option>
                                            <option>VIP</option>
                                            <option>IMAX</option>
                                            <option>3D</option>
                                            <option>4DX</option>
                                            <option>Premium</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={currentRoom.status}
                                            onChange={(e) => setCurrentRoom({...currentRoom, status: e.target.value})}
                                        >
                                            <option>Active</option>
                                            <option>Maintenance</option>
                                            <option>Reserved</option>
                                            <option>Closed</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rows</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={currentRoom.rows}
                                            onChange={(e) => {
                                                const newRows = parseInt(e.target.value);
                                                setCurrentRoom({...currentRoom, rows: newRows});
                                                
                                                // Update seat layout with new rows
                                                const newLayout = [...seatLayout];
                                                if (newRows > seatLayout.length) {
                                                    // Add rows
                                                    for (let i = seatLayout.length; i < newRows; i++) {
                                                        const row = [];
                                                        for (let j = 0; j < currentRoom.columns; j++) {
                                                            row.push('standard');
                                                        }
                                                        newLayout.push(row);
                                                    }
                                                } else if (newRows < seatLayout.length) {
                                                    // Remove rows
                                                    newLayout.splice(newRows);
                                                }
                                                setSeatLayout(newLayout);
                                            }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Columns</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={currentRoom.columns}
                                            onChange={(e) => {
                                                const newCols = parseInt(e.target.value);
                                                setCurrentRoom({...currentRoom, columns: newCols});
                                                
                                                // Update seat layout with new columns
                                                const newLayout = seatLayout.map(row => {
                                                    if (newCols > row.length) {
                                                        // Add columns
                                                        return [...row, ...Array(newCols - row.length).fill('standard')];
                                                    } else if (newCols < row.length) {
                                                        // Remove columns
                                                        return row.slice(0, newCols);
                                                    }
                                                    return row;
                                                });
                                                setSeatLayout(newLayout);
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentRoom.capacity}
                                        onChange={(e) => setCurrentRoom({...currentRoom, capacity: parseInt(e.target.value)})}
                                    />
                                </div>
                                
                                <div className="pt-4">
                                    <button
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                                    >
                                        <Save size={16} />
                                        Save Room Properties
                                    </button>
                                </div>
                            </div>

                            {/* Right side - Seat layout */}
                            <div>
                                <h4 className="font-medium text-lg border-b pb-2">Seat Layout</h4>
                                
                                <div className="mb-4 mt-4">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Seat Type</label>
                                            <select
                                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={selectedSeatType}
                                                onChange={(e) => setSelectedSeatType(e.target.value)}
                                            >
                                                <option value="standard">Standard</option>
                                                <option value="vip">VIP</option>
                                                <option value="couple">Couple</option>
                                                <option value="disabled">Disabled</option>
                                                <option value="empty">Empty Space</option>
                                            </select>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-block w-6 h-6 rounded-md ${getSeatStyle('standard')}`}></span>
                                            <span className="text-sm">Standard</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-block w-6 h-6 rounded-md ${getSeatStyle('vip')}`}></span>
                                            <span className="text-sm">VIP</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-block w-10 h-6 rounded-md ${getSeatStyle('couple')}`}></span>
                                            <span className="text-sm">Couple</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-block w-6 h-6 rounded-md ${getSeatStyle('disabled')}`}></span>
                                            <span className="text-sm">Disabled</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-block w-6 h-6 rounded-md ${getSeatStyle('empty')}`}></span>
                                            <span className="text-sm">Empty</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="relative mt-2 mb-6">
                                    <div className="w-full bg-gray-200 p-2 text-center text-sm font-medium text-gray-600 uppercase tracking-wider rounded-t-md">
                                        Screen
                                    </div>
                                </div>
                                
                                <div className="overflow-auto p-4 bg-gray-100 rounded-md">
                                    <div className="flex flex-col items-center">
                                        {seatLayout.map((row, rowIndex) => (
                                            <div key={rowIndex} className="flex mb-2">
                                                <div className="w-6 text-sm text-gray-500 flex items-center justify-center mr-2">
                                                    {String.fromCharCode(65 + rowIndex)}
                                                </div>
                                                {row.map((seat, colIndex) => (
                                                    <button
                                                        key={colIndex}
                                                        className={`w-6 h-6 rounded-md mx-1 ${getSeatStyle(seat)} ${seat === 'couple' ? 'w-10' : ''}`}
                                                        onClick={() => updateSeatType(rowIndex, colIndex)}
                                                    ></button>
                                                ))}
                                                <div className="w-6 text-sm text-gray-500 flex items-center justify-center ml-2">
                                                    {String.fromCharCode(65 + rowIndex)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex justify-center mt-4">
                                        <div className="flex">
                                            {seatLayout[0] && seatLayout[0].map((_, colIndex) => (
                                                <div key={colIndex} className="w-6 mx-1 text-center text-sm text-gray-500">
                                                    {colIndex + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 text-sm text-gray-500">
                                    <p>Click on a seat to change its type to the selected seat type above.</p>
                                </div>
                                
                                <div className="pt-4">
                                    <button
                                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
                                    >
                                        <Grid size={16} />
                                        Save Seat Layout
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t px-6 py-4 sticky bottom-0 bg-white flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Save All Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllRoomsPage;