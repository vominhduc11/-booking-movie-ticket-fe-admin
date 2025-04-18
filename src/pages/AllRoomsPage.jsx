import React, { useState } from 'react';
import { Search, Edit, MoreVertical, Filter, Plus } from 'lucide-react';

const AllRoomsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [theaterFilter, setTheaterFilter] = useState('All Theaters');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Sample room data
    const rooms = [
        {
            id: 1,
            name: 'Room 1',
            theater: 'Cineplex Downtown',
            capacity: 120,
            type: 'Standard',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Room 2',
            theater: 'Cineplex Downtown',
            capacity: 150,
            type: 'IMAX',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Room 3',
            theater: 'Cineplex Downtown',
            capacity: 80,
            type: 'VIP',
            status: 'Maintenance'
        },
        {
            id: 4,
            name: 'Hall A',
            theater: 'MovieMax Central',
            capacity: 200,
            type: 'Standard',
            status: 'Active'
        },
        {
            id: 5,
            name: 'Hall B',
            theater: 'MovieMax Central',
            capacity: 180,
            type: '3D',
            status: 'Active'
        },
        {
            id: 6,
            name: 'Theater 1',
            theater: 'Starlight Cinema',
            capacity: 120,
            type: 'Standard',
            status: 'Active'
        },
        {
            id: 7,
            name: 'Theater 2',
            theater: 'Starlight Cinema',
            capacity: 90,
            type: 'Premium',
            status: 'Reserved'
        },
        {
            id: 8,
            name: 'Main Hall',
            theater: 'Grand Theater',
            capacity: 300,
            type: 'Premium',
            status: 'Active'
        },
        {
            id: 9,
            name: 'Small Theater',
            theater: 'Grand Theater',
            capacity: 75,
            type: 'Standard',
            status: 'Closed'
        }
    ];

    // Filter rooms based on search query and filters
    const filteredRooms = rooms.filter((room) => {
        const matchesSearch =
            searchQuery === '' ||
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.theater.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTheater =
            theaterFilter === 'All Theaters' || room.theater === theaterFilter;
        const matchesStatus =
            statusFilter === 'All Status' || room.status === statusFilter;

        return matchesSearch && matchesTheater && matchesStatus;
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

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">All Rooms</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add Room</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">
                        Filter by Theater:
                    </label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={theaterFilter}
                        onChange={(e) => setTheaterFilter(e.target.value)}
                    >
                        <option>All Theaters</option>
                        <option>Cineplex Downtown</option>
                        <option>MovieMax Central</option>
                        <option>Starlight Cinema</option>
                        <option>Grand Theater</option>
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
                                Theater
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Capacity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
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
                                    {room.theater}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.capacity} seats
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(room.status)}`}
                                    >
                                        {room.status}
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
        </div>
    );
};

export default AllRoomsPage;
