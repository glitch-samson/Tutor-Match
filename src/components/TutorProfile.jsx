import { Star, MapPin, Clock, CheckCircle, ArrowLeft, Calendar, MessageCircle, Languages, GraduationCap } from 'lucide-react';
import { reviews } from '../data/mockData';

const TutorProfile = ({ tutor, onBack, onBooking }) => {
  const tutorReviews = reviews.filter(review => review.tutorId === tutor.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2">
          <div className="card p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="relative flex-shrink-0">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                {tutor.verified && (
                  <div className="absolute -bottom-2 -right-2">
                    <CheckCircle className="h-8 w-8 text-accent-500 bg-white rounded-full" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{tutor.rating}</span>
                    <span className="ml-1">({tutor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{tutor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>{tutor.experience} years experience</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{tutor.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Education
                  </h4>
                  <p className="text-gray-600">{tutor.education}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Languages className="h-5 w-5 mr-2" />
                    Languages
                  </h4>
                  <p className="text-gray-600">{tutor.languages.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reviews ({tutorReviews.length})
            </h3>
            <div className="space-y-4">
              {tutorReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.studentName}</h4>
                      <p className="text-sm text-gray-500">{review.subject} • {review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div>
          <div className="card p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900">${tutor.hourlyRate}</div>
              <div className="text-gray-600">per hour</div>
            </div>
            
            <div className="space-y-4 mb-6">
              <button
                onClick={() => onBooking(tutor)}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book a Session
              </button>
              <button className="btn btn-secondary w-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
              <p className="text-gray-600 text-sm">{tutor.availability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;