import React, { useState } from 'react';
import {
    FaFilm,
    FaTheaterMasks,
    FaTicketAlt,
    FaChartLine,
    FaBullhorn,
    FaUser,
    FaDoorOpen
} from 'react-icons/fa';

const DashboardPage = () => {
    // Sample data for dashboard statistics
    const [stats] = useState({
        totalUsers: 1254,
        activeUsers: 876,
        totalMovies: 148,
        activeMovies: 42,
        totalTheaters: 24,
        totalRooms: 86,
        totalTicketsSold: 12567,
        revenue: 189450,
        salesGrowth: 14.5,
        userGrowth: 8.2
    });

    // Sample chart data
    const [dailyRevenue] = useState([
        { day: 'Tue', amount: 9700 },
        { day: 'Wed', amount: 14800 },
        { day: 'Thu', amount: 18200 },
        { day: 'Fri', amount: 24500 },
        { day: 'Sat', amount: 32400 },
        { day: 'Sun', amount: 28900 }
    ]);

    // Recent activities sample data
    const [recentActivities] = useState([
        {
            id: 1,
            activity: 'New movie "Space Adventure 3" added',
            time: '15 minutes ago',
            type: 'movie'
        },
        {
            id: 2,
            activity: 'User John Smith booked 4 tickets',
            time: '45 minutes ago',
            type: 'ticket'
        },
        {
            id: 3,
            activity: 'Theater "Cineplex Downtown" updated schedule',
            time: '1 hour ago',
            type: 'theater'
        },
        {
            id: 4,
            activity: 'New promotion "Midweek Special" created',
            time: '3 hours ago',
            type: 'promotion'
        },
        {
            id: 5,
            activity: 'User Sarah Johnson registered',
            time: '5 hours ago',
            type: 'user'
        }
    ]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Main Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <FaUser />
                        </div>
                        <h3 className="text-gray-600 text-sm">Total Users</h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            <span className="text-green-500 font-medium">
                                {stats.userGrowth}%
                            </span>{' '}
                            increase this month
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <FaFilm />
                        </div>
                        <h3 className="text-gray-600 text-sm">Active Movies</h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">
                            {stats.activeMovies}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Out of {stats.totalMovies} total movies
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <FaTicketAlt />
                        </div>
                        <h3 className="text-gray-600 text-sm">Tickets Sold</h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">
                            {stats.totalTicketsSold.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            ${stats.revenue.toLocaleString()} total revenue
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                            <FaChartLine />
                        </div>
                        <h3 className="text-gray-600 text-sm">Sales Growth</h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">
                            {stats.salesGrowth}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Compared to last month
                        </p>
                    </div>
                </div>
            </div>

            {/* Weekly Revenue Chart and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-700 font-medium">
                            Weekly Revenue
                        </h3>
                    </div>
                    <div className="h-64 relative">
                        <div className="flex h-full items-end">
                            {dailyRevenue.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-1 flex flex-col items-center"
                                >
                                    <div
                                        className="w-full mx-1 bg-blue-500 rounded-t"
                                        style={{
                                            height: `${(item.amount / 35000) * 100}%`
                                        }}
                                    ></div>
                                    <p className="mt-2 text-xs text-gray-600">
                                        {item.day}
                                    </p>
                                    <p className="text-xs font-medium">
                                        ${(item.amount / 1000).toFixed(1)}k
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-gray-700 font-medium mb-4">
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start mb-4"
                            >
                                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                    {activity.type === 'movie' && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaFilm className="text-blue-500 text-xs" />
                                        </div>
                                    )}
                                    {activity.type === 'ticket' && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaTicketAlt className="text-blue-500 text-xs" />
                                        </div>
                                    )}
                                    {activity.type === 'theater' && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaTheaterMasks className="text-blue-500 text-xs" />
                                        </div>
                                    )}
                                    {activity.type === 'promotion' && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaBullhorn className="text-blue-500 text-xs" />
                                        </div>
                                    )}
                                    {activity.type === 'user' && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <FaUser className="text-blue-500 text-xs" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm">
                                        {activity.activity}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Theater Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <FaTheaterMasks />
                        </div>
                        <h3 className="text-gray-600 text-sm">
                            Total Theaters
                        </h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">
                            {stats.totalTheaters}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                            <FaDoorOpen />
                        </div>
                        <h3 className="text-gray-600 text-sm">Total Rooms</h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">{stats.totalRooms}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                            <FaTicketAlt />
                        </div>
                        <h3 className="text-gray-600 text-sm">
                            Avg. Occupancy
                        </h3>
                    </div>
                    <div className="ml-1">
                        <p className="text-2xl font-bold">76%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
