// Updated Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Container = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Set sidebar closed by default on mobile devices
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Initial check on component mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header - fixed at the top */}
            <div className="fixed top-0 w-full z-40 bg-white shadow">
                <Header onToggleSidebar={toggleSidebar} />
            </div>

            <div className="flex flex-1 pt-16">
                {' '}
                {/* Add padding top to account for fixed header */}
                {/* Sidebar - fixed on the left side */}
                <div
                    className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                    ${sidebarOpen ? 'md:w-64' : 'md:w-16'} w-64`}
                >
                    <Sidebar
                        collapsed={!sidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                </div>
                {/* Overlay for mobile when sidebar is open */}
                {sidebarOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                        onClick={toggleSidebar}
                    ></div>
                )}
                {/* Main content - adjusted with left margin to make space for sidebar */}
                <div
                    className={`flex-1 transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'} ml-0 p-6`}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Container;
