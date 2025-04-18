import React, { useState } from 'react';
import {
    Search,
    Edit,
    MoreVertical,
    Filter,
    Plus,
    Calendar,
    Percent,
    ArrowDown,
    Tag,
    Users
} from 'lucide-react';

const DiscountsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [discountTypeFilter, setDiscountTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // Sample discounts data
    const discounts = [
        {
            id: 1,
            name: 'Weekend Special',
            description: 'Get 15% off on all movie tickets during weekends',
            type: 'Percentage',
            discountValue: '15%',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['Saturday', 'Sunday'],
            minPurchase: 'None',
            maxDiscount: '$10 per ticket',
            startDate: '2025-01-01',
            endDate: '2025-03-31',
            status: 'Active',
            usageCount: 1245,
            redemptionCode: 'WEEKEND15'
        },
        {
            id: 3,
            name: 'Students Discount',
            description: '20% off for students with valid ID',
            type: 'Percentage',
            discountValue: '20%',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['All Days'],
            minPurchase: 'None',
            maxDiscount: 'No limit',
            startDate: '2025-01-15',
            endDate: '2025-12-31',
            status: 'Active',
            usageCount: 2567,
            redemptionCode: 'STUDENT20'
        },
        {
            id: 4,
            name: 'Senior Citizen Special',
            description: '25% off for senior citizens',
            type: 'Percentage',
            discountValue: '25%',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['All Days'],
            minPurchase: 'None',
            maxDiscount: 'No limit',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'Active',
            usageCount: 1893,
            redemptionCode: 'SENIOR25'
        },
        {
            id: 5,
            name: 'Matinee Offer',
            description: 'Special pricing for shows before 3 PM',
            type: 'Fixed Amount',
            discountValue: '$8.99 Flat Rate',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies except Premieres'],
            applicableDays: ['All Days'],
            minPurchase: 'None',
            maxDiscount: 'N/A',
            startDate: '2025-01-01',
            endDate: '2025-06-30',
            status: 'Active',
            usageCount: 3452,
            redemptionCode: 'MATINEE'
        },
        {
            id: 8,
            name: 'Opening Week: Space Adventure 3',
            description:
                '10% off on all Space Adventure 3 tickets in opening week',
            type: 'Percentage',
            discountValue: '10%',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['Space Adventure 3'],
            applicableDays: ['All Days'],
            minPurchase: 'None',
            maxDiscount: '$5 per ticket',
            startDate: '2025-01-15',
            endDate: '2025-01-22',
            status: 'Completed',
            usageCount: 1658,
            redemptionCode: 'SPACE10'
        },
        {
            id: 10,
            name: 'Tuesday Special',
            description: '30% off all tickets on Tuesdays',
            type: 'Percentage',
            discountValue: '30%',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['Tuesday'],
            minPurchase: 'None',
            maxDiscount: 'No limit',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'Active',
            usageCount: 4290,
            redemptionCode: 'TUESDAY30'
        },
        {
            id: 11,
            name: 'Early Bird Discount',
            description: '$5 off when booking at least 7 days in advance',
            type: 'Fixed Amount',
            discountValue: '$5.00 off',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['All Days'],
            minPurchase: 'None',
            maxDiscount: 'N/A',
            startDate: '2025-02-01',
            endDate: '2025-05-31',
            status: 'Active',
            usageCount: 1987,
            redemptionCode: 'EARLYBIRD'
        },
        {
            id: 12,
            name: 'Military Appreciation',
            description: '20% off for active military personnel',
            type: 'Percentage',
            discountValue: '20%',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['All Days'],
            minPurchase: 'None',
            maxDiscount: 'No limit',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'Active',
            usageCount: 756,
            redemptionCode: 'MILITARY20'
        },
        {
            id: 13,
            name: 'Birthday Discount',
            description: 'Free ticket on your birthday',
            type: 'Special',
            discountValue: '100% (1 ticket only)',
            applicableTheaters: ['All Theaters'],
            applicableMovies: ['All Movies'],
            applicableDays: ['Customer Birthday Only'],
            minPurchase: 'None',
            maxDiscount: 'N/A',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'Active',
            usageCount: 2346,
            redemptionCode: 'BIRTHDAY'
        }
    ];

    // Filter discounts based on search query and filters
    const filteredDiscounts = discounts.filter((discount) => {
        const matchesSearch =
            searchQuery === '' ||
            discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            discount.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            discount.redemptionCode
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        const matchesType =
            discountTypeFilter === 'All Types' ||
            discount.type === discountTypeFilter;
        const matchesStatus =
            statusFilter === 'All Status' || discount.status === statusFilter;

        let dateValid = true;
        if (dateRange.start && dateRange.end) {
            const discountStart = new Date(discount.startDate);
            const discountEnd = new Date(discount.endDate);
            const filterStart = new Date(dateRange.start);
            const filterEnd = new Date(dateRange.end);

            dateValid =
                discountStart <= filterEnd && discountEnd >= filterStart;
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

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Discounts</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add Discount</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <label className="text-gray-600 text-sm">
                        Discount Type:
                    </label>
                    <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
                        value={discountTypeFilter}
                        onChange={(e) => setDiscountTypeFilter(e.target.value)}
                    >
                        <option>All Types</option>
                        <option>Percentage</option>
                        <option>Fixed Amount</option>
                        <option>Special</option>
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
                            placeholder="Search discounts or codes..."
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

            {/* Discounts Table */}
            <div className="bg-white rounded-md shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Discount Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Validity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Limitations
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
                        {filteredDiscounts.map((discount) => (
                            <tr key={discount.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {discount.name}
                                    </div>
                                    <div className="text-xs text-gray-500 max-w-xs truncate">
                                        {discount.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-mono bg-gray-100 rounded">
                                        {discount.redemptionCode}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {discount.type === 'Percentage' && (
                                            <Percent className="h-4 w-4 mr-1 text-blue-500" />
                                        )}
                                        {discount.type === 'Fixed Amount' && (
                                            <Tag className="h-4 w-4 mr-1 text-green-500" />
                                        )}
                                        {discount.type === 'Special' && (
                                            <Tag className="h-4 w-4 mr-1 text-purple-500" />
                                        )}
                                        <span className="text-sm text-gray-500">
                                            {discount.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className="font-medium">
                                        {discount.discountValue}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(
                                        discount.startDate
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}{' '}
                                    -{' '}
                                    {new Date(
                                        discount.endDate
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                    <div className="text-xs text-gray-400">
                                        {discount.applicableDays[0] ===
                                        'All Days'
                                            ? 'All Days'
                                            : discount.applicableDays.join(
                                                  ', '
                                              )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex flex-col">
                                        <span>
                                            <span className="text-xs text-gray-400">
                                                Movies:{' '}
                                            </span>
                                            {discount.applicableMovies[0]}
                                        </span>
                                        <span>
                                            <span className="text-xs text-gray-400">
                                                Max:{' '}
                                            </span>
                                            {discount.maxDiscount}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(discount.status)}`}
                                    >
                                        {discount.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {discount.usageCount.toLocaleString()}
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
                                    {filteredDiscounts.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-medium">
                                    {discounts.length}
                                </span>{' '}
                                discounts
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

export default DiscountsPage;
