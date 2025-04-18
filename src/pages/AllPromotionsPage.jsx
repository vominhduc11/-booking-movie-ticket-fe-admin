import React, { useState } from 'react';
import {
    Search,
    Edit,
    MoreVertical,
    Filter,
    Plus,
    Calendar,
    Tag,
    Percent,
    Theater,
    Users
} from 'lucide-react';

const AllPromotionsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // Sample promotions data
    const promotions = [
        {
            id: 1,
            name: 'Weekend Special',
            description: 'Get 15% off on all movie tickets during weekends',
            type: 'Discount',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-01-01',
            endDate: '2025-03-31',
            discountValue: '15%',
            minPurchase: 'None',
            status: 'Active',
            usageCount: 1245
        },
        {
            id: 2,
            name: 'Family Package',
            description: 'Buy 3 tickets, get 1 free for any family movie',
            type: 'Special Offer',
            applicableTheaters: ['Cineplex Downtown', 'MovieMax Central'],
            startDate: '2025-02-01',
            endDate: '2025-04-30',
            discountValue: 'Buy 3 Get 1 Free',
            minPurchase: '3 Tickets',
            status: 'Active',
            usageCount: 386
        },
        {
            id: 3,
            name: 'Students Discount',
            description: '20% off for students with valid ID',
            type: 'Discount',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-01-15',
            endDate: '2025-12-31',
            discountValue: '20%',
            minPurchase: 'None',
            status: 'Active',
            usageCount: 2567
        },
        {
            id: 4,
            name: 'Senior Citizen Special',
            description: '25% off for senior citizens',
            type: 'Discount',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            discountValue: '25%',
            minPurchase: 'None',
            status: 'Active',
            usageCount: 1893
        },
        {
            id: 5,
            name: 'Matinee Offer',
            description: 'Special pricing for shows before 3 PM',
            type: 'Special Price',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-01-01',
            endDate: '2025-06-30',
            discountValue: '$8.99 Flat Rate',
            minPurchase: 'None',
            status: 'Active',
            usageCount: 3452
        },
        {
            id: 6,
            name: 'Summer Movie Pass',
            description: 'Unlimited movies for $29.99/month during summer',
            type: 'Subscription',
            applicableTheaters: ['Cineplex Downtown', 'Starlight Cinema'],
            startDate: '2025-06-01',
            endDate: '2025-08-31',
            discountValue: '$29.99/month',
            minPurchase: 'None',
            status: 'Scheduled',
            usageCount: 0
        },
        {
            id: 7,
            name: "Valentine's Day Special",
            description: "Buy 1 Get 1 Free for couples on Valentine's Day",
            type: 'Special Offer',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-02-14',
            endDate: '2025-02-14',
            discountValue: 'Buy 1 Get 1 Free',
            minPurchase: 'None',
            status: 'Completed',
            usageCount: 842
        },
        {
            id: 8,
            name: 'Opening Week: Space Adventure 3',
            description:
                '10% off on all Space Adventure 3 tickets in opening week',
            type: 'Movie-specific',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-01-15',
            endDate: '2025-01-22',
            discountValue: '10%',
            minPurchase: 'None',
            status: 'Completed',
            usageCount: 1658
        },
        {
            id: 9,
            name: 'Member Appreciation Month',
            description: 'Extra benefits for loyalty program members',
            type: 'Loyalty Program',
            applicableTheaters: ['All Theaters'],
            startDate: '2025-04-01',
            endDate: '2025-04-30',
            discountValue: 'Various',
            minPurchase: 'Membership',
            status: 'Scheduled',
            usageCount: 0
        }
    ];

    // Filter promotions based on search query and filters
    const filteredPromotions = promotions.filter((promotion) => {
        const matchesSearch =
            searchQuery === '' ||
            promotion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            promotion.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesType =
            typeFilter === 'All Types' || promotion.type === typeFilter;
        const matchesStatus =
            statusFilter === 'All Status' || promotion.status === statusFilter;

        let dateValid = true;
        if (dateRange.start && dateRange.end) {
            const promotionStart = new Date(promotion.startDate);
            const promotionEnd = new Date(promotion.endDate);
            const filterStart = new Date(dateRange.start);
            const filterEnd = new Date(dateRange.end);

            dateValid =
                promotionStart <= filterEnd && promotionEnd >= filterStart;
        }

        return matchesSearch && matchesType && matchesStatus && dateValid;
    });

    // Function to determine status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Scheduled':
                return 'bg-yellow-100 text-yellow-800';
            case 'Completed':
                return 'bg-gray-100 text-gray-800';
            case 'Expired':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get unique promotion types for filter
    const uniqueTypes = [
        'All Types',
        ...new Set(promotions.map((promotion) => promotion.type))
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    All Promotions
                </h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add Promotion</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">Type:</label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        {uniqueTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
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
                        <option>Scheduled</option>
                        <option>Completed</option>
                        <option>Expired</option>
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
                            placeholder="Search promotions..."
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

            {/* Promotions Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Promotion Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Applicable Theaters
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date Range
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usage
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPromotions.map((promotion) => (
                            <tr key={promotion.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {promotion.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {promotion.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {promotion.type === 'Discount' && (
                                            <Percent className="h-4 w-4 mr-1 text-blue-500" />
                                        )}
                                        {promotion.type === 'Special Offer' && (
                                            <Tag className="h-4 w-4 mr-1 text-purple-500" />
                                        )}
                                        {promotion.type === 'Special Price' && (
                                            <Tag className="h-4 w-4 mr-1 text-green-500" />
                                        )}
                                        {promotion.type === 'Subscription' && (
                                            <Users className="h-4 w-4 mr-1 text-indigo-500" />
                                        )}
                                        {promotion.type ===
                                            'Movie-specific' && (
                                            <Theater className="h-4 w-4 mr-1 text-red-500" />
                                        )}
                                        {promotion.type ===
                                            'Loyalty Program' && (
                                            <Users className="h-4 w-4 mr-1 text-amber-500" />
                                        )}
                                        <span className="text-sm text-gray-500">
                                            {promotion.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {promotion.discountValue}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {promotion.applicableTheaters[0] ===
                                    'All Theaters'
                                        ? 'All Theaters'
                                        : promotion.applicableTheaters.join(
                                              ', '
                                          )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(
                                        promotion.startDate
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}{' '}
                                    -{' '}
                                    {new Date(
                                        promotion.endDate
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(promotion.status)}`}
                                    >
                                        {promotion.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {promotion.usageCount.toLocaleString()}
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
                                    {filteredPromotions.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {promotions.length}
                                </span>{' '}
                                promotions
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

export default AllPromotionsPage;
