import React, { useState } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaRegBuilding,
    FaDoorOpen,
    FaFilm,
    FaChevronDown,
    FaChevronUp,
    FaSearch,
    FaFilter
} from 'react-icons/fa';

const AllTheatersPage = () => {
    // Sample theaters data
    // eslint-disable-next-line
    const [theaters, setTheaters] = useState([
        {
            id: 1,
            name: 'Cineplex Downtown',
            address: '123 Main Street, Downtown, NY 10001',
            phone: '+1 (555) 123-4567',
            email: 'info@cineplexdowntown.com',
            totalRooms: 5,
            seatingCapacity: 650,
            activeMovies: 8,
            status: 'Active',
            location: {
                lat: 40.7128,
                lng: -74.006
            },
            facilities: ['3D', 'IMAX', 'VIP Lounge', 'Parking', 'Food Court'],
            image: '/theater1.jpg'
        },
        {
            id: 2,
            name: 'MovieMax Central',
            address: '456 Broadway Avenue, Central, NY 10002',
            phone: '+1 (555) 234-5678',
            email: 'contact@moviemaxcentral.com',
            totalRooms: 7,
            seatingCapacity: 850,
            activeMovies: 12,
            status: 'Active',
            location: {
                lat: 40.7112,
                lng: -73.9974
            },
            facilities: [
                '3D',
                '4DX',
                'VIP Lounge',
                'Parking',
                'Food Court',
                'Gaming Zone'
            ],
            image: '/theater2.jpg'
        },
        {
            id: 3,
            name: 'Starlight Cinema',
            address: '789 Park Road, Uptown, NY 10003',
            phone: '+1 (555) 345-6789',
            email: 'info@starlightcinema.com',
            totalRooms: 4,
            seatingCapacity: 480,
            activeMovies: 6,
            status: 'Active',
            location: {
                lat: 40.7306,
                lng: -73.9352
            },
            facilities: ['3D', 'Dolby Atmos', 'Cafe', 'Parking'],
            image: '/theater3.jpg'
        },
        {
            id: 4,
            name: 'Grand Theater',
            address: '101 Queens Boulevard, Queens, NY 11101',
            phone: '+1 (555) 456-7890',
            email: 'contact@grandtheater.com',
            totalRooms: 8,
            seatingCapacity: 1100,
            activeMovies: 14,
            status: 'Active',
            location: {
                lat: 40.7429,
                lng: -73.9188
            },
            facilities: [
                '3D',
                'IMAX',
                '4DX',
                'VIP Lounge',
                'Parking',
                'Food Court',
                'Bar'
            ],
            image: '/theater4.jpg'
        },
        {
            id: 5,
            name: 'City Screens',
            address: '222 Brooklyn Street, Brooklyn, NY 11201',
            phone: '+1 (555) 567-8901',
            email: 'info@cityscreens.com',
            totalRooms: 3,
            seatingCapacity: 320,
            activeMovies: 5,
            status: 'Maintenance',
            location: {
                lat: 40.6782,
                lng: -73.9442
            },
            facilities: ['3D', 'Cafe', 'Parking'],
            image: '/theater5.jpg'
        }
    ]);

    // State for filters and search
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        facility: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);

    // State for expanded theater view
    const [expandedTheaterId, setExpandedTheaterId] = useState(null);

    // Toggle theater expansion
    const toggleTheaterExpand = (id) => {
        if (expandedTheaterId === id) {
            setExpandedTheaterId(null);
        } else {
            setExpandedTheaterId(id);
        }
    };

    // Get all unique facilities
    const allFacilities = [
        ...new Set(theaters.flatMap((theater) => theater.facilities))
    ].sort();

    // Filter theaters based on search term and filters
    const filteredTheaters = theaters.filter((theater) => {
        // Filter by search term
        if (
            searchTerm &&
            !theater.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !theater.address.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }

        // Filter by status
        if (filters.status !== 'all' && theater.status !== filters.status) {
            return false;
        }

        // Filter by facility
        if (
            filters.facility !== 'all' &&
            !theater.facilities.includes(filters.facility)
        ) {
            return false;
        }

        return true;
    });

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentTheater, setCurrentTheater] = useState(null);

    // Open modal for adding a new theater
    const openAddModal = () => {
        setModalMode('add');
        setCurrentTheater({
            name: '',
            address: '',
            phone: '',
            email: '',
            totalRooms: 0,
            seatingCapacity: 0,
            activeMovies: 0,
            status: 'Active',
            facilities: []
        });
        setShowModal(true);
    };

    // Open modal for editing a theater
    const openEditModal = (theater) => {
        setModalMode('edit');
        setCurrentTheater({ ...theater });
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    All Theaters
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FaPlus className="mr-2" />
                    Add Theater
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search theaters..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center">
                            <select
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                <option value="Maintenance">Maintenance</option>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Facility
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.facility}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            facility: e.target.value
                                        })
                                    }
                                >
                                    <option value="all">All Facilities</option>
                                    {allFacilities.map((facility) => (
                                        <option key={facility} value={facility}>
                                            {facility}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Theaters list */}
            <div className="space-y-4">
                {filteredTheaters.map((theater) => (
                    <div
                        key={theater.id}
                        className="bg-white rounded-lg shadow overflow-hidden"
                    >
                        {/* Theater header */}
                        <div className="p-4 border-b bg-gray-50 flex flex-wrap justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <FaRegBuilding className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-medium text-gray-800">
                                        {theater.name}
                                    </h2>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <FaMapMarkerAlt className="mr-1" />
                                        <span>{theater.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center mt-2 md:mt-0">
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full mr-4 ${
                                        theater.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-orange-100 text-orange-800'
                                    }`}
                                >
                                    {theater.status}
                                </span>
                                <div className="flex">
                                    <button
                                        onClick={() =>
                                            toggleTheaterExpand(theater.id)
                                        }
                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                    >
                                        {expandedTheaterId === theater.id ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => openEditModal(theater)}
                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Theater overview (always visible) */}
                        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center">
                                <div className="p-2 rounded-full bg-blue-100 mr-3">
                                    <FaDoorOpen className="text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">
                                        Total Rooms
                                    </div>
                                    <div className="text-lg font-medium">
                                        {theater.totalRooms}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="p-2 rounded-full bg-green-100 mr-3">
                                    <FaFilm className="text-green-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">
                                        Active Movies
                                    </div>
                                    <div className="text-lg font-medium">
                                        {theater.activeMovies}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="p-2 rounded-full bg-purple-100 mr-3">
                                    <svg
                                        className="h-5 w-5 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">
                                        Seating Capacity
                                    </div>
                                    <div className="text-lg font-medium">
                                        {theater.seatingCapacity}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center">
                                <div className="text-sm text-gray-500 w-full mb-1">
                                    Facilities:
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {theater.facilities
                                        .slice(0, 3)
                                        .map((facility, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                                            >
                                                {facility}
                                            </span>
                                        ))}
                                    {theater.facilities.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                            +{theater.facilities.length - 3}{' '}
                                            more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Expanded content */}
                        {expandedTheaterId === theater.id && (
                            <div className="border-t p-4 bg-gray-50">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium mb-3">
                                            Contact Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center">
                                                <FaPhone className="text-gray-500 mr-2" />
                                                <span>{theater.phone}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaEnvelope className="text-gray-500 mr-2" />
                                                <span>{theater.email}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-medium mt-6 mb-3">
                                            Facilities
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {theater.facilities.map(
                                                (facility, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                                    >
                                                        {facility}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <h3 className="text-lg font-medium mt-6 mb-3">
                                            Overview
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-white p-3 rounded shadow-sm">
                                                <div className="text-sm text-gray-500">
                                                    Total Rooms
                                                </div>
                                                <div className="text-2xl font-medium text-gray-800 mt-1">
                                                    {theater.totalRooms}
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow-sm">
                                                <div className="text-sm text-gray-500">
                                                    Seating Capacity
                                                </div>
                                                <div className="text-2xl font-medium text-gray-800 mt-1">
                                                    {theater.seatingCapacity}
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow-sm">
                                                <div className="text-sm text-gray-500">
                                                    Active Movies
                                                </div>
                                                <div className="text-2xl font-medium text-gray-800 mt-1">
                                                    {theater.activeMovies}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-1">
                                        <h3 className="text-lg font-medium mb-3">
                                            Location
                                        </h3>
                                        {/* Placeholder for map - in a real app, would be a Google/Leaflet map component */}
                                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <FaMapMarkerAlt className="text-red-500 text-2xl mx-auto mb-2" />
                                                <p className="text-gray-600">
                                                    Map view would be displayed
                                                    here
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-3">
                                        View Rooms
                                    </button>
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                                        View Movies
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {filteredTheaters.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500">
                            No theaters found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    Showing {filteredTheaters.length} of {theaters.length}{' '}
                    theaters
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

            {/* Add/Edit Theater Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-medium">
                                {modalMode === 'add'
                                    ? 'Add New Theater'
                                    : 'Edit Theater'}
                            </h3>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Theater Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter theater name"
                                        value={currentTheater?.name || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                name: e.target.value
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
                                            currentTheater?.status || 'Active'
                                        }
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                status: e.target.value
                                            })
                                        }
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Maintenance">
                                            Maintenance
                                        </option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter full address"
                                        value={currentTheater?.address || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                address: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter phone number"
                                        value={currentTheater?.phone || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                phone: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter email address"
                                        value={currentTheater?.email || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                email: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total Rooms
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentTheater?.totalRooms || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                totalRooms: parseInt(
                                                    e.target.value
                                                )
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Seating Capacity
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={
                                            currentTheater?.seatingCapacity ||
                                            ''
                                        }
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                seatingCapacity: parseInt(
                                                    e.target.value
                                                )
                                            })
                                        }
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Facilities
                                    </label>
                                    <div className="flex flex-wrap gap-2 p-3 border rounded-md">
                                        {allFacilities.map((facility) => (
                                            <label
                                                key={facility}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentTheater?.facilities?.includes(
                                                            facility
                                                        ) || false
                                                    }
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setCurrentTheater({
                                                                ...currentTheater,
                                                                facilities: [
                                                                    ...(currentTheater?.facilities ||
                                                                        []),
                                                                    facility
                                                                ]
                                                            });
                                                        } else {
                                                            setCurrentTheater({
                                                                ...currentTheater,
                                                                facilities: (
                                                                    currentTheater?.facilities ||
                                                                    []
                                                                ).filter(
                                                                    (f) =>
                                                                        f !==
                                                                        facility
                                                                )
                                                            });
                                                        }
                                                    }}
                                                />
                                                {facility}
                                            </label>
                                        ))}
                                    </div>
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
                                    ? 'Create Theater'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllTheatersPage;
