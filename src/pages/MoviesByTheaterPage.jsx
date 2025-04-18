import React, { useState } from 'react';
import {
    FaSearch,
    FaFilm,
    FaClock,
    FaCalendarAlt,
    FaStar,
    FaRegBuilding,
    FaTheaterMasks,
    FaChevronDown,
    FaChevronUp,
    FaFilter
} from 'react-icons/fa';

const MoviesByTheaterPage = () => {
    // Sample theaters data
    const theaters = [
        {
            id: 1,
            name: 'Cineplex Downtown',
            address: '123 Main Street, Downtown, NY 10001'
        },
        {
            id: 2,
            name: 'MovieMax Central',
            address: '456 Broadway Avenue, Central, NY 10002'
        },
        {
            id: 3,
            name: 'Starlight Cinema',
            address: '789 Park Road, Uptown, NY 10003'
        },
        {
            id: 4,
            name: 'Grand Theater',
            address: '101 Queens Boulevard, Queens, NY 11101'
        }
    ];

    // Sample movies data with theater assignments
    const movies = [
        {
            id: 1,
            title: 'Space Adventure 3',
            genre: 'Sci-Fi, Action',
            duration: 142,
            releaseDate: '2025-01-15',
            rating: 4.8,
            poster: '/movie1.jpg',
            showtimes: [
                { theaterId: 1, times: ['10:00', '14:30', '18:00', '21:30'] },
                { theaterId: 2, times: ['11:15', '15:45', '20:15'] },
                { theaterId: 4, times: ['12:30', '17:00', '21:00'] }
            ]
        },
        {
            id: 2,
            title: 'The Last Symphony',
            genre: 'Drama, Music',
            duration: 135,
            releaseDate: '2025-02-10',
            rating: 4.6,
            poster: '/movie2.jpg',
            showtimes: [
                { theaterId: 2, times: ['11:30', '16:00', '19:30'] },
                { theaterId: 3, times: ['13:00', '17:30', '20:00'] }
            ]
        },
        {
            id: 3,
            title: 'Midnight in Tokyo',
            genre: 'Romance, Comedy',
            duration: 118,
            releaseDate: '2025-02-28',
            rating: 4.2,
            poster: '/movie3.jpg',
            showtimes: [
                { theaterId: 1, times: ['12:15', '17:45', '22:00'] },
                { theaterId: 3, times: ['14:00', '19:15'] },
                { theaterId: 4, times: ['10:30', '15:15', '19:45'] }
            ]
        },
        {
            id: 4,
            title: 'The Lost City',
            genre: 'Adventure, Action',
            duration: 155,
            releaseDate: '2024-12-05',
            rating: 4.5,
            poster: '/movie4.jpg',
            showtimes: [
                { theaterId: 1, times: ['11:00', '15:00', '19:00'] },
                { theaterId: 2, times: ['12:00', '16:30', '20:30'] },
                { theaterId: 4, times: ['13:45', '18:15', '21:45'] }
            ]
        },
        {
            id: 5,
            title: 'Whispers in the Dark',
            genre: 'Horror, Thriller',
            duration: 112,
            releaseDate: '2025-01-20',
            rating: 4.0,
            poster: '/movie5.jpg',
            showtimes: [
                { theaterId: 2, times: ['13:30', '18:45', '22:15'] },
                { theaterId: 3, times: ['16:15', '20:45'] }
            ]
        }
    ];

    // State for selected theater and filters
    const [selectedTheaterId, setSelectedTheaterId] = useState(theaters[0].id);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedMovieId, setExpandedMovieId] = useState(null);
    const [filters, setFilters] = useState({
        genre: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);

    // Get all unique genres
    const allGenres = [
        ...new Set(movies.flatMap((movie) => movie.genre.split(', ')))
    ].sort();

    // Filter movies by selected theater and search term
    const filteredMovies = movies.filter((movie) => {
        // Filter by theater
        const hasTheater = movie.showtimes.some(
            (showtime) => showtime.theaterId === selectedTheaterId
        );
        if (!hasTheater) return false;

        // Filter by search term
        if (
            searchTerm &&
            !movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }

        // Filter by genre
        if (filters.genre !== 'all' && !movie.genre.includes(filters.genre)) {
            return false;
        }

        return true;
    });

    // Get theater name by id
    const getTheaterName = (theaterId) => {
        const theater = theaters.find((theater) => theater.id === theaterId);
        return theater ? theater.name : 'Unknown Theater';
    };

    // Toggle movie expansion
    const toggleMovieExpand = (movieId) => {
        if (expandedMovieId === movieId) {
            setExpandedMovieId(null);
        } else {
            setExpandedMovieId(movieId);
        }
    };

    // Format time
    const formatShowtimes = (times) => {
        // Parse times and sort them
        return times.sort((a, b) => {
            const [aHour, aMinute] = a.split(':').map(Number);
            const [bHour, bMinute] = b.split(':').map(Number);

            if (aHour !== bHour) return aHour - bHour;
            return aMinute - bMinute;
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Movies by Theater
                </h1>
            </div>

            {/* Theater Selection */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-medium text-gray-800">
                        Select Theater
                    </h2>
                </div>

                <div className="p-4 flex flex-wrap gap-3">
                    {theaters.map((theater) => (
                        <button
                            key={theater.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                selectedTheaterId === theater.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedTheaterId(theater.id)}
                        >
                            <FaRegBuilding className="inline mr-2" />
                            {theater.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                    >
                        <FaFilter className="mr-2 text-gray-500" />
                        Filters
                    </button>
                </div>

                {/* Expanded filters */}
                {showFilters && (
                    <div className="p-4 bg-gray-50 border-b">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Genre
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.genre}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            genre: e.target.value
                                        })
                                    }
                                >
                                    <option value="all">All Genres</option>
                                    {allGenres.map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Theater Info */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <FaTheaterMasks size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-gray-800">
                            {getTheaterName(selectedTheaterId)}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {
                                theaters.find(
                                    (theater) =>
                                        theater.id === selectedTheaterId
                                )?.address
                            }
                        </p>
                    </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                    Showing {filteredMovies.length} movies at this theater
                </div>
            </div>

            {/* Movies List */}
            <div className="space-y-4">
                {filteredMovies.map((movie) => {
                    // Get showtimes for this theater
                    const theaterShowtimes = movie.showtimes.find(
                        (showtime) => showtime.theaterId === selectedTheaterId
                    );

                    return (
                        <div
                            key={movie.id}
                            className="bg-white rounded-lg shadow overflow-hidden"
                        >
                            {/* Movie header */}
                            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <FaFilm className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            {movie.title}
                                        </h3>
                                        <div className="text-sm text-gray-600">
                                            {movie.genre}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="flex items-center text-sm text-gray-600 mr-4">
                                        <FaStar className="text-yellow-500 mr-1" />
                                        <span>{movie.rating}</span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            toggleMovieExpand(movie.id)
                                        }
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {expandedMovieId === movie.id ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Showtimes for selected theater */}
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="flex items-center">
                                        <FaClock className="text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-700">
                                            {movie.duration} min
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <FaCalendarAlt className="text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-700">
                                            {movie.releaseDate}
                                        </span>
                                    </div>

                                    <div className="flex items-center md:justify-end">
                                        <span className="text-sm font-medium text-gray-700 mr-2">
                                            Showtimes:
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {formatShowtimes(
                                                theaterShowtimes.times
                                            ).map((time, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                                                >
                                                    {time}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded movie details */}
                            {expandedMovieId === movie.id && (
                                <div className="p-4 bg-gray-50 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-3">
                                                Movie Information
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit.
                                                Nulla vitae elit libero, a
                                                pharetra augue. Nullam id dolor
                                                id nibh ultricies vehicula ut id
                                                elit.
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-500">
                                                        Director:
                                                    </span>
                                                    <span className="ml-1 text-gray-700">
                                                        John Director
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">
                                                        Cast:
                                                    </span>
                                                    <span className="ml-1 text-gray-700">
                                                        Actor 1, Actor 2
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">
                                                        Language:
                                                    </span>
                                                    <span className="ml-1 text-gray-700">
                                                        English
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">
                                                        Subtitle:
                                                    </span>
                                                    <span className="ml-1 text-gray-700">
                                                        Yes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-3">
                                                Showtimes at All Theaters
                                            </h4>
                                            <div className="space-y-3">
                                                {movie.showtimes.map(
                                                    (showtime) => (
                                                        <div
                                                            key={
                                                                showtime.theaterId
                                                            }
                                                            className="border-b pb-2 last:border-b-0 last:pb-0"
                                                        >
                                                            <div className="font-medium text-gray-700 mb-1">
                                                                {getTheaterName(
                                                                    showtime.theaterId
                                                                )}
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {formatShowtimes(
                                                                    showtime.times
                                                                ).map(
                                                                    (
                                                                        time,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className={`px-2 py-1 text-xs rounded-full ${
                                                                                showtime.theaterId ===
                                                                                selectedTheaterId
                                                                                    ? 'bg-blue-100 text-blue-800'
                                                                                    : 'bg-gray-100 text-gray-800'
                                                                            }`}
                                                                        >
                                                                            {
                                                                                time
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredMovies.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500">
                            No movies found for this theater matching your
                            criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesByTheaterPage;
