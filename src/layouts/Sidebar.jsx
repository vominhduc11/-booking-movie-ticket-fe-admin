// Updated Sidebar.jsx - Key changes to fix props and toggle functionality
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaUsers,
    FaFilm,
    FaTheaterMasks,
    FaClock,
    FaChartLine,
    FaGift,
    FaUserCog,
    FaAngleDown,
    FaAngleRight,
    FaCog,
    FaSignOutAlt,
    FaUserShield,
    FaTicketAlt,
    FaCalendarAlt,
    FaRegBuilding,
    FaDollarSign,
    FaBullhorn,
    FaPercentage,
    FaMapMarkerAlt,
    FaListUl,
    FaList,
    FaDoorOpen
} from 'react-icons/fa';

const Sidebar = ({ collapsed, toggleSidebar }) => {
    const navigate = useNavigate();

    // Expanded menu items state
    const [expanded, setExpanded] = useState({
        users: false,
        movies: false,
        theaters: false,
        rooms: false,
        sales: false,
        promotions: false
    });

    // Active menu item
    const [activeItem, setActiveItem] = useState('dashboard');
    const [activeSubItem, setActiveSubItem] = useState(null);

    // Toggle expand/collapse of menu item
    const toggleExpand = (key) => {
        setExpanded({
            ...expanded,
            [key]: !expanded[key]
        });
    };

    // Handle click on menu item
    const handleMenuItemClick = (id, hasSubmenu, path) => {
        if (hasSubmenu) {
            toggleExpand(id);
        } else {
            setActiveItem(id);
            setActiveSubItem(null);

            // Navigate if path provided
            if (path) {
                navigate(path);
            }

            // Close sidebar on mobile when item clicked
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        }
    };

    // Handle click on submenu item
    const handleSubmenuItemClick = (parentId, id, path) => {
        setActiveItem(parentId);
        setActiveSubItem(id);

        // Navigate to the specific route if provided
        if (path) {
            navigate(path);
        }

        // Close sidebar on mobile when item clicked
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    // Menu items data based on requirements
    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <FaTachometerAlt />,
            hasSubmenu: false,
            path: '/dashboard'
        },
        {
            id: 'users',
            label: 'User Management',
            icon: <FaUsers />,
            hasSubmenu: true,
            submenu: [
                {
                    id: 'all-users',
                    label: 'All Users',
                    icon: <FaUsers size="0.85em" />,
                    path: '/allusers'
                },
                {
                    id: 'roles',
                    label: 'Roles & Permissions',
                    icon: <FaUserShield size="0.85em" />,
                    path: '/roles'
                }
            ]
        },
        {
            id: 'movies',
            label: 'Movies Management',
            icon: <FaFilm />,
            hasSubmenu: true,
            submenu: [
                {
                    id: 'all-movies',
                    label: 'All Movies',
                    icon: <FaList size="0.85em" />,
                    path: '/movies'
                },
                {
                    id: 'schedules',
                    label: 'Movie Schedules',
                    icon: <FaCalendarAlt size="0.85em" />,
                    path: '/schedules'
                }
            ]
        },
        {
            id: 'theaters',
            label: 'Theater Management',
            icon: <FaTheaterMasks />,
            hasSubmenu: true,
            submenu: [
                {
                    id: 'all-theaters',
                    label: 'All Theaters',
                    icon: <FaRegBuilding size="0.85em" />,
                    path: '/theaters'
                },
                {
                    id: 'locations',
                    label: 'Theater Locations',
                    icon: <FaMapMarkerAlt size="0.85em" />,
                    path: '/locations'
                },
                {
                    id: 'movies-list',
                    label: 'Movies by Theater',
                    icon: <FaListUl size="0.85em" />,
                    path: '/movies-by-theater'
                }
            ]
        },
        {
            id: 'rooms',
            label: 'Room Management',
            icon: <FaDoorOpen />,
            hasSubmenu: true,
            submenu: [
                {
                    id: 'all-rooms',
                    label: 'All Rooms',
                    icon: <FaDoorOpen size="0.85em" />,
                    path: '/rooms'
                },
                {
                    id: 'showtimes',
                    label: 'Showtimes',
                    icon: <FaClock size="0.85em" />,
                    path: '/showtimes'
                }
            ]
        },
        {
            id: 'promotions',
            label: 'Promotions',
            icon: <FaGift />,
            hasSubmenu: true,
            submenu: [
                {
                    id: 'all-promotions',
                    label: 'All Promotions',
                    icon: <FaGift size="0.85em" />,
                    path: '/promotions'
                },
                {
                    id: 'discounts',
                    label: 'Discounts',
                    icon: <FaPercentage size="0.85em" />,
                    path: '/discounts'
                },
                {
                    id: 'notifications',
                    label: 'Send Notifications',
                    icon: <FaBullhorn size="0.85em" />,
                    path: '/notifications'
                }
            ]
        }
    ];

    // Render menu item
    const renderMenuItem = (item) => {
        const isActive = activeItem === item.id;
        const isExpanded = expanded[item.id];

        return (
            <div key={item.id} className="mb-1">
                <button
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200 
            ${
                isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`}
                    onClick={() =>
                        handleMenuItemClick(item.id, item.hasSubmenu, item.path)
                    }
                >
                    <span className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>
                        {item.icon}
                    </span>

                    {!collapsed && (
                        <>
                            <span className="flex-1 text-sm font-medium">
                                {item.label}
                            </span>
                            {item.hasSubmenu && (
                                <span className="ml-auto transform transition-transform duration-200">
                                    {isExpanded ? (
                                        <FaAngleDown />
                                    ) : (
                                        <FaAngleRight />
                                    )}
                                </span>
                            )}
                            {item.badge && (
                                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </>
                    )}
                </button>

                {/* Submenu */}
                {!collapsed && item.hasSubmenu && isExpanded && (
                    <div className="bg-gray-800 animate-slideDown">
                        {item.submenu.map((subItem) => (
                            <button
                                key={subItem.id}
                                className={`w-full flex items-center pl-12 pr-4 py-2 text-left text-sm transition-colors duration-200 
                  ${
                      activeSubItem === subItem.id
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                                onClick={() =>
                                    handleSubmenuItemClick(
                                        item.id,
                                        subItem.id,
                                        subItem.path
                                    )
                                }
                            >
                                <span className="mr-2 text-xs">
                                    {subItem.icon}
                                </span>
                                <span>{subItem.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={`bg-gray-900 text-white h-full transition-all duration-300 ease-in-out 
        ${collapsed ? 'w-16' : 'w-64'} overflow-y-auto overflow-x-hidden z-30`}
        >
            {/* Logo & Brand */}
            <div
                className={`flex items-center h-16 border-b border-gray-800 ${
                    collapsed ? 'justify-center px-2' : 'px-4'
                }`}
            >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <FaTicketAlt className="text-white" />
                </div>
                {!collapsed && (
                    <h1 className="ml-3 font-bold text-white text-lg">
                        <span className="text-blue-500">Cinema</span> Admin
                    </h1>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="mt-5 px-1">{menuItems.map(renderMenuItem)}</nav>

            {/* User Section */}
            <div className="mt-auto border-t border-gray-800 pt-2">
                <div
                    className={`flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer ${
                        collapsed ? 'justify-center' : ''
                    }`}
                >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <FaUserCog />
                    </div>

                    {!collapsed && (
                        <div className="ml-3">
                            <div className="text-sm font-medium text-gray-300">
                                Admin User
                            </div>
                            <div className="text-xs text-gray-500">
                                admin@example.com
                            </div>
                        </div>
                    )}

                    {!collapsed && (
                        <FaSignOutAlt className="ml-auto text-gray-500 hover:text-white" />
                    )}
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Sidebar;
