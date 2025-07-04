import { Star, MapPin, Clock, CheckCircle, Heart } from 'lucide-react';
import { useState } from 'react';

const TutorCard = ({ tutor, onSelect, onContact }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Avatar and basic info */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            {tutor.verified && (
              <div className="absolute -bottom-1 -right-1">
                <CheckCircle className="h-6 w-6 text-accent-500 bg-white rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{tutor.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{tutor.rating}</span>
                  <span className="ml-1">({tutor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{tutor.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Subjects */}
          <div className="flex flex-wrap gap-2 mb-3">
            {tutor.subjects.slice(0, 3).map((subject) => (
              <span
                key={subject}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {subject}
              </span>
            ))}
            {tutor.subjects.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{tutor.subjects.length - 3} more
              </span>
            )}
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tutor.bio}</p>

          {/* Bottom info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{tutor.experience} yrs exp</span>
              </div>
              <div className="font-semibold text-gray-900">
                ${tutor.hourlyRate}/hr
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onContact(tutor)}
                className="btn btn-secondary text-sm px-4 py-2"
              >
                Message
              </button>
              <button
                onClick={() => onSelect(tutor)}
                className="btn btn-primary text-sm px-4 py-2"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;