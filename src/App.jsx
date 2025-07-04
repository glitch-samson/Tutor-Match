import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import SearchFilters from './components/SearchFilters';
import TutorList from './components/TutorList';
import TutorProfile from './components/TutorProfile';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import AuthGuard from './components/AuthGuard';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import MyBookings from './components/MyBookings';
import Settings from './components/Settings';
import { AlertManager, showAlert } from './components/CustomAlert';
import { ThemeProvider } from './components/ThemeProvider';
import { authAPI, userAPI, bookingAPI, tutorsAPI } from './services/api';
import { useApi } from './hooks/useApi';
import { supabase } from './lib/supabaseClient';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [tutorsList, setTutorsList] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    priceRange: '',
    rating: '',
    verified: false,
    availableNow: false
  });

  const { execute: executeAuth } = useApi();
  const { execute: executeUser } = useApi();
  const { execute: executeBooking } = useApi();
  const { execute: executeTutors } = useApi();

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing authentication...');
        
        // Check Supabase session first
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setIsInitializing(false);
          return;
        }

        if (session?.user) {
          console.log('Found active Supabase session');
          await loadUserProfile(session.user);
        } else {
          console.log('No active session found');
          setCurrentView('home');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        showAlert('error', 'Failed to initialize authentication');
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || !session) {
        setCurrentUser(null);
        setCurrentView('home');
      } else if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user profile from backend
  const loadUserProfile = async (user) => {
    try {
      console.log('Loading user profile for:', user.id);
      
      const response = await executeUser(() => userAPI.getProfile(user.id));
      
      if (response.data) {
        const userData = {
          id: user.id,
          email: user.email,
          name: response.data.name || user.user_metadata?.name || user.email.split('@')[0],
          type: response.data.user_type || 'student',
          avatar: response.data.avatar_url || `https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100`,
          phone: response.data.phone,
          location: response.data.location,
          bio: response.data.bio,
          subjects: response.data.subjects || [],
          hourlyRate: response.data.hourly_rate,
          experience: response.data.experience,
          education: response.data.education,
          languages: response.data.languages || ['English'],
          verified: response.data.verified || false
        };

        setCurrentUser(userData);
        setCurrentView('dashboard');
        console.log('User profile loaded successfully');
      } else {
        // Profile doesn't exist, create basic user data
        const userData = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email.split('@')[0],
          type: 'student',
          avatar: `https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100`,
          verified: false,
          subjects: [],
          languages: ['English']
        };

        setCurrentUser(userData);
        setCurrentView('dashboard');
        console.log('Created basic user profile');
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      showAlert('error', 'Failed to load user profile');
    }
  };

  // Load tutors from backend
  useEffect(() => {
    const loadTutors = async () => {
      try {
        const response = await executeTutors(() => tutorsAPI.getTutors(filters));
        setTutorsList(response.data || []);
      } catch (error) {
        console.error('Failed to load tutors:', error);
        showAlert('error', 'Failed to load tutors');
        setTutorsList([]);
      }
    };

    if (currentView === 'search') {
      loadTutors();
    }
  }, [filters, currentView, executeTutors]);

  // Filter tutors based on search criteria
  const filteredTutors = useMemo(() => {
    if (!tutorsList.length) return [];
    
    return tutorsList.filter(tutor => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(searchTerm);
        const matchesSubject = tutor.subjects?.some(subject => 
          subject.toLowerCase().includes(searchTerm)
        );
        const matchesBio = tutor.bio?.toLowerCase().includes(searchTerm);
        if (!matchesName && !matchesSubject && !matchesBio) return false;
      }

      // Subject filter
      if (filters.subject && !tutor.subjects?.includes(filters.subject)) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(p => 
          p === '+' ? Infinity : parseInt(p)
        );
        const rate = tutor.hourlyRate || tutor.hourly_rate || 0;
        if (rate < min || (max !== Infinity && rate > max)) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating && tutor.rating < parseFloat(filters.rating)) {
        return false;
      }

      // Verified filter
      if (filters.verified && !tutor.verified) {
        return false;
      }

      return true;
    });
  }, [tutorsList, filters]);

  const handleAuth = async (userData, isSignUp = false) => {
    try {
      console.log('Attempting authentication:', { isSignUp, email: userData.email });
      
      const response = await executeAuth(
        () => isSignUp ? authAPI.register(userData) : authAPI.login(userData),
        {
          showSuccessAlert: true,
          successMessage: `Welcome ${isSignUp ? 'to TutorMatch' : 'back'}!`
        }
      );

      console.log('Authentication successful');
      setShowAuthModal(false);
      
      // The auth state change listener will handle setting user and redirecting
    } catch (error) {
      console.error('Auth failed:', error);
      showAlert('error', error.message || 'Authentication failed. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await executeAuth(
        () => authAPI.logout(),
        {
          showSuccessAlert: true,
          successMessage: 'Successfully signed out'
        }
      );
    } catch (error) {
      console.error('Sign out failed:', error);
      showAlert('error', 'Failed to sign out');
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await executeUser(
        () => userAPI.updateProfile(currentUser.id, updatedUser),
        {
          showSuccessAlert: true,
          successMessage: 'Profile updated successfully!'
        }
      );

      // Update current user state with new data
      const newUserData = { ...currentUser, ...response.data };
      setCurrentUser(newUserData);
    } catch (error) {
      console.error('Profile update failed:', error);
      showAlert('error', 'Failed to update profile');
    }
  };

  const handleGetStarted = (userType) => {
    if (!currentUser) {
      setShowAuthModal(true);
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleSelectTutor = async (tutor) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      // Load full tutor profile from backend
      const response = await executeTutors(() => tutorsAPI.getTutor(tutor.id));
      setSelectedTutor(response.data || tutor);
      setCurrentView('tutor-profile');
    } catch (error) {
      console.error('Failed to load tutor profile:', error);
      setSelectedTutor(tutor);
      setCurrentView('tutor-profile');
    }
  };

  const handleBooking = (tutor) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    setSelectedTutor(tutor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async (bookingData) => {
    try {
      await executeBooking(
        () => bookingAPI.createBooking({
          ...bookingData,
          userId: currentUser.id,
          tutorId: bookingData.tutor.id
        }),
        {
          showSuccessAlert: true,
          successMessage: `Booking confirmed with ${bookingData.tutor.name} for ${bookingData.date} at ${bookingData.time}!`
        }
      );

      setShowBookingModal(false);
      setCurrentView('bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      showAlert('error', 'Failed to create booking');
    }
  };

  const handleContactTutor = (tutor) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    showAlert('info', `Opening message interface with ${tutor.name}`, {
      title: 'Message',
      duration: 3000
    });
  };

  const handleShowAuth = () => {
    setShowAuthModal(true);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  // Show simple loading while initializing
  if (isInitializing) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              TutorMatch
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Protected route check
  const protectedViews = ['dashboard', 'search', 'tutor-profile', 'profile', 'bookings', 'settings'];
  const isProtectedRoute = protectedViews.includes(currentView);
  const shouldShowAuthGuard = isProtectedRoute && !currentUser;

  const renderCurrentView = () => {
    if (shouldShowAuthGuard) {
      return <AuthGuard onShowAuth={handleShowAuth} />;
    }

    switch (currentView) {
      case 'home':
        return <Hero onGetStarted={handleGetStarted} onNavigate={handleNavigate} />;
      
      case 'about':
        return <AboutUs />;
      
      case 'contact':
        return <ContactUs />;
      
      case 'faq':
        return <FAQ />;
      
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      
      case 'search':
        return (
          <>
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
            <TutorList
              tutors={filteredTutors}
              onSelectTutor={handleSelectTutor}
              onContactTutor={handleContactTutor}
            />
          </>
        );
      
      case 'tutor-profile':
        return selectedTutor ? (
          <TutorProfile
            tutor={selectedTutor}
            onBack={() => setCurrentView('search')}
            onBooking={handleBooking}
          />
        ) : null;
      
      case 'profile':
        return (
          <UserProfile
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      
      case 'bookings':
        return <MyBookings currentUser={currentUser} />;
      
      case 'settings':
        return (
          <Settings
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
        );
      
      default:
        return <Hero onGetStarted={handleGetStarted} onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header 
          currentUser={currentUser} 
          onAuthChange={handleSignOut}
          onShowAuth={handleShowAuth}
          currentView={currentView}
          onNavigate={handleNavigate}
        />
        
        <main>
          {['home', 'about', 'contact', 'faq'].includes(currentView) ? (
            renderCurrentView()
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderCurrentView()}
            </div>
          )}
        </main>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
        />

        {/* Booking Modal */}
        {showBookingModal && selectedTutor && currentUser && (
          <BookingModal
            tutor={selectedTutor}
            onClose={() => setShowBookingModal(false)}
            onConfirm={handleConfirmBooking}
          />
        )}

        {/* Custom Alert System */}
        <AlertManager />
      </div>
    </ThemeProvider>
  );
}

export default App;