import React, { useState } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
    FaChevronDown,
    FaChevronUp,
    FaUserShield
} from 'react-icons/fa';

const RolesPermissionsPage = () => {
    // Sample data for roles
    // eslint-disable-next-line
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: 'Admin',
            description: 'Full system access with all permissions',
            usersCount: 3,
            permissions: {
                dashboard: { view: true, edit: true },
                users: { view: true, create: true, edit: true, delete: true },
                movies: { view: true, create: true, edit: true, delete: true },
                theaters: {
                    view: true,
                    create: true,
                    edit: true,
                    delete: true
                },
                rooms: { view: true, create: true, edit: true, delete: true },
                sales: { view: true, export: true },
                promotions: {
                    view: true,
                    create: true,
                    edit: true,
                    delete: true
                }
            }
        },
        {
            id: 2,
            name: 'Theater Manager',
            description: 'Manages theater operations and staff',
            usersCount: 8,
            permissions: {
                dashboard: { view: true, edit: false },
                users: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                },
                movies: {
                    view: true,
                    create: false,
                    edit: true,
                    delete: false
                },
                theaters: {
                    view: true,
                    create: false,
                    edit: true,
                    delete: false
                },
                rooms: { view: true, create: true, edit: true, delete: false },
                sales: { view: true, export: true },
                promotions: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                }
            }
        },
        {
            id: 3,
            name: 'Staff',
            description: 'Theater staff with limited access',
            usersCount: 24,
            permissions: {
                dashboard: { view: true, edit: false },
                users: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                movies: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                },
                theaters: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                },
                rooms: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                },
                sales: { view: false, export: false },
                promotions: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                }
            }
        },
        {
            id: 4,
            name: 'Customer',
            description: 'Regular customer with booking privileges',
            usersCount: 2156,
            permissions: {
                dashboard: { view: false, edit: false },
                users: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                movies: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                },
                theaters: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                },
                rooms: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                sales: { view: false, export: false },
                promotions: {
                    view: true,
                    create: false,
                    edit: false,
                    delete: false
                }
            }
        }
    ]);

    // State for expanded role details
    const [expandedRole, setExpandedRole] = useState(null);

    // Toggle role expansion
    const toggleRoleExpand = (roleId) => {
        if (expandedRole === roleId) {
            setExpandedRole(null);
        } else {
            setExpandedRole(roleId);
        }
    };

    // State for the modal
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentRole, setCurrentRole] = useState(null);

    // Open modal for adding a new role
    const openAddModal = () => {
        setModalMode('add');
        setCurrentRole({
            name: '',
            description: '',
            permissions: {
                dashboard: { view: false, edit: false },
                users: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                movies: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                theaters: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                rooms: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                },
                sales: { view: false, export: false },
                promotions: {
                    view: false,
                    create: false,
                    edit: false,
                    delete: false
                }
            }
        });
        setShowModal(true);
    };

    // Open modal for editing a role
    const openEditModal = (role) => {
        setModalMode('edit');
        setCurrentRole({ ...role });
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Roles & Permissions
                </h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FaPlus className="mr-2" />
                    Add Role
                </button>
            </div>

            {/* Roles List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 bg-gray-50 border-b text-gray-500 text-sm">
                    <div className="col-span-3 px-6 py-3 font-medium">Role</div>
                    <div className="col-span-5 px-6 py-3 font-medium">
                        Description
                    </div>
                    <div className="col-span-2 px-6 py-3 font-medium text-center">
                        Users
                    </div>
                    <div className="col-span-2 px-6 py-3 font-medium text-right">
                        Actions
                    </div>
                </div>

                {/* Roles */}
                {roles.map((role) => (
                    <div key={role.id} className="border-b last:border-b-0">
                        {/* Role Summary Row */}
                        <div className="grid grid-cols-12 items-center text-gray-700">
                            <div className="col-span-3 px-6 py-4 font-medium">
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            toggleRoleExpand(role.id)
                                        }
                                        className="mr-3 text-gray-500 focus:outline-none"
                                    >
                                        {expandedRole === role.id ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </button>
                                    <div className="flex items-center">
                                        <FaUserShield className="mr-2 text-blue-500" />
                                        {role.name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 px-6 py-4">
                                {role.description}
                            </div>
                            <div className="col-span-2 px-6 py-4 text-center">
                                {role.usersCount}
                            </div>
                            <div className="col-span-2 px-6 py-4 text-right">
                                <button
                                    onClick={() => openEditModal(role)}
                                    className="p-1 text-blue-600 hover:text-blue-800 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="p-1 text-red-600 hover:text-red-800"
                                    disabled={
                                        role.name === 'Admin' ||
                                        role.name === 'Customer'
                                    }
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        {/* Expanded Permissions */}
                        {expandedRole === role.id && (
                            <div className="bg-gray-50 px-6 py-4">
                                <h3 className="font-medium text-gray-700 mb-3">
                                    Permissions
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Dashboard */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="font-medium mb-2">
                                            Dashboard
                                        </h4>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>View Dashboard</span>
                                            {role.permissions.dashboard.view ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Edit Dashboard</span>
                                            {role.permissions.dashboard.edit ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Users */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="font-medium mb-2">
                                            User Management
                                        </h4>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>View Users</span>
                                            {role.permissions.users.view ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Create Users</span>
                                            {role.permissions.users.create ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Edit Users</span>
                                            {role.permissions.users.edit ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Delete Users</span>
                                            {role.permissions.users.delete ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Movies */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="font-medium mb-2">
                                            Movies Management
                                        </h4>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>View Movies</span>
                                            {role.permissions.movies.view ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Create Movies</span>
                                            {role.permissions.movies.create ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Edit Movies</span>
                                            {role.permissions.movies.edit ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Delete Movies</span>
                                            {role.permissions.movies.delete ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Theaters */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="font-medium mb-2">
                                            Theater Management
                                        </h4>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>View Theaters</span>
                                            {role.permissions.theaters.view ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Create Theaters</span>
                                            {role.permissions.theaters
                                                .create ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Edit Theaters</span>
                                            {role.permissions.theaters.edit ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Delete Theaters</span>
                                            {role.permissions.theaters
                                                .delete ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Rooms */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="font-medium mb-2">
                                            Room Management
                                        </h4>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>View Rooms</span>
                                            {role.permissions.rooms.view ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Create Rooms</span>
                                            {role.permissions.rooms.create ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Edit Rooms</span>
                                            {role.permissions.rooms.edit ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Delete Rooms</span>
                                            {role.permissions.rooms.delete ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Sales */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h4 className="font-medium mb-2">
                                            Sales Dashboard
                                        </h4>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>View Sales</span>
                                            {role.permissions.sales.view ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm py-1">
                                            <span>Export Reports</span>
                                            {role.permissions.sales.export ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    Showing 1 to 4 of 4 entries
                </div>
                <div className="flex">
                    <button
                        className="px-3 py-1 bg-white text-gray-600 border rounded-l hover:bg-gray-50 disabled:opacity-50"
                        disabled
                    >
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600">
                        1
                    </button>
                    <button
                        className="px-3 py-1 bg-white text-gray-600 border rounded-r hover:bg-gray-50 disabled:opacity-50"
                        disabled
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal for adding/editing roles */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        {/* Modal Header */}
                        <div className="border-b px-6 py-4">
                            <h3 className="text-lg font-medium">
                                {modalMode === 'add'
                                    ? 'Add New Role'
                                    : 'Edit Role'}
                            </h3>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Role Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter role name"
                                    value={currentRole?.name || ''}
                                    onChange={(e) =>
                                        setCurrentRole({
                                            ...currentRole,
                                            name: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter role description"
                                    rows="3"
                                    value={currentRole?.description || ''}
                                    onChange={(e) =>
                                        setCurrentRole({
                                            ...currentRole,
                                            description: e.target.value
                                        })
                                    }
                                ></textarea>
                            </div>

                            <div>
                                <h4 className="text-gray-700 text-sm font-medium mb-3">
                                    Permissions
                                </h4>

                                <div className="space-y-4">
                                    {/* Sample permission toggles */}
                                    <div className="border rounded-md p-4">
                                        <h5 className="font-medium mb-2">
                                            Dashboard
                                        </h5>
                                        <div className="flex flex-wrap gap-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentRole?.permissions
                                                            ?.dashboard?.view ||
                                                        false
                                                    }
                                                    onChange={(e) => {
                                                        setCurrentRole({
                                                            ...currentRole,
                                                            permissions: {
                                                                ...currentRole.permissions,
                                                                dashboard: {
                                                                    ...currentRole
                                                                        .permissions
                                                                        .dashboard,
                                                                    view: e
                                                                        .target
                                                                        .checked
                                                                }
                                                            }
                                                        });
                                                    }}
                                                />
                                                View Dashboard
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentRole?.permissions
                                                            ?.dashboard?.edit ||
                                                        false
                                                    }
                                                    onChange={(e) => {
                                                        setCurrentRole({
                                                            ...currentRole,
                                                            permissions: {
                                                                ...currentRole.permissions,
                                                                dashboard: {
                                                                    ...currentRole
                                                                        .permissions
                                                                        .dashboard,
                                                                    edit: e
                                                                        .target
                                                                        .checked
                                                                }
                                                            }
                                                        });
                                                    }}
                                                />
                                                Edit Dashboard
                                            </label>
                                        </div>
                                    </div>

                                    <div className="border rounded-md p-4">
                                        <h5 className="font-medium mb-2">
                                            User Management
                                        </h5>
                                        <div className="flex flex-wrap gap-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentRole?.permissions
                                                            ?.users?.view ||
                                                        false
                                                    }
                                                    onChange={() => {}}
                                                />
                                                View Users
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentRole?.permissions
                                                            ?.users?.create ||
                                                        false
                                                    }
                                                    onChange={() => {}}
                                                />
                                                Create Users
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentRole?.permissions
                                                            ?.users?.edit ||
                                                        false
                                                    }
                                                    onChange={() => {}}
                                                />
                                                Edit Users
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    checked={
                                                        currentRole?.permissions
                                                            ?.users?.delete ||
                                                        false
                                                    }
                                                    onChange={() => {}}
                                                />
                                                Delete Users
                                            </label>
                                        </div>
                                    </div>

                                    {/* Additional permission sections would be here */}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t px-6 py-4 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {modalMode === 'add'
                                    ? 'Create Role'
                                    : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesPermissionsPage;
