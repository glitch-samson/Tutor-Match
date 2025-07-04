import { supabase, handleSupabaseError } from '../lib/supabaseClient';

// API Response wrapper
const createResponse = (data, success = true, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString()
});

// Auth API
export const authAPI = {
  async login(credentials) {
    const { email, password } = credentials;
    
    console.log('Attempting login for:', email);
    
    try {
      // Try Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase auth failed:', error.message);
        throw new Error('Invalid email or password');
      }

      if (data.user) {
        console.log('Login successful');
        return createResponse(data.user, true, 'Login successful');
      }

      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Invalid email or password');
    }
  },

  async register(userData) {
    const { email, password, name, userType, bio, education, experience, hourlyRate, subjects, languages, location } = userData;
    
    console.log('Attempting registration for:', email, 'as', userType);
    
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            user_type: userType
          }
        }
      });

      if (error) {
        console.error('Supabase auth signup failed:', error.message);
        throw new Error(error.message || 'Registration failed');
      }

      if (!data.user) {
        throw new Error('Failed to create user account');
      }

      const userId = data.user.id;
      console.log('Supabase auth successful, creating profile...');

      // Create profile
      const profileData = {
        id: userId,
        name,
        user_type: userType,
        email,
        avatar_url: `https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add tutor-specific fields
      if (userType === 'tutor') {
        profileData.bio = bio || '';
        profileData.education = education || '';
        profileData.experience = parseInt(experience) || 0;
        profileData.hourly_rate = parseInt(hourlyRate) || 0;
        profileData.subjects = subjects || [];
        profileData.languages = languages || ['English'];
        profileData.location = location || '';
        profileData.verified = false;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert(profileData);

      if (profileError) {
        console.error('Profile creation failed:', profileError);
        throw new Error('Failed to create profile');
      }

      console.log('Profile created successfully');

      // If tutor, create entry in tutors table
      if (userType === 'tutor') {
        console.log('Creating tutor entry...');
        
        const { error: tutorError } = await supabase
          .from('tutors')
          .insert({
            name,
            avatar_url: profileData.avatar_url,
            subjects: subjects || [],
            experience: parseInt(experience) || 0,
            hourly_rate: parseInt(hourlyRate) || 0,
            rating: 0,
            review_count: 0,
            location: location || '',
            bio: bio || '',
            availability: 'Flexible schedule',
            verified: false,
            languages: languages || ['English'],
            education: education || '',
            created_at: new Date().toISOString()
          });

        if (tutorError) {
          console.warn('Tutor entry creation failed:', tutorError);
        } else {
          console.log('Tutor entry created successfully');
        }
      }

      console.log('Registration successful');
      return createResponse(data.user, true, 'Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  },

  async logout() {
    console.log('Logging out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.warn('Supabase logout error:', error);
      throw new Error('Failed to sign out');
    }
    return createResponse(null, true, 'Logged out successfully');
  }
};

// User API
export const userAPI = {
  async getProfile(userId) {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        console.log('No profile found for user');
        return createResponse(null);
      }

      if (error) {
        console.error('Profile fetch error:', error);
        throw new Error('Failed to fetch profile');
      }

      console.log('Profile fetched successfully');
      return createResponse(data);
    } catch (error) {
      console.error('Error in getProfile:', error);
      throw error;
    }
  },

  async updateProfile(userId, updates) {
    try {
      console.log('Updating profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        throw new Error('Failed to update profile');
      }

      console.log('Profile updated successfully');
      return createResponse(data, true, 'Profile updated successfully');
    } catch (error) {
      console.error('Error in updateProfile:', error);
      throw error;
    }
  },

  async getDashboardStats(userId, userType) {
    try {
      console.log('Fetching dashboard stats for:', userId, userType);
      
      if (userType === 'tutor') {
        // Get tutor's bookings and stats
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('tutor_id', userId);

        if (bookingsError && bookingsError.code !== 'PGRST116') {
          console.error('Bookings fetch error:', bookingsError);
        }

        const completedBookings = bookings?.filter(b => b.status === 'completed') || [];
        const upcomingBookings = bookings?.filter(b => b.status === 'upcoming') || [];
        const totalEarnings = completedBookings.reduce((sum, booking) => sum + (parseFloat(booking.cost) || 0), 0);
        const uniqueStudents = new Set(bookings?.map(b => b.user_id)).size || 0;

        // Get tutor's rating
        const { data: tutorData } = await supabase
          .from('tutors')
          .select('rating, review_count')
          .eq('name', userId) // Assuming name matches for now
          .single();

        const stats = {
          totalBookings: bookings?.length || 0,
          upcomingLessons: upcomingBookings.length,
          totalEarnings: totalEarnings.toFixed(2),
          averageRating: tutorData?.rating || 0,
          totalStudents: uniqueStudents,
          hoursCompleted: Math.round(completedBookings.reduce((sum, booking) => sum + (parseInt(booking.duration) || 60), 0) / 60)
        };

        return createResponse(stats);
      } else {
        // Get student's bookings and stats
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', userId);

        if (bookingsError && bookingsError.code !== 'PGRST116') {
          console.error('Bookings fetch error:', bookingsError);
        }

        const completedBookings = bookings?.filter(b => b.status === 'completed') || [];
        const upcomingBookings = bookings?.filter(b => b.status === 'upcoming') || [];
        const totalSpent = completedBookings.reduce((sum, booking) => sum + (parseFloat(booking.cost) || 0), 0);

        const stats = {
          totalBookings: bookings?.length || 0,
          upcomingLessons: upcomingBookings.length,
          completedLessons: completedBookings.length,
          totalSpent: totalSpent.toFixed(2),
          hoursLearned: Math.round(completedBookings.reduce((sum, booking) => sum + (parseInt(booking.duration) || 60), 0) / 60)
        };

        return createResponse(stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return default stats if there's an error
      const defaultStats = {
        totalBookings: 0,
        upcomingLessons: 0,
        totalEarnings: '0.00',
        totalSpent: '0.00',
        averageRating: 0,
        totalStudents: 0,
        completedLessons: 0,
        hoursCompleted: 0,
        hoursLearned: 0
      };
      return createResponse(defaultStats);
    }
  },

  async getRecentActivity(userId, userType) {
    try {
      console.log('Fetching recent activity for:', userId);
      
      const activities = [];

      // Get recent bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*, profiles!bookings_user_id_fkey(name)')
        .eq(userType === 'tutor' ? 'tutor_id' : 'user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (bookings) {
        bookings.forEach(booking => {
          activities.push({
            id: `booking-${booking.id}`,
            type: 'booking',
            message: userType === 'tutor' 
              ? `New booking from ${booking.profiles?.name || 'Student'}`
              : `Booking confirmed with tutor`,
            time: new Date(booking.created_at).toLocaleString(),
            icon: 'Calendar'
          });
        });
      }

      return createResponse(activities.slice(0, 4));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return createResponse([]);
    }
  },

  async getUpcomingLessons(userId, userType) {
    try {
      console.log('Fetching upcoming lessons for:', userId);
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select(`
          *,
          ${userType === 'tutor' ? 'profiles!bookings_user_id_fkey(name)' : 'tutors!bookings_tutor_id_fkey(name)'}
        `)
        .eq(userType === 'tutor' ? 'tutor_id' : 'user_id', userId)
        .eq('status', 'upcoming')
        .order('date', { ascending: true })
        .limit(5);

      const lessons = (bookings || []).map(booking => ({
        id: booking.id,
        student: userType === 'tutor' 
          ? booking.profiles?.name || 'Student'
          : booking.tutors?.name || 'Tutor',
        subject: booking.subject,
        time: `${booking.date} ${booking.time}`,
        duration: `${booking.duration} minutes`
      }));

      return createResponse(lessons);
    } catch (error) {
      console.error('Error fetching upcoming lessons:', error);
      return createResponse([]);
    }
  }
};

// Booking API
export const bookingAPI = {
  async getBookings(userId, filters = {}) {
    try {
      console.log('Fetching bookings for user:', userId);
      
      let query = supabase
        .from('bookings')
        .select(`
          *,
          tutor:tutors!bookings_tutor_id_fkey(name, avatar_url)
        `)
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error && error.code !== 'PGRST116') {
        console.error('Bookings fetch error:', error);
        throw new Error('Failed to fetch bookings');
      }

      // Transform data to match expected format
      const transformedData = (data || []).map(booking => ({
        ...booking,
        tutor: {
          name: booking.tutor?.name || 'Unknown Tutor',
          avatar: booking.tutor?.avatar_url || 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100'
        }
      }));

      return createResponse(transformedData);
    } catch (error) {
      console.error('Error in getBookings:', error);
      throw error;
    }
  },

  async createBooking(bookingData) {
    try {
      console.log('Creating booking:', bookingData);
      
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: bookingData.userId,
          tutor_id: bookingData.tutorId,
          subject: bookingData.subject,
          date: bookingData.date,
          time: bookingData.time,
          duration: bookingData.duration,
          cost: bookingData.totalCost,
          notes: bookingData.message,
          status: 'upcoming',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Booking creation error:', error);
        throw new Error('Failed to create booking');
      }

      console.log('Booking created successfully');
      return createResponse(data, true, 'Booking created successfully');
    } catch (error) {
      console.error('Error in createBooking:', error);
      throw error;
    }
  },

  async cancelBooking(bookingId) {
    try {
      console.log('Cancelling booking:', bookingId);
      
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select()
        .single();

      if (error) {
        console.error('Booking cancellation error:', error);
        throw new Error('Failed to cancel booking');
      }

      console.log('Booking cancelled successfully');
      return createResponse(data, true, 'Booking cancelled successfully');
    } catch (error) {
      console.error('Error in cancelBooking:', error);
      throw error;
    }
  }
};

// Settings API
export const settingsAPI = {
  async getSettings(userId) {
    try {
      console.log('Fetching settings for user:', userId);
      
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // No settings found, return defaults
        const defaultSettings = {
          emailNotifications: true,
          pushNotifications: true,
          smsNotifications: false,
          bookingReminders: true,
          marketingEmails: false,
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
          allowMessages: true,
          language: 'en',
          timezone: 'UTC-5',
          twoFactorAuth: false,
          autoLogout: 30
        };
        return createResponse(defaultSettings);
      }

      if (error) {
        console.error('Settings fetch error:', error);
        throw new Error('Failed to fetch settings');
      }

      return createResponse(data.settings || {});
    } catch (error) {
      console.error('Error in getSettings:', error);
      throw error;
    }
  },

  async updateSettings(userId, settings) {
    try {
      console.log('Updating settings for user:', userId);
      
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          settings,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Settings update error:', error);
        throw new Error('Failed to update settings');
      }

      console.log('Settings updated successfully');
      return createResponse(data.settings, true, 'Settings updated successfully');
    } catch (error) {
      console.error('Error in updateSettings:', error);
      throw error;
    }
  }
};

// Tutors API
export const tutorsAPI = {
  async getTutors(filters = {}) {
    try {
      console.log('Fetching tutors with filters:', filters);
      
      let query = supabase
        .from('tutors')
        .select('*')
        .order('rating', { ascending: false });

      // Apply filters
      if (filters.search) {
        const searchTerm = `%${filters.search}%`;
        query = query.or(`name.ilike.${searchTerm},bio.ilike.${searchTerm}`);
      }

      if (filters.subject) {
        query = query.contains('subjects', [filters.subject]);
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        if (max === '+') {
          query = query.gte('hourly_rate', parseInt(min));
        } else {
          query = query.gte('hourly_rate', parseInt(min)).lte('hourly_rate', parseInt(max));
        }
      }

      if (filters.rating) {
        query = query.gte('rating', parseFloat(filters.rating));
      }

      if (filters.verified) {
        query = query.eq('verified', true);
      }

      const { data, error } = await query;

      if (error && error.code !== 'PGRST116') {
        console.error('Tutors fetch error:', error);
        throw new Error('Failed to fetch tutors');
      }

      // Transform data to match expected format
      const transformedData = (data || []).map(tutor => ({
        ...tutor,
        hourlyRate: tutor.hourly_rate,
        reviewCount: tutor.review_count || 0,
        avatar: tutor.avatar_url
      }));

      console.log(`Fetched ${transformedData.length} tutors`);
      return createResponse(transformedData);
    } catch (error) {
      console.error('Error in getTutors:', error);
      throw error;
    }
  },

  async getTutor(tutorId) {
    try {
      console.log('Fetching tutor:', tutorId);
      
      const { data, error } = await supabase
        .from('tutors')
        .select('*')
        .eq('id', parseInt(tutorId))
        .single();

      if (error && error.code === 'PGRST116') {
        console.log('Tutor not found');
        return createResponse(null);
      }

      if (error) {
        console.error('Tutor fetch error:', error);
        throw new Error('Failed to fetch tutor');
      }

      // Transform data to match expected format
      const transformedData = {
        ...data,
        hourlyRate: data.hourly_rate,
        reviewCount: data.review_count || 0,
        avatar: data.avatar_url
      };

      console.log('Tutor fetched successfully');
      return createResponse(transformedData);
    } catch (error) {
      console.error('Error in getTutor:', error);
      throw error;
    }
  }
};

// Reviews API
export const reviewsAPI = {
  async createReview(reviewData) {
    try {
      console.log('Creating review:', reviewData);
      
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          tutor_id: reviewData.tutorId,
          student_id: reviewData.studentId,
          booking_id: reviewData.bookingId,
          rating: reviewData.rating,
          comment: reviewData.comment,
          subject: reviewData.subject,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Review creation error:', error);
        throw new Error('Failed to create review');
      }

      console.log('Review created successfully');
      return createResponse(data, true, 'Review submitted successfully');
    } catch (error) {
      console.error('Error in createReview:', error);
      throw error;
    }
  },

  async getReviews(tutorId) {
    try {
      console.log('Fetching reviews for tutor:', tutorId);
      
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          student:profiles!reviews_student_id_fkey(name)
        `)
        .eq('tutor_id', tutorId)
        .order('created_at', { ascending: false });

      if (error && error.code !== 'PGRST116') {
        console.error('Reviews fetch error:', error);
        throw new Error('Failed to fetch reviews');
      }

      // Transform data to match expected format
      const transformedData = (data || []).map(review => ({
        ...review,
        studentName: review.student?.name || 'Anonymous',
        date: new Date(review.created_at).toLocaleDateString()
      }));

      console.log(`Fetched ${transformedData.length} reviews`);
      return createResponse(transformedData);
    } catch (error) {
      console.error('Error in getReviews:', error);
      throw error;
    }
  }
};