// src/pages/AllMoviesPage.jsx
import React, { useState } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaStar,
    FaCalendarAlt,
    FaClock,
    FaFilter,
    FaSearch,
    FaTheaterMasks
} from 'react-icons/fa';

const AllMoviesPage = () => {
    // Sample movie data (unchanged)
    // eslint-disable-next-line
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'Space Adventure 3',
            poster: '/poster1.jpg',
            genre: 'Sci-Fi, Action',
            duration: 142,
            releaseDate: '2025-01-15',
            status: 'Showing',
            rating: 4.8,
            language: 'English',
            director: 'James Cameron',
            description:
                'The third installment in the epic Space Adventure series.'
        },
        // ... other movies
    ]);

    // Enhanced state for filters
    const [filters, setFilters] = useState({
        status: 'all',
        genre: 'all',
        language: 'all',
        cinema: 'all',
        releaseYear: 'all',
        duration: 'all',
        rating: 'all'
    });

    // Sample cinema data
    const cinemas = [
        { id: 1, name: 'CGV Cinema' },
        { id: 2, name: 'Galaxy Cinema' },
        { id: 3, name: 'Lotte Cinema' }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // Get unique genres, languages, and years from movie data
    const genres = [...new Set(movies.flatMap((movie) => movie.genre.split(', ')))];
    const languages = [...new Set(movies.map((movie) => movie.language))];
    const years = [...new Set(movies.map((movie) => new Date(movie.releaseDate).getFullYear()))].sort();
    
    // Duration ranges
    const durationRanges = [
        { id: 'all', label: 'All Durations' },
        { id: 'short', label: 'Short (< 90 min)' },
        { id: 'medium', label: 'Medium (90-120 min)' },
        { id: 'long', label: 'Long (> 120 min)' }
    ];
    
    // Rating ranges
    const ratingRanges = [
        { id: 'all', label: 'All Ratings' },
        { id: 'high', label: 'High (4.5+)' },
        { id: 'medium', label: 'Medium (3.5-4.4)' },
        { id: 'low', label: 'Low (< 3.5)' }
    ];

    // Filter movies based on filter state and search term
    const filteredMovies = movies.filter((movie) => {
        // Filter by status
        if (filters.status !== 'all' && movie.status !== filters.status) {
            return false;
        }

        // Filter by genre
        if (filters.genre !== 'all' && !movie.genre.includes(filters.genre)) {
            return false;
        }
        
        // Filter by language
        if (filters.language !== 'all' && !movie.language.includes(filters.language)) {
            return false;
        }
        
        // Filter by release year
        if (filters.releaseYear !== 'all') {
            const movieYear = new Date(movie.releaseDate).getFullYear().toString();
            if (movieYear !== filters.releaseYear) {
                return false;
            }
        }
        
        // Filter by duration
        if (filters.duration !== 'all') {
            if (filters.duration === 'short' && movie.duration >= 90) {
                return false;
            } else if (filters.duration === 'medium' && (movie.duration < 90 || movie.duration > 120)) {
                return false;
            } else if (filters.duration === 'long' && movie.duration <= 120) {
                return false;
            }
        }
        
        // Filter by rating
        if (filters.rating !== 'all') {
            if (filters.rating === 'high' && movie.rating < 4.5) {
                return false;
            } else if (filters.rating === 'medium' && (movie.rating < 3.5 || movie.rating >= 4.5)) {
                return false;
            } else if (filters.rating === 'low' && movie.rating >= 3.5) {
                return false;
            }
        }
        
        // Filter by date range
        if (dateRange.start && dateRange.end) {
            const movieDate = new Date(movie.releaseDate);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            
            if (movieDate < startDate || movieDate > endDate) {
                return false;
            }
        }

        // Filter by search term
        if (
            searchTerm &&
            !movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !movie.director.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return false;
        }

        return true;
    });

    // State for viewing movie details
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Toggle movie details view
    const toggleMovieDetails = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movie);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">All Movies</h1>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <FaPlus className="mr-2" />
                    Add Movie
                </button>
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

                    <div className="flex items-center">
                        <div className="mr-2 flex-shrink-0">
                            <select
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.status}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        status: e.target.value
                                    })
                                }
                            >
                                <option value="all">All Status</option>
                                <option value="Showing">Showing</option>
                                <option value="Coming Soon">Coming Soon</option>
                                <option value="Ended">Ended</option>
                            </select>
                        </div>

                        <div className="mr-2 flex-shrink-0">
                            <select
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.cinema}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        cinema: e.target.value
                                    })
                                }
                            >
                                <option value="all">All Cinemas</option>
                                {cinemas.map(cinema => (
                                    <option key={cinema.id} value={cinema.name}>
                                        {cinema.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-3 py-2 border rounded-md hover:bg-gray-50"
                        >
                            <FaFilter className="mr-2 text-gray-500" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Expanded filters */}
                {showFilters && (
                    <div className="p-4 bg-gray-50 border-b">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Language
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.language}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            language: e.target.value
                                        })
                                    }
                                >
                                    <option value="all">All Languages</option>
                                    {languages.map((language) => (
                                        <option key={language} value={language}>
                                            {language}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Release Year
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.releaseYear}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            releaseYear: e.target.value
                                        })
                                    }
                                >
                                    <option value="all">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.duration}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            duration: e.target.value
                                        })
                                    }
                                >
                                    {durationRanges.map((range) => (
                                        <option key={range.id} value={range.id}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rating
                                </label>
                                <select
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filters.rating}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            rating: e.target.value
                                        })
                                    }
                                >
                                    {ratingRanges.map((range) => (
                                        <option key={range.id} value={range.id}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Release Date Range
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={dateRange.start}
                                        onChange={(e) =>
                                            setDateRange({
                                                ...dateRange,
                                                start: e.target.value
                                            })
                                        }
                                    />
                                    <span className="text-gray-500 flex items-center">to</span>
                                    <input
                                        type="date"
                                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    </div>
                )}
            </div>

            {/* Movies grid - remain unchanged */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="relative h-64 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="p-4 bg-black bg-opacity-50 text-white w-full">
                                        <h3 className="font-bold text-lg truncate">
                                            {movie.title}
                                        </h3>
                                        <p className="text-sm">{movie.genre}</p>
                                    </div>
                                </div>

                                {/* Status badge */}
                                <div
                                    className={`absolute top-2 right-2 px-2 py-1 text-xs text-white rounded ${
                                        movie.status === 'Showing'
                                            ? 'bg-green-500'
                                            : movie.status === 'Coming Soon'
                                              ? 'bg-blue-500'
                                              : 'bg-red-500'
                                    }`}
                                >
                                    {movie.status}
                                </div>
                            </div>

                            <div className="p-4 bg-white">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <FaClock className="text-gray-500 mr-1" />
                                        <span className="text-sm text-gray-700">
                                            {movie.duration} min
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-500 mr-1" />
                                        <span className="text-sm text-gray-700">
                                            {movie.rating > 0
                                                ? movie.rating.toFixed(1)
                                                : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    <FaCalendarAlt className="text-gray-500 mr-1" />
                                    <span className="text-sm text-gray-700">
                                        {movie.releaseDate}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        onClick={() =>
                                            toggleMovieDetails(movie)
                                        }
                                        className="px-3 py-1 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                                    >
                                        <FaEye className="mr-1" />
                                        Details
                                    </button>

                                    <div>
                                        <button className="p-1 text-blue-600 hover:text-blue-800 mr-2">
                                            <FaEdit />
                                        </button>
                                        <button className="p-1 text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredMovies.length === 0 && (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500">
                                No movies found matching your criteria.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination - unchanged */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    Showing {filteredMovies.length} of {movies.length} movies
                </div>
                <div className="flex">
                    <button className="px-3 py-1 bg-white text-gray-600 border rounded-l hover:bg-gray-50 disabled:opacity-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600">
                        1
                    </button>
                    <button className="px-3 py-1 bg-white text-gray-600 border hover:bg-gray-50">
                        2
                    </button>
                    <button className="px-3 py-1 bg-white text-gray-600 border rounded-r hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>

            {/* Movie Details Modal - unchanged */}
            {selectedMovie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        {/* Modal content */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllMoviesPage;