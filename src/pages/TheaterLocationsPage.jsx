import React, { useState } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaSearch,
    FaFilter,
    FaRegBuilding,
    FaFilm,
    FaDoorOpen
} from 'react-icons/fa';

const TheaterLocationsPage = () => {
    // Sample theater locations data
    // eslint-disable-next-line
    const [theaterLocations, setTheaterLocations] = useState([
        {
            id: 1,
            name: 'Cineplex Downtown',
            address: '123 Main Street, Downtown, NY 10001',
            latitude: 40.7128,
            longitude: -74.006,
            totalRooms: 5,
            seatingCapacity: 650,
            activeMovies: 8,
            status: 'Active',
            facilities: ['3D', 'IMAX', 'VIP Lounge', 'Parking', 'Food Court'],
            description:
                'Located in the heart of Downtown, Cineplex Downtown offers premium movie experience with 5 theaters including IMAX.'
        },
        {
            id: 2,
            name: 'MovieMax Central',
            address: '456 Broadway Avenue, Central, NY 10002',
            latitude: 40.7112,
            longitude: -73.9974,
            totalRooms: 7,
            seatingCapacity: 850,
            activeMovies: 12,
            status: 'Active',
            facilities: [
                '3D',
                '4DX',
                'VIP Lounge',
                'Parking',
                'Food Court',
                'Gaming Zone'
            ],
            description:
                'The largest theater in Central New York featuring 7 screens and advanced 4DX technology.'
        },
        {
            id: 3,
            name: 'Starlight Cinema',
            address: '789 Park Road, Uptown, NY 10003',
            latitude: 40.7306,
            longitude: -73.9352,
            totalRooms: 4,
            seatingCapacity: 480,
            activeMovies: 6,
            status: 'Active',
            facilities: ['3D', 'Dolby Atmos', 'Cafe', 'Parking'],
            description:
                'A boutique cinema experience with premium sound system and comfortable seating arrangements.'
        },
        {
            id: 4,
            name: 'Grand Theater',
            address: '101 Queens Boulevard, Queens, NY 11101',
            latitude: 40.7429,
            longitude: -73.9188,
            totalRooms: 8,
            seatingCapacity: 1100,
            activeMovies: 14,
            status: 'Active',
            facilities: [
                '3D',
                'IMAX',
                '4DX',
                'VIP Lounge',
                'Parking',
                'Food Court',
                'Bar'
            ],
            description:
                'The flagship location with state-of-the-art projection technology and the largest seating capacity.'
        },
        {
            id: 5,
            name: 'City Screens',
            address: '222 Brooklyn Street, Brooklyn, NY 11201',
            latitude: 40.6782,
            longitude: -73.9442,
            totalRooms: 3,
            seatingCapacity: 320,
            activeMovies: 5,
            status: 'Maintenance',
            facilities: ['3D', 'Cafe', 'Parking'],
            description:
                'A neighborhood cinema featuring independent and foreign films in an intimate setting.'
        }
    ]);

    // State for filters and search
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        status: 'all',
        facility: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);

    // Get all unique facilities
    const allFacilities = [
        ...new Set(theaterLocations.flatMap((theater) => theater.facilities))
    ].sort();

    // Filter theaters based on search term and filters
    const filteredTheaters = theaterLocations.filter((theater) => {
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

    // State for selected theater (for map focus)
    const [selectedTheater, setSelectedTheater] = useState(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentTheater, setCurrentTheater] = useState(null);

    // Open modal for adding a new theater location
    const openAddModal = () => {
        setModalMode('add');
        setCurrentTheater({
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            totalRooms: 0,
            seatingCapacity: 0,
            activeMovies: 0,
            status: 'Active',
            facilities: [],
            description: ''
        });
        setShowModal(true);
    };

    // Open modal for editing a theater location
    const openEditModal = (theater) => {
        setModalMode('edit');
        setCurrentTheater({ ...theater });
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Theater Locations
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FaPlus className="mr-2" />
                    Add Location
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search locations..."
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

            {/* Main content - Map and Locations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map view (left side) */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-medium text-gray-800">
                            Map View
                        </h2>
                    </div>

                    {/* This would be a real map component in production */}
                    <div className="h-[600px] bg-gray-100 relative">
                        {/* Placeholder for map view */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-8">
                                <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
                                <p className="text-gray-500 mb-2">
                                    Interactive map would be displayed here
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {selectedTheater ? (
                                        <>
                                            Focused on: {selectedTheater.name} (
                                            {selectedTheater.latitude},{' '}
                                            {selectedTheater.longitude})
                                        </>
                                    ) : (
                                        <>
                                            Click on a location to focus the map
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Visual representation of theater locations (for demo) */}
                        <div className="absolute inset-0">
                            {filteredTheaters.map((theater, index) => (
                                <div
                                    key={theater.id}
                                    className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                                        selectedTheater?.id === theater.id
                                            ? 'z-10'
                                            : 'z-0'
                                    }`}
                                    style={{
                                        // This is just for visual representation,
                                        // in a real app you would use proper map coordinates
                                        left: `${20 + index * 15}%`,
                                        top: `${30 + index * 10}%`
                                    }}
                                    onClick={() => setSelectedTheater(theater)}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            selectedTheater?.id === theater.id
                                                ? 'bg-blue-500'
                                                : 'bg-red-500'
                                        } text-white`}
                                    >
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div
                                        className={`absolute whitespace-nowrap mt-1 px-2 py-1 rounded text-xs ${
                                            selectedTheater?.id === theater.id
                                                ? 'bg-blue-100'
                                                : 'bg-gray-100'
                                        }`}
                                    >
                                        {theater.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Locations list (right side) */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-medium text-gray-800">
                                Location List
                            </h2>
                        </div>

                        <div className="divide-y overflow-auto max-h-[600px]">
                            {filteredTheaters.map((theater) => (
                                <div
                                    key={theater.id}
                                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                        selectedTheater?.id === theater.id
                                            ? 'bg-blue-50'
                                            : ''
                                    }`}
                                    onClick={() => setSelectedTheater(theater)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-800">
                                                {theater.name}
                                            </h3>
                                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                                <FaMapMarkerAlt className="text-gray-400 mr-1" />
                                                <span>{theater.address}</span>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                theater.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-orange-100 text-orange-800'
                                            }`}
                                        >
                                            {theater.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                                        <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                                            <FaRegBuilding className="text-blue-500 mb-1" />
                                            <span className="text-xs text-gray-500">
                                                Rooms
                                            </span>
                                            <span className="font-medium">
                                                {theater.totalRooms}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                                            <FaDoorOpen className="text-green-500 mb-1" />
                                            <span className="text-xs text-gray-500">
                                                Capacity
                                            </span>
                                            <span className="font-medium">
                                                {theater.seatingCapacity}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                                            <FaFilm className="text-purple-500 mb-1" />
                                            <span className="text-xs text-gray-500">
                                                Movies
                                            </span>
                                            <span className="font-medium">
                                                {theater.activeMovies}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex flex-wrap gap-1">
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

                                    <div className="mt-3 flex justify-end">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(theater);
                                            }}
                                            className="p-1 text-blue-600 hover:text-blue-800 mr-3"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Delete functionality would go here
                                            }}
                                            className="p-1 text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredTheaters.length === 0 && (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500">
                                        No theater locations found matching your
                                        criteria.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Theater Location Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-medium">
                                {modalMode === 'add'
                                    ? 'Add New Theater Location'
                                    : 'Edit Theater Location'}
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
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter latitude"
                                        value={currentTheater?.latitude || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                latitude: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter longitude"
                                        value={currentTheater?.longitude || ''}
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                longitude: e.target.value
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
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Enter theater description"
                                        value={
                                            currentTheater?.description || ''
                                        }
                                        onChange={(e) =>
                                            setCurrentTheater({
                                                ...currentTheater,
                                                description: e.target.value
                                            })
                                        }
                                    ></textarea>
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
                                    ? 'Create Location'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TheaterLocationsPage;
