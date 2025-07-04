import { Search, Star, Users, BookOpen, ArrowRight } from 'lucide-react';

const Hero = ({ onGetStarted, onNavigate }) => {
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div>
      {/* Main Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Find Your Perfect
              <span className="text-primary-600 dark:text-primary-400 block">Tutor Today</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with verified, experienced tutors for personalized learning. 
              From math and science to languages and test prep - we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => onGetStarted('student')}
                className="btn btn-primary text-lg px-8 py-4"
              >
                I'm a Student
              </button>
              <button
                onClick={() => onGetStarted('tutor')}
                className="btn btn-secondary text-lg px-8 py-4"
              >
                I'm a Tutor
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-4 mb-4">
                  <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">10,000+</h3>
                <p className="text-gray-600 dark:text-gray-300">Verified Tutors</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-accent-100 dark:bg-accent-900 rounded-full p-4 mb-4">
                  <BookOpen className="h-8 w-8 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">50,000+</h3>
                <p className="text-gray-600 dark:text-gray-300">Lessons Completed</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full p-4 mb-4">
                  <Star className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.9/5</h3>
                <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Learn More About TutorMatch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover how we're revolutionizing online education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Us Card */}
            <div 
              onClick={() => handleNavigation('about')}
              className="card p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">About Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Learn about our mission to democratize education and meet the passionate team behind TutorMatch.
              </p>
              <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-2 transition-transform">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* Contact Us Card */}
            <div 
              onClick={() => handleNavigation('contact')}
              className="card p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="bg-accent-100 dark:bg-accent-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-10 w-10 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Have questions? Need support? Get in touch with our friendly team who's here to help you succeed.
              </p>
              <div className="flex items-center justify-center text-accent-600 dark:text-accent-400 font-medium group-hover:translate-x-2 transition-transform">
                Get in Touch <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>

            {/* FAQ Card */}
            <div 
              onClick={() => handleNavigation('faq')}
              className="card p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="bg-secondary-100 dark:bg-secondary-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="h-10 w-10 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">FAQ</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Find quick answers to common questions about our platform, tutoring process, and policies.
              </p>
              <div className="flex items-center justify-center text-secondary-600 dark:text-secondary-400 font-medium group-hover:translate-x-2 transition-transform">
                View FAQ <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Get started in just three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Find Your Tutor</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse our verified tutors, filter by subject, price, and availability to find your perfect match.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Book a Session</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule your lesson at a convenient time and choose between online or in-person sessions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Start Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Attend your session, learn from expert tutors, and track your progress towards your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have already transformed their learning experience with TutorMatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onGetStarted('student')}
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Find a Tutor
            </button>
            <button
              onClick={() => onGetStarted('tutor')}
              className="bg-primary-700 hover:bg-primary-800 px-8 py-4 rounded-lg font-semibold text-lg transition-colors border border-primary-500"
            >
              Become a Tutor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;