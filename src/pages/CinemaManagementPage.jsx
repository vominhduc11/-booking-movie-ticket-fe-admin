// src/pages/CinemaManagementPage.jsx
import React, { useState } from 'react';
import { Search, Edit, Trash2, Plus, Filter, MoreVertical } from 'lucide-react';

const CinemaManagementPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentCinema, setCurrentCinema] = useState(null);

    // Sample cinema data
    const [cinemas, setCinemas] = useState([
        {
            id: 1,
            name: 'CGV Cinema',
            address: '123 Main Street, Downtown',
            phoneNumber: '+84 123 456 789',
            email: 'contact@cgvcinema.com',
            status: 'Active',
            branchCount: 5,
            description: 'Leading cinema chain with premium viewing experience'
        },
        {
            id: 2,
            name: 'Galaxy Cinema',
            address: '456 Broadway Avenue, Central',
            phoneNumber: '+84 987 654 321',
            email: 'info@galaxycinema.com',
            status: 'Active',
            branchCount: 3,
            description: 'Modern cinema with affordable tickets and great promotions'
        },
        {
            id: 3,
            name: 'Lotte Cinema',
            address: '789 Park Road, Uptown',
            phoneNumber: '+84 456 789 123',
            email: 'support@lottecinema.com',
            status: 'Maintenance',
            branchCount: 4,
            description: 'International cinema brand with luxury amenities'
        }
    ]);

    // Filter cinemas based on search and filters
    const filteredCinemas = cinemas.filter(cinema => {
        const matchesSearch = searchQuery === '' ||
            cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cinema.address.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'All Status' || cinema.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const openAddModal = () => {
        setModalMode('add');
        setCurrentCinema({
            name: '',
            address: '',
            phoneNumber: '',
            email: '',
            status: 'Active',
            description: ''
        });
        setShowModal(true);
    };

    const openEditModal = (cinema) => {
        setModalMode('edit');
        setCurrentCinema({ ...cinema });
        setShowModal(true);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Cinema Management</h1>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    onClick={openAddModal}
                >
                    <Plus size={18} />
                    <span>Add Cinema</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-md shadow mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
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
                        </select>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search cinemas..."
                            className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="ml-2 bg-white border border-gray-300 px-3 py-1.5 rounded-md">
                        <Filter className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Cinemas Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cinema Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Information
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Branches
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
                        {filteredCinemas.map((cinema) => (
                            <tr key={cinema.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{cinema.name}</div>
                                    <div className="text-xs text-gray-500">{cinema.address}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{cinema.phoneNumber}</div>
                                    <div className="text-sm text-gray-500">{cinema.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {cinema.branchCount} branches
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        cinema.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {cinema.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        onClick={() => openEditModal(cinema)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900 mr-3">
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-900">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="flex-1 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCinemas.length}</span> of <span className="font-medium">{cinemas.length}</span> cinemas
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <a href="#" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-gray-100 text-sm font-medium text-gray-700">1</a>
                                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <span className="sr-only">Next</span>→
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Cinema Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-medium">{modalMode === 'add' ? 'Add New Cinema' : 'Edit Cinema'}</h3>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cinema Name</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter cinema name"
                                        value={currentCinema?.name || ''}
                                        onChange={(e) => setCurrentCinema({...currentCinema, name: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                        value={currentCinema?.address || ''}
                                        onChange={(e) => setCurrentCinema({...currentCinema, address: e.target.value})}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter phone number"
                                            value={currentCinema?.phoneNumber || ''}
                                            onChange={(e) => setCurrentCinema({...currentCinema, phoneNumber: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter email"
                                            value={currentCinema?.email || ''}
                                            onChange={(e) => setCurrentCinema({...currentCinema, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentCinema?.status || 'Active'}
                                        onChange={(e) => setCurrentCinema({...currentCinema, status: e.target.value})}
                                    >
                                        <option>Active</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Enter description"
                                        value={currentCinema?.description || ''}
                                        onChange={(e) => setCurrentCinema({...currentCinema, description: e.target.value})}
                                    ></textarea>
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
                                {modalMode === 'add' ? 'Create Cinema' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CinemaManagementPage;