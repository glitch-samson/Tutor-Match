import { Lock, UserPlus } from 'lucide-react';

const AuthGuard = ({ onShowAuth }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-primary-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <Lock className="h-12 w-12 text-primary-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Sign In Required
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Please sign in to access tutors, book sessions, and manage your learning journey. 
          Join thousands of students and tutors already using TutorMatch.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => onShowAuth(true)}
            className="btn btn-primary w-full flex items-center justify-center py-3"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Sign In / Sign Up
          </button>
          
          <p className="text-sm text-gray-500">
            Free to join • No credit card required
          </p>
        </div>
        
        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-1 gap-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Find Expert Tutors</h4>
              <p className="text-xs text-gray-600">Browse verified tutors across all subjects</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Book Sessions</h4>
              <p className="text-xs text-gray-600">Schedule lessons at your convenience</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">Track Progress</h4>
              <p className="text-xs text-gray-600">Monitor your learning journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard;