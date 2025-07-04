import { ChevronDown, ChevronUp, Search, Book, Users, CreditCard, Shield, Headphones } from 'lucide-react';
import { useState } from 'react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    { id: 'general', label: 'General', icon: Book },
    { id: 'students', label: 'For Students', icon: Users },
    { id: 'tutors', label: 'For Tutors', icon: Users },
    { id: 'payments', label: 'Payments & Billing', icon: CreditCard },
    { id: 'safety', label: 'Safety & Security', icon: Shield },
    { id: 'support', label: 'Technical Support', icon: Headphones }
  ];

  const faqData = {
    general: [
      {
        question: 'What is TutorMatch?',
        answer: 'TutorMatch is an online platform that connects students with qualified tutors for personalized learning experiences. We offer tutoring in various subjects from elementary to university level.'
      },
      {
        question: 'How does TutorMatch work?',
        answer: 'Students can browse our database of verified tutors, filter by subject, price, and availability, then book sessions directly through our platform. All sessions can be conducted online or in-person depending on preference.'
      },
      {
        question: 'Is TutorMatch free to use?',
        answer: 'Creating an account and browsing tutors is completely free. You only pay for the tutoring sessions you book. There are no subscription fees or hidden charges.'
      },
      {
        question: 'What subjects are available?',
        answer: 'We offer tutoring in over 100 subjects including Math, Science, Languages, Test Prep (SAT, ACT, GRE), Computer Science, Arts, and many more. If you don\'t see your subject, contact us!'
      }
    ],
    students: [
      {
        question: 'How do I find the right tutor?',
        answer: 'Use our advanced search filters to find tutors by subject, price range, availability, rating, and teaching style. You can also read reviews from other students and view tutor profiles before booking.'
      },
      {
        question: 'What if I\'m not satisfied with my tutor?',
        answer: 'We offer a satisfaction guarantee. If you\'re not happy with your first session, we\'ll help you find a new tutor or provide a full refund. Your success is our priority.'
      },
      {
        question: 'How do I book a tutoring session?',
        answer: 'Once you find a tutor you like, click "Book Now" on their profile, select your preferred date and time, choose the session duration, and complete the payment. You\'ll receive a confirmation email with session details.'
      },
      {
        question: 'Can I have regular sessions with the same tutor?',
        answer: 'Absolutely! Many students prefer consistency and book regular weekly or bi-weekly sessions with their favorite tutors. You can set up recurring bookings for convenience.'
      },
      {
        question: 'What happens if I need to cancel a session?',
        answer: 'You can cancel sessions up to 24 hours before the scheduled time for a full refund. Cancellations within 24 hours may incur a fee, but we understand emergencies happen and handle each case individually.'
      }
    ],
    tutors: [
      {
        question: 'How do I become a tutor on TutorMatch?',
        answer: 'Apply through our tutor application process. We verify your qualifications, conduct background checks, and provide training. The process typically takes 3-5 business days.'
      },
      {
        question: 'What qualifications do I need?',
        answer: 'Requirements vary by subject, but generally include relevant education (degree or certification), teaching experience, and passing our assessment. We also value passion for teaching and strong communication skills.'
      },
      {
        question: 'How much can I earn as a tutor?',
        answer: 'Tutors set their own rates, typically ranging from $20-100+ per hour depending on subject, experience, and qualifications. Top tutors on our platform earn $2000+ per month.'
      },
      {
        question: 'How do I get paid?',
        answer: 'Payments are processed automatically after each completed session. You can choose to receive payments weekly or monthly via direct deposit, PayPal, or other supported methods.'
      },
      {
        question: 'Can I teach multiple subjects?',
        answer: 'Yes! If you\'re qualified in multiple subjects, you can create separate profiles for each or list multiple subjects on one profile. This can help you reach more students.'
      }
    ],
    payments: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely.'
      },
      {
        question: 'When am I charged for a session?',
        answer: 'Payment is processed when you book a session. The funds are held securely and released to the tutor after the session is completed successfully.'
      },
      {
        question: 'Are there any additional fees?',
        answer: 'We charge a small platform fee (typically 5-10%) to cover payment processing and platform maintenance. This fee is clearly displayed before you complete your booking.'
      },
      {
        question: 'Can I get a refund?',
        answer: 'Yes, we offer refunds for cancelled sessions (with proper notice), unsatisfactory first sessions, and technical issues that prevent session completion. Refunds are processed within 3-5 business days.'
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'For regular students, we offer package deals and payment plans. Contact our support team to discuss options that work for your budget and learning goals.'
      }
    ],
    safety: [
      {
        question: 'How do you verify tutors?',
        answer: 'All tutors undergo a comprehensive verification process including identity verification, background checks, qualification verification, and reference checks. We also monitor ongoing performance and reviews.'
      },
      {
        question: 'Is my personal information safe?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your data. We never share personal information with third parties without your consent.'
      },
      {
        question: 'Are online sessions secure?',
        answer: 'Our video platform uses end-to-end encryption and secure servers. Sessions are not recorded unless both parties agree, and we have strict policies against inappropriate behavior.'
      },
      {
        question: 'What if I encounter inappropriate behavior?',
        answer: 'Report any concerns immediately through our platform. We have a zero-tolerance policy for inappropriate behavior and will take swift action including account suspension and legal action if necessary.'
      },
      {
        question: 'Can parents monitor sessions?',
        answer: 'For students under 18, parents can request to monitor sessions or receive session summaries. We encourage parental involvement while respecting student privacy and learning independence.'
      }
    ],
    support: [
      {
        question: 'What if I have technical issues during a session?',
        answer: 'Our technical support team is available 24/7 to help resolve issues quickly. If technical problems prevent a session from completing, you\'ll receive a full refund or free rescheduling.'
      },
      {
        question: 'What are the system requirements?',
        answer: 'You need a stable internet connection, a device with camera and microphone (computer, tablet, or smartphone), and a modern web browser. Our platform works on Windows, Mac, iOS, and Android.'
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach us via live chat (available 24/7), email (support@tutormatch.com), phone, or through the help section in your account. We typically respond within 1 hour.'
      },
      {
        question: 'Do you have a mobile app?',
        answer: 'Yes! Our mobile apps for iOS and Android offer full functionality including browsing tutors, booking sessions, attending video calls, and managing your account. Download from your app store.'
      },
      {
        question: 'What if the platform is down?',
        answer: 'We maintain 99.9% uptime, but if issues occur, we\'ll notify users immediately and provide alternative access methods. Any sessions affected by platform issues are automatically rescheduled or refunded.'
      }
    ]
  };

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData[activeCategory].filter(
    faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Frequently Asked <span className="text-primary-600 dark:text-primary-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about TutorMatch. 
              Can't find what you're looking for? Contact our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
                <nav className="space-y-2">
                  {categories.map(category => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeCategory === category.id
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {category.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No results found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search terms or browse different categories.
                    </p>
                  </div>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <div key={index} className="card">
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedItems.has(index) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedItems.has(index) && (
                        <div className="px-6 pb-4">
                          <div className="border-t dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Still Need Help?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Our support team is here to help you with any questions or issues.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <Headphones className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get instant help</p>
              <button className="btn btn-primary text-sm">Start Chat</button>
            </div>
            
            <div className="card p-6">
              <Book className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Help Center</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Browse guides & tutorials</p>
              <button className="btn btn-secondary text-sm">Visit Help Center</button>
            </div>
            
            <div className="card p-6">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Email our team</p>
              <button className="btn btn-secondary text-sm">Send Email</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;