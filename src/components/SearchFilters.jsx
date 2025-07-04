import { Search, MapPin, DollarSign, Star } from 'lucide-react';
import { subjects } from '../data/mockData';

const SearchFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tutors or subjects..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Subject */}
        <div>
          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="input"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="input pl-10"
          >
            <option value="">Any Price</option>
            <option value="0-30">$0 - $30/hr</option>
            <option value="30-50">$30 - $50/hr</option>
            <option value="50-70">$50 - $70/hr</option>
            <option value="70+">$70+/hr</option>
          </select>
        </div>

        {/* Rating */}
        <div className="relative">
          <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="input pl-10"
          >
            <option value="">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => handleFilterChange('verified', !filters.verified)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filters.verified
              ? 'bg-primary-100 text-primary-700 border border-primary-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Verified Only
        </button>
        <button
          onClick={() => handleFilterChange('availableNow', !filters.availableNow)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filters.availableNow
              ? 'bg-accent-100 text-accent-700 border border-accent-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Available Now
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;