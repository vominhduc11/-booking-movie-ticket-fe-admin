import React, { useState } from 'react';
import {
    Search,
    Edit,
    MoreVertical,
    Filter,
    Plus,
    Calendar,
    Mail,
    Users,
    Film,
    Bell,
    Send,
    ChevronDown,
    X,
    CheckCircle,
    AlertCircle,
    Clock
} from 'lucide-react';

const SendNotificationsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // State for new notification form
    const [showNotificationForm, setShowNotificationForm] = useState(false);
    const [newNotification, setNewNotification] = useState({
        title: '',
        message: '',
        audienceType: 'All Users',
        scheduledDate: '',
        notificationType: 'Email'
    });

    // Sample notification data
    const notifications = [
        {
            id: 1,
            title: 'Weekend Special Offer',
            message:
                'Get 15% off on all movie tickets this weekend! Use code WEEKEND15 at checkout.',
            audience: 'All Users',
            sent: '2025-03-20 09:00',
            status: 'Sent',
            type: 'Promotional',
            channel: 'Email',
            opens: 6532,
            clicks: 1245,
            conversion: 328
        },
        {
            id: 2,
            title: 'New Movie Alert: Space Adventure 3',
            message:
                'Space Adventure 3 is now showing in theaters! Book your tickets now.',
            audience: 'Subscribed Users',
            sent: '2025-03-15 10:30',
            status: 'Sent',
            type: 'Announcement',
            channel: 'Push Notification',
            opens: 8921,
            clicks: 3456,
            conversion: 945
        },
        {
            id: 3,
            title: 'Your Tickets for Midnight in Tokyo',
            message:
                'Your tickets for Midnight in Tokyo have been confirmed. Show starts at 9 PM.',
            audience: 'Ticket Holders',
            sent: '2025-03-18 15:45',
            status: 'Sent',
            type: 'Transactional',
            channel: 'SMS',
            opens: 124,
            clicks: 112,
            conversion: 112
        },
        {
            id: 4,
            title: 'Membership Anniversary Bonus',
            message:
                'Happy Anniversary! Enjoy a free popcorn on your next visit as a thank you for being a loyal member.',
            audience: 'Premium Members',
            sent: '2025-03-19 11:20',
            status: 'Sent',
            type: 'Promotional',
            channel: 'Email',
            opens: 842,
            clicks: 567,
            conversion: 213
        },
        {
            id: 5,
            title: 'Summer Movie Festival',
            message:
                'Join us for our annual Summer Movie Festival. Special screenings, exclusive premieres, and more!',
            audience: 'All Users',
            scheduled: '2025-05-01 08:00',
            status: 'Scheduled',
            type: 'Announcement',
            channel: 'Email',
            opens: 0,
            clicks: 0,
            conversion: 0
        },
        {
            id: 6,
            title: 'System Maintenance Notice',
            message:
                'Our online booking system will be unavailable on March 25 from 2 AM to 4 AM due to scheduled maintenance.',
            audience: 'All Users',
            sent: '2025-03-22 09:00',
            status: 'Sent',
            type: 'System',
            channel: 'Email & SMS',
            opens: 4532,
            clicks: 245,
            conversion: 0
        },
        {
            id: 7,
            title: 'Rate Your Experience',
            message:
                'How was your experience watching The Lost City? Take a moment to rate the movie and your theater experience.',
            audience: 'The Lost City Viewers',
            scheduled: '2025-03-30 10:00',
            status: 'Scheduled',
            type: 'Feedback',
            channel: 'Push Notification',
            opens: 0,
            clicks: 0,
            conversion: 0
        },
        {
            id: 8,
            title: 'Last Chance: Midnight in Tokyo',
            message:
                "Last few shows remaining for Midnight in Tokyo. Book now before it's gone!",
            audience: 'App Users',
            sent: '2025-03-21 14:15',
            status: 'Sent',
            type: 'Promotional',
            channel: 'Push Notification',
            opens: 3245,
            clicks: 928,
            conversion: 312
        }
    ];

    // Filter notifications based on search query and filters
    const filteredNotifications = notifications.filter((notification) => {
        const matchesSearch =
            searchQuery === '' ||
            notification.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            notification.message
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === 'All Status' ||
            notification.status === statusFilter;
        const matchesType =
            typeFilter === 'All Types' || notification.type === typeFilter;

        let dateValid = true;
        if (dateRange.start && dateRange.end) {
            const notificationDate = new Date(
                notification.sent || notification.scheduled
            );
            const filterStart = new Date(dateRange.start);
            const filterEnd = new Date(dateRange.end);

            dateValid =
                notificationDate >= filterStart &&
                notificationDate <= filterEnd;
        }

        return matchesSearch && matchesStatus && matchesType && dateValid;
    });

    // Function to determine status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Sent':
                return 'bg-green-100 text-green-800';
            case 'Scheduled':
                return 'bg-yellow-100 text-yellow-800';
            case 'Draft':
                return 'bg-gray-100 text-gray-800';
            case 'Failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to determine notification type badge color
    const getTypeBadgeColor = (type) => {
        switch (type) {
            case 'Promotional':
                return 'bg-blue-100 text-blue-800';
            case 'Announcement':
                return 'bg-purple-100 text-purple-800';
            case 'Transactional':
                return 'bg-indigo-100 text-indigo-800';
            case 'System':
                return 'bg-gray-100 text-gray-800';
            case 'Feedback':
                return 'bg-amber-100 text-amber-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Handle changes to the new notification form
    const handleNotificationChange = (e) => {
        const { name, value } = e.target;
        setNewNotification((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send the data to your backend
        console.log('Notification to send:', newNotification);
        alert('Notification scheduled successfully!');
        setShowNotificationForm(false);
        setNewNotification({
            title: '',
            message: '',
            audienceType: 'All Users',
            scheduledDate: '',
            notificationType: 'Email'
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Send Notifications
                </h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    onClick={() =>
                        setShowNotificationForm(!showNotificationForm)
                    }
                >
                    {showNotificationForm ? (
                        <X size={18} />
                    ) : (
                        <Plus size={18} />
                    )}
                    <span>
                        {showNotificationForm ? 'Cancel' : 'New Notification'}
                    </span>
                </button>
            </div>

            {/* New Notification Form */}
            {showNotificationForm && (
                <div className="bg-white p-6 rounded-md shadow mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Create New Notification
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notification Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newNotification.title}
                                        onChange={handleNotificationChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter title"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={newNotification.message}
                                        onChange={handleNotificationChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter notification message"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Audience
                                    </label>
                                    <select
                                        name="audienceType"
                                        value={newNotification.audienceType}
                                        onChange={handleNotificationChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option>All Users</option>
                                        <option>Subscribed Users</option>
                                        <option>Premium Members</option>
                                        <option>App Users</option>
                                        <option>Recent Customers</option>
                                        <option>Inactive Users</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notification Type
                                    </label>
                                    <select
                                        name="notificationType"
                                        value={newNotification.notificationType}
                                        onChange={handleNotificationChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option>Email</option>
                                        <option>SMS</option>
                                        <option>Push Notification</option>
                                        <option>Email & SMS</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Schedule Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="scheduledDate"
                                        value={newNotification.scheduledDate}
                                        onChange={handleNotificationChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                                    >
                                        <Send size={16} />
                                        <span>Schedule Notification</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Status:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Sent</option>
                        <option>Scheduled</option>
                        <option>Draft</option>
                        <option>Failed</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Type:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option>All Types</option>
                        <option>Promotional</option>
                        <option>Announcement</option>
                        <option>Transactional</option>
                        <option>System</option>
                        <option>Feedback</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Date Range:</label>
                    <div className="flex items-center gap-1">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="date"
                                placeholder="From"
                                className="pl-9 pr-2 py-1.5 border border-gray-300 rounded-md text-sm w-36"
                                value={dateRange.start}
                                onChange={(e) =>
                                    setDateRange({
                                        ...dateRange,
                                        start: e.target.value
                                    })
                                }
                            />
                        </div>
                        <span className="text-gray-500">-</span>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="date"
                                placeholder="To"
                                className="pl-9 pr-2 py-1.5 border border-gray-300 rounded-md text-sm w-36"
                                value={dateRange.end}
                                onChange={(e) =>
                                    setDateRange({
                                        ...dateRange,
                                        end: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center ml-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notifications..."
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

            {/* Notifications Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Notification
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Audience
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Channel
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Performance
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredNotifications.map((notification) => (
                            <tr
                                key={notification.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {notification.title}
                                    </div>
                                    <div className="text-xs text-gray-500 max-w-xs truncate">
                                        {notification.message}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                                        <span>{notification.audience}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        {notification.status === 'Scheduled' ? (
                                            <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                                        ) : (
                                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                        )}
                                        <span>
                                            {new Date(
                                                notification.sent ||
                                                    notification.scheduled
                                            ).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(notification.status)}`}
                                    >
                                        {notification.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeColor(notification.type)}`}
                                    >
                                        {notification.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        {notification.channel.includes(
                                            'Email'
                                        ) && (
                                            <Mail className="h-4 w-4 mr-1 text-blue-500" />
                                        )}
                                        {notification.channel.includes(
                                            'SMS'
                                        ) && (
                                            <Bell className="h-4 w-4 mr-1 text-green-500" />
                                        )}
                                        {notification.channel.includes(
                                            'Push'
                                        ) && (
                                            <Bell className="h-4 w-4 mr-1 text-purple-500" />
                                        )}
                                        <span>{notification.channel}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {notification.status === 'Sent' ? (
                                        <div className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">
                                                    Opens:
                                                </span>
                                                <span className="font-medium">
                                                    {notification.opens.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">
                                                    Clicks:
                                                </span>
                                                <span className="font-medium">
                                                    {notification.clicks.toLocaleString()}
                                                </span>
                                                {notification.clicks > 0 && (
                                                    <span className="text-xs text-gray-500">
                                                        (
                                                        {(
                                                            (notification.clicks /
                                                                notification.opens) *
                                                            100
                                                        ).toFixed(1)}
                                                        %)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400">
                                            Not available
                                        </span>
                                    )}
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
                                    {filteredNotifications.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {notifications.length}
                                </span>{' '}
                                notifications
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

export default SendNotificationsPage;
