import React, { useState, useEffect } from 'react';

const HelpAndSupport = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [systemStatus, setSystemStatus] = useState('operational'); // 'operational', 'degraded', 'maintenance'
  const [unreadMessages, setUnreadMessages] = useState(0); // For dynamic chat badge
  const [recentTickets, setRecentTickets] = useState([]); // To simulate recent tickets
  const [faqSearchTerm, setFaqSearchTerm] = useState(''); // State for FAQ search functionality
  const [announcement, setAnnouncement] = useState(''); // State for dynamic announcements

  // Simulate fetching dynamic data on component mount
  useEffect(() => {
    // Simulate API call for system status
    const fetchSystemStatus = () => {
      // In a real app, this would be an actual API call
      setTimeout(() => {
        const statuses = ['operational', 'degraded', 'maintenance'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setSystemStatus(randomStatus);
      }, 1500); // Simulate network delay
    };

    // Simulate fetching recent tickets for a logged-in user
    const fetchRecentTickets = () => {
      // In a real app, this would fetch tickets related to the current user
      setTimeout(() => {
        setRecentTickets([
          { id: 'TKT-001', subject: 'Login issue reported', status: 'Open' },
          { id: 'TKT-002', subject: 'New report feature request', status: 'Pending' },
        ]);
      }, 2000);
    };

    // Simulate fetching a dynamic announcement
    const fetchAnnouncement = () => {
      setTimeout(() => {
        // Example: a conditional announcement
        const currentHour = new Date().getHours();
        if (currentHour >= 22 || currentHour < 6) { // 10 PM to 6 AM IST
          setAnnouncement('Heads up! Scheduled maintenance for API services is planned tonight from 1 AM - 3 AM IST.');
        } else {
          setAnnouncement('Welcome to Campus Core Support! Check out our new video tutorials.');
        }
      }, 1000);
    };


    fetchSystemStatus();
    fetchRecentTickets();
    fetchAnnouncement();

    // Simulate new chat messages arriving
    const chatInterval = setInterval(() => {
      if (isChatOpen) return; // Don't add unread count if chat is open
      setUnreadMessages(prev => prev + 1);
    }, 10000); // Simulate a new message every 10 seconds

    return () => clearInterval(chatInterval); // Cleanup on unmount

  }, [isChatOpen]); // Re-run effect if chat opens/closes

  const faqs = [
    {
      question: 'How do I add a new organization?',
      answer: 'To add a new organization, simply navigate to **Organizations** and select **Add New**. You\'ll then be prompted to fill in essential details like the organization\'s name, contact information, and administrator credentials. For a step-by-step walkthrough, refer to our detailed guide below.'
    },
    {
      question: 'How do I reset my password?',
      answer: 'If you\'ve forgotten your password, click on **"Forgot Password"** on the login page. Enter your registered email address, and we\'ll send you a password reset link. Please note, for security, these links expire in 24 hours.'
    },
    {
      question: 'How do I manage user permissions?',
      answer: 'User permissions can be managed under **User Management** > **Roles**. Here, you can assign predefined roles with specific permissions or create **custom roles** tailored to your needs within the **Advanced Settings**.'
    },
    {
      question: 'How do I generate reports?',
      answer: 'To generate comprehensive reports, go to **Analytics** > **Report Builder**. You can select various data parameters and choose your preferred visualization type. Reports can be scheduled for automatic generation or exported in multiple formats.'
    }
  ];

  const resources = [
    { title: 'Admin User Guide', link: '/docs/admin-guide.pdf' },
    { title: 'API Documentation', link: '/docs/api-reference' },
    { title: 'Video Tutorials', link: '/resources/tutorials' },
    { title: 'Compliance Handbook', link: '/docs/compliance.pdf' }
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      console.log('Message sent:', chatMessage);
      setChatMessage('');
      alert('Your message has been sent! Our support team will get back to you shortly.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'maintenance': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'All systems are currently operational.';
      case 'degraded': return 'Some services may be experiencing degraded performance.';
      case 'maintenance': return 'Scheduled maintenance is in progress. Some services may be unavailable.';
      default: return 'Status unavailable.';
    }
  };

  const openChat = () => {
    setIsChatOpen(true);
    setUnreadMessages(0); // Reset unread count when chat opens
  };

  // Filtered FAQs based on search term
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(faqSearchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ml-64 p-6 bg-gray-50 m-2 rounded-lg shadow-md">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Help & Support Center</h1>
        <p className="text-gray-600">
          Your comprehensive resource for managing the Campus Core Admin Dashboard effectively. Find answers, submit requests, and access valuable documentation.
        </p>
        {announcement && (
          <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md shadow-sm flex items-center justify-between animate-fade-in">
            <p className="font-medium text-sm">{announcement}</p>
            <button
              onClick={() => setAnnouncement('')}
              className="text-blue-600 hover:text-blue-900 focus:outline-none ml-4"
              aria-label="Dismiss announcement"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Support Channels Card */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <SupportIcon className="text-blue-600 mr-3 h-6 w-6" />
            <h2 className="text-xl font-semibold text-gray-800">Contact Support</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Email Support</h3>
              <a
                href="mailto:support@campuscore.com"
                className="text-blue-600 hover:underline flex items-center"
              >
                support@campuscore.com
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Typically 24-48h response</span>
              </a>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Phone Support</h3>
              <p className="text-gray-800">+1 (800) 123-4567</p>
              <p className="text-sm text-gray-600">Available Monday - Friday: 8 AM - 6 PM IST</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Emergency Support</h3>
              <p className="text-gray-800">+1 (800) 765-4321</p>
              <p className="text-sm text-gray-600">24/7 for critical system-down issues</p>
            </div>
          </div>
        </div>

        {/* Ticketing System Card */}
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <TicketIcon className="text-indigo-600 mr-3 h-6 w-6" />
            <h2 className="text-xl font-semibold text-gray-800">Support Tickets</h2>
          </div>

          <p className="text-gray-700 mb-4">
            Submit and conveniently track the status of your support requests through our dedicated portal.
          </p>

          <div className="space-y-3">
            <a
              href="https://support.campuscore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Submit New Ticket
            </a>

            <a
              href="https://support.campuscore.com/tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:underline ml-4"
            >
              View Existing Tickets
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-indigo-100">
            <h3 className="font-medium text-gray-700 mb-2">System Status</h3>
            <div className="flex items-center text-sm">
              <span className={`w-3 h-3 ${getStatusColor(systemStatus)} rounded-full mr-2`}></span>
              <span>{getStatusText(systemStatus)}</span>
            </div>
            {recentTickets.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700 text-sm mb-2">Your Recent Tickets:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {recentTickets.map(ticket => (
                    <li key={ticket.id}>
                      <strong>{ticket.id}:</strong> {ticket.subject} (Status: {ticket.status})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <FaqIcon className="text-purple-600 mr-3 h-6 w-6" />
          <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        </div>

        {/* FAQ Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
            value={faqSearchTerm}
            onChange={(e) => setFaqSearchTerm(e.target.value)}
          />
        </div>

        <dl className="border rounded-lg overflow-hidden">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="border-b last:border-b-0">
                <dt>
                  <button
                    aria-expanded={activeFAQ === index}
                    aria-controls={`faq-${index}`}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <span className="text-gray-500 transform transition-transform">
                      {activeFAQ === index ? '−' : '+'}
                    </span>
                  </button>
                </dt>

                <dd
                  id={`faq-${index}`}
                  className={`${activeFAQ === index ? 'block' : 'hidden'} p-4 pt-0 bg-gray-50 text-gray-700`}
                >
                  <p>{faq.answer}</p>
                  {index === 0 && ( // Example of conditional link for the first FAQ
                    <a
                      href="/docs/organization-management"
                      className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                    >
                      View detailed guide
                    </a>
                  )}
                </dd>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-600">No FAQs found matching your search.</p>
          )}
        </dl>
      </div>

      {/* Documentation & Resources */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <DocumentIcon className="text-amber-600 mr-3 h-6 w-6" />
          <h2 className="text-2xl font-semibold text-gray-800">Documentation & Resources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-start focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              <div className="bg-gray-100 p-2 rounded-md mr-4">
                <DocumentIcon className="text-gray-600 h-5 w-5" />
              </div>
              <span className="font-medium text-gray-800 hover:text-blue-600">
                {resource.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Additional Support Options */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Support Options</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Live Chat */}
          <div className="text-center p-4 bg-white rounded-lg border relative">
            <ChatIcon className="text-green-600 mx-auto h-8 w-8 mb-2" />
            <h3 className="font-medium text-gray-800 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-3">Get instant assistance during business hours.</p>

            {unreadMessages > 0 && !isChatOpen && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                {unreadMessages}
              </span>
            )}

            {!isChatOpen ? (
              <button
                onClick={openChat}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Start Chat
              </button>
            ) : (
              <div className="mt-2">
                <form onSubmit={handleChatSubmit}>
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your question or issue here..."
                    className="w-full p-2 border rounded text-sm mb-2 focus:ring focus:ring-green-200 focus:border-green-300"
                    rows="2"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChatOpen(false)}
                      className="flex-1 bg-gray-300 text-gray-800 text-sm py-1 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Close Chat
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Community Forum */}
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="mx-auto h-8 w-8 mb-2 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Community Forum</h3>
            <p className="text-sm text-gray-600 mb-3">Connect with other Campus Core administrators and share insights.</p>
            <a
              href="https://community.campuscore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Visit Forum
            </a>
          </div>

          {/* Training Sessions */}
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="mx-auto h-8 w-8 mb-2 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Training Sessions</h3>
            <p className="text-sm text-gray-600 mb-3">Book personalized training to maximize your Campus Core experience.</p>
            <a
              href="/training"
              className="text-sm text-blue-600 hover:underline"
            >
              Schedule Session
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Support Icons Component (remain as is, they are already clean and functional)
const FaqIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SupportIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const DocumentIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TicketIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
  </svg>
);

const ChatIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export default HelpAndSupport;