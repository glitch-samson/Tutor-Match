import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from 'lucide-react';
import { useState } from 'react';
import { showAlert } from './CustomAlert';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'student'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      showAlert('success', 'Thank you for your message! We\'ll get back to you within 24 hours.', {
        title: 'Message Sent',
        duration: 5000
      });
      setFormData({ name: '', email: '', subject: '', message: '', userType: 'student' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@tutormatch.com',
      availability: '24/7 response within 4 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      availability: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant help available',
      contact: 'Available on platform',
      availability: 'Mon-Fri: 8AM-8PM EST'
    },
    {
      icon: Headphones,
      title: 'Video Call',
      description: 'Schedule a call',
      contact: 'Book a session',
      availability: 'By appointment'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Education St, Suite 100',
      zipCode: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-4567'
    },
    {
      city: 'New York',
      address: '456 Learning Ave, Floor 15',
      zipCode: 'New York, NY 10001',
      phone: '+1 (555) 987-6543'
    },
    {
      city: 'London',
      address: '789 Knowledge Rd, Office 200',
      zipCode: 'London, UK EC1A 1BB',
      phone: '+44 20 7123 4567'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I find a tutor?',
      answer: 'Most students find a suitable tutor within 24 hours. Our matching algorithm helps connect you with the best tutors for your needs.'
    },
    {
      question: 'What if I\'m not satisfied with my tutor?',
      answer: 'We offer a satisfaction guarantee. If you\'re not happy with your first session, we\'ll help you find a new tutor or provide a full refund.'
    },
    {
      question: 'How do I become a tutor?',
      answer: 'Apply through our tutor application process. We verify qualifications, conduct background checks, and provide training to ensure quality.'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Get in <span className="text-primary-600 dark:text-primary-400">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions? Need support? Want to partner with us? 
              We're here to help and would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">How Can We Help?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Choose the best way to reach us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{method.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{method.description}</p>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{method.contact}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{method.availability}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    I am a *
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="parent">Parent</option>
                    <option value="institution">Educational Institution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="input resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex items-center justify-center py-3"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Offices</h2>
              <div className="space-y-6 mb-8">
                {offices.map((office, index) => (
                  <div key={index} className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                      <p>{office.address}</p>
                      <p>{office.zipCode}</p>
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {office.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-sm text-primary-700 dark:text-primary-300">
                      <strong>Emergency Support:</strong> Available 24/7 for urgent platform issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Answers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Common questions we receive</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Need more detailed answers?
            </p>
            <button className="btn btn-primary">
              View Full FAQ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;