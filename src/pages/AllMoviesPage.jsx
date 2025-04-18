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
    FaSearch
} from 'react-icons/fa';

const AllMoviesPage = () => {
    // Sample movie data
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
        {
            id: 2,
            title: 'The Last Symphony',
            poster: '/poster2.jpg',
            genre: 'Drama, Music',
            duration: 135,
            releaseDate: '2025-02-10',
            status: 'Showing',
            rating: 4.6,
            language: 'English',
            director: 'Sofia Coppola',
            description: "A musician's journey to perform one last masterpiece."
        },
        {
            id: 3,
            title: 'Midnight in Tokyo',
            poster: '/poster3.jpg',
            genre: 'Romance, Comedy',
            duration: 118,
            releaseDate: '2025-02-28',
            status: 'Coming Soon',
            rating: 4.2,
            language: 'English, Japanese',
            director: 'Hirokazu Kore-eda',
            description:
                'Two strangers meet in Tokyo and spend an unforgettable night exploring the city.'
        },
        {
            id: 4,
            title: 'The Lost City',
            poster: '/poster4.jpg',
            genre: 'Adventure, Action',
            duration: 155,
            releaseDate: '2024-12-05',
            status: 'Showing',
            rating: 4.5,
            language: 'English',
            director: 'Denis Villeneuve',
            description:
                'An explorer discovers a hidden city with ancient secrets.'
        },
        {
            id: 5,
            title: 'Whispers in the Dark',
            poster: '/poster5.jpg',
            genre: 'Horror, Thriller',
            duration: 112,
            releaseDate: '2025-01-20',
            status: 'Showing',
            rating: 4.0,
            language: 'English',
            director: 'Jordan Peele',
            description:
                "A family moves into a new house only to discover it's haunted by its previous owners."
        },
        {
            id: 6,
            title: 'The Race',
            poster: '/poster6.jpg',
            genre: 'Sports, Drama',
            duration: 128,
            releaseDate: '2024-11-15',
            status: 'Ended',
            rating: 4.3,
            language: 'English',
            director: 'Ryan Coogler',
            description:
                'A young athlete overcomes personal tragedy to compete in the Olympics.'
        },
        {
            id: 7,
            title: 'Parallel Lives',
            poster: '/poster7.jpg',
            genre: 'Sci-Fi, Drama',
            duration: 145,
            releaseDate: '2025-03-15',
            status: 'Coming Soon',
            rating: 0,
            language: 'English',
            director: 'Christopher Nolan',
            description:
                'A scientist discovers a way to see into alternate realities where different versions of himself exist.'
        }
    ]);

    // State for filters and search
    const [filters, setFilters] = useState({
        status: 'all',
        genre: 'all'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Get unique genres from movie data
    const genres = [
        ...new Set(movies.flatMap((movie) => movie.genre.split(', ')))
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

        // Filter by search term
        if (
            searchTerm &&
            !movie.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Genre
                                </label>
                                <select
                                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        </div>
                    </div>
                )}
            </div>

            {/* Movies grid */}
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

            {/* Pagination */}
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

            {/* Movie Details Modal */}
            {selectedMovie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg font-medium">
                                {selectedMovie.title}
                            </h3>
                            <button
                                onClick={() => setSelectedMovie(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1 bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                                    {/* Placeholder for movie poster */}
                                    <div className="text-gray-500">
                                        Poster Image
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="mb-4">
                                        <h4 className="text-gray-500 text-sm">
                                            Description
                                        </h4>
                                        <p className="text-gray-800">
                                            {selectedMovie.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Director
                                            </h4>
                                            <p className="text-gray-800">
                                                {selectedMovie.director}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Genre
                                            </h4>
                                            <p className="text-gray-800">
                                                {selectedMovie.genre}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Duration
                                            </h4>
                                            <p className="text-gray-800">
                                                {selectedMovie.duration} minutes
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Language
                                            </h4>
                                            <p className="text-gray-800">
                                                {selectedMovie.language}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Release Date
                                            </h4>
                                            <p className="text-gray-800">
                                                {selectedMovie.releaseDate}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Status
                                            </h4>
                                            <p className="text-gray-800">
                                                {selectedMovie.status}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-500 text-sm">
                                                Rating
                                            </h4>
                                            <div className="flex items-center">
                                                <FaStar className="text-yellow-500 mr-1" />
                                                <span className="text-gray-800">
                                                    {selectedMovie.rating > 0
                                                        ? selectedMovie.rating.toFixed(
                                                              1
                                                          )
                                                        : 'Not Rated'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <h4 className="text-lg font-medium mb-4">
                                    Showtimes
                                </h4>
                                <p className="text-gray-500">
                                    No showtimes available for this movie.
                                </p>

                                <div className="mt-4 flex justify-end gap-3">
                                    <button
                                        onClick={() => setSelectedMovie(null)}
                                        className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-50"
                                    >
                                        Close
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                        Edit Movie
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllMoviesPage;
