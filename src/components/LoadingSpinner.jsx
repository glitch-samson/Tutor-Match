import { BookOpen, Users, Star } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'default' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-primary-500`}></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {message && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

// Enhanced loading animation for full page
export const FullPageLoader = ({ message = 'Loading TutorMatch...' }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo animation */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4 animate-pulse">
            TutorMatch
          </h1>
          
          {/* Floating icons animation */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
              <div className="bg-accent-100 dark:bg-accent-900 rounded-full p-3">
                <Users className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
              <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full p-3">
                <Star className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin border-t-primary-500 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading message */}
        <p className="text-lg text-gray-600 dark:text-gray-400 animate-pulse">
          {message}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;