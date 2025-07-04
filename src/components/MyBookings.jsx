import { Calendar, Clock, User, MapPin, MessageCircle, Video, Phone, Star, X, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { useApi } from '../hooks/useApi';

const MyBookings = ({ currentUser }) => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { execute } = useApi();

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      try {
        const response = await execute(() => bookingAPI.getBookings(currentUser.id, { status: filter }));
        setBookings(response.data || []);
      } catch (error) {
        console.error('Failed to load bookings:', error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [currentUser.id, filter, execute]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    try {
      await execute(() => bookingAPI.cancelBooking(selectedBooking.id));
      setBookings(prev => prev.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
      setShowCancelModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const handleLeaveReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const submitReview = (rating, comment) => {
    setBookings(prev => prev.map(booking => 
      booking.id === selectedBooking.id 
        ? { ...booking, rating, reviewComment: comment }
        : booking
    ));
    setShowReviewModal(false);
    setSelectedBooking(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const BookingCard = ({ booking }) => (
    <div className="card p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <img
            src={booking.tutor.avatar}
            alt={booking.tutor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{booking.tutor.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{booking.subject}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{booking.time} ({booking.duration}min)</span>
        </div>
      </div>

      {booking.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Notes:</strong> {booking.notes}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          ${booking.cost}
        </div>
        
        <div className="flex space-x-2">
          {booking.status === 'upcoming' && (
            <>
              <button className="btn btn-secondary text-sm px-3 py-1">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </button>
              <button className="btn btn-primary text-sm px-3 py-1">
                <Video className="h-4 w-4 mr-1" />
                Join
              </button>
              <button 
                onClick={() => handleCancelBooking(booking)}
                className="btn bg-red-500 text-white hover:bg-red-600 text-sm px-3 py-1"
              >
                Cancel
              </button>
            </>
          )}
          
          {booking.status === 'completed' && !booking.rating && (
            <button 
              onClick={() => handleLeaveReview(booking)}
              className="btn btn-primary text-sm px-3 py-1"
            >
              <Star className="h-4 w-4 mr-1" />
              Review
            </button>
          )}
          
          {booking.status === 'completed' && booking.rating && (
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current mr-1" />
              <span className="text-sm">{booking.rating}/5</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Bookings</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Bookings</h1>
        <div className="flex space-x-2">
          {['all', 'upcoming', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No bookings found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {filter === 'all' 
              ? "You haven't made any bookings yet." 
              : `No ${filter} bookings found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Cancel Booking</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to cancel your booking with {selectedBooking?.tutor.name}? 
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="btn btn-secondary flex-1"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="btn bg-red-500 text-white hover:bg-red-600 flex-1"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          booking={selectedBooking}
          onClose={() => setShowReviewModal(false)}
          onSubmit={submitReview}
        />
      )}
    </div>
  );
};

const ReviewModal = ({ booking, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating, comment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Leave a Review</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <img
            src={booking.tutor.avatar}
            alt={booking.tutor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">{booking.tutor.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{booking.subject}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`h-8 w-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                >
                  <Star className="h-full w-full fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="input resize-none"
              placeholder="Share your experience with this tutor..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <button type="button" onClick={onClose} className="btn btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-1">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyBookings;