import React, { useState } from 'react';
import {
    Search,
    Plus,
    Edit,
    Trash2,
    MoreHorizontal,
    ChevronDown,
    ChevronUp,
    Filter
} from 'lucide-react';

const AllUsersPage = () => {
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Sample user data
    const users = [
        {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@example.com',
            role: 'Customer',
            status: 'Active',
            lastLogin: '2025-03-27 16:42'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            role: 'Admin',
            status: 'Active',
            lastLogin: '2025-03-28 09:15'
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.b@example.com',
            role: 'Theater Manager',
            status: 'Active',
            lastLogin: '2025-03-26 14:30'
        },
        {
            id: 4,
            name: 'Emily Davis',
            email: 'emily.d@example.com',
            role: 'Customer',
            status: 'Inactive',
            lastLogin: '2025-02-15 11:20'
        },
        {
            id: 5,
            name: 'David Wilson',
            email: 'david.w@example.com',
            role: 'Customer',
            status: 'Active',
            lastLogin: '2025-03-25 19:05'
        },
        {
            id: 6,
            name: 'Jessica Lee',
            email: 'jessica.l@example.com',
            role: 'Staff',
            status: 'Active',
            lastLogin: '2025-03-27 12:33'
        },
        {
            id: 7,
            name: 'Robert Taylor',
            email: 'robert.t@example.com',
            role: 'Customer',
            status: 'Active',
            lastLogin: '2025-03-24 20:18'
        }
    ];

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? (
                <ChevronUp size={16} />
            ) : (
                <ChevronDown size={16} />
            );
        }
        return null;
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(users.map((user) => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white p-4 shadow">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">User Management</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                            Welcome, Admin User
                        </span>
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            AU
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow">
                    {/* Page header with actions */}
                    <div className="p-4 border-b flex flex-wrap justify-between items-center">
                        <h2 className="text-lg font-medium">All Users</h2>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search
                                    size={18}
                                    className="absolute left-3 top-2.5 text-gray-400"
                                />
                            </div>
                            <button className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-100 flex items-center">
                                <Filter size={18} className="mr-1" />
                                Filter
                            </button>
                            <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                                <Plus size={18} className="mr-1" />
                                Add User
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left text-gray-600 text-sm">
                                    <th className="py-3 px-4">
                                        <input
                                            type="checkbox"
                                            className="rounded"
                                            onChange={handleSelectAll}
                                            checked={
                                                selectedUsers.length ===
                                                    users.length &&
                                                users.length > 0
                                            }
                                        />
                                    </th>
                                    <th
                                        className="py-3 px-4 cursor-pointer hover:text-blue-500"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center">
                                            Name {getSortIcon('name')}
                                        </div>
                                    </th>
                                    <th
                                        className="py-3 px-4 cursor-pointer hover:text-blue-500"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center">
                                            Email {getSortIcon('email')}
                                        </div>
                                    </th>
                                    <th
                                        className="py-3 px-4 cursor-pointer hover:text-blue-500"
                                        onClick={() => handleSort('role')}
                                    >
                                        <div className="flex items-center">
                                            Role {getSortIcon('role')}
                                        </div>
                                    </th>
                                    <th
                                        className="py-3 px-4 cursor-pointer hover:text-blue-500"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center">
                                            Status {getSortIcon('status')}
                                        </div>
                                    </th>
                                    <th
                                        className="py-3 px-4 cursor-pointer hover:text-blue-500"
                                        onClick={() => handleSort('lastLogin')}
                                    >
                                        <div className="flex items-center">
                                            Last Login{' '}
                                            {getSortIcon('lastLogin')}
                                        </div>
                                    </th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="py-3 px-4">
                                            <input
                                                type="checkbox"
                                                className="rounded"
                                                checked={selectedUsers.includes(
                                                    user.id
                                                )}
                                                onChange={() =>
                                                    handleSelectUser(user.id)
                                                }
                                            />
                                        </td>
                                        <td className="py-3 px-4 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {user.email}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    user.role === 'Admin'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : user.role ===
                                                            'Theater Manager'
                                                          ? 'bg-blue-100 text-blue-800'
                                                          : user.role ===
                                                              'Staff'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    user.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {user.lastLogin}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                                                    <Trash2 size={18} />
                                                </button>
                                                <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing 1 to 7 of 7 entries
                        </div>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            <button className="px-3 py-1 border rounded bg-blue-500 text-white">
                                1
                            </button>
                            <button className="px-3 py-1 border rounded text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsersPage;
