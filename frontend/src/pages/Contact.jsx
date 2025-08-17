import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  PhoneCall,
  MessageCircle,
  Calendar,
  CreditCard,
  FileText,
  Users,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Eye,
  Bone,
  Activity,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Navigation,
  Car,
  Bus,
  Accessibility
} from "lucide-react";

// Hero Section
const ContactHeroSection = ({ className = "" }) => {
  return (
    <section className={`relative bg-gradient-to-br from-[#1F4E79] via-blue-600 to-blue-700 text-white overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 rotate-45 border border-white/20"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 rotate-45 border border-white/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Contact
            <span className="block text-blue-200">Our Team</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
            We're here to help you with appointments, questions, and any healthcare needs. Reach out to us anytime.
          </p>
          
          {/* Quick Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Phone className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-blue-100 text-sm">(123) 456-7890</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Mail className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-blue-100 text-sm">info@healthcare.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-blue-100 text-sm">123 Medical Center Drive</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Emergency Contact Section
const EmergencyContactSection = ({ className = "" }) => {
  return (
    <section className={`py-12 bg-red-500 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8" />
            <h2 className="text-2xl lg:text-3xl font-bold">Medical Emergency?</h2>
          </div>
          <p className="text-xl text-red-100 mb-6">
            For life-threatening emergencies, call 911 immediately or visit our Emergency Department
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:911"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-xl shadow-lg"
            >
              <PhoneCall className="w-6 h-6" />
              Call 911
            </a>
            
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold text-xl border-2 border-white/20"
            >
              <Phone className="w-6 h-6" />
              Hospital: (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Form Section
const ContactFormSection = ({ className = "" }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    department: '',
    message: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        message: '',
        preferredContact: 'email'
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const departments = [
    'General Inquiry',
    'Appointments',
    'Billing & Insurance',
    'Medical Records',
    'Patient Services',
    'Emergency Department',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Other'
  ];

  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours during business days.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                {/* Department & Subject */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition-all duration-200 resize-vertical"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#1F4E79] border-gray-300 focus:ring-[#1F4E79]"
                      />
                      <span className="ml-2 text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#1F4E79] border-gray-300 focus:ring-[#1F4E79]"
                      />
                      <span className="ml-2 text-gray-700">Phone</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're here to help with any questions or concerns. Choose the best way to reach us below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#1F4E79]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-3">Speak directly with our staff</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Main:</strong> (123) 456-7890</p>
                      <p><strong>Appointments:</strong> (123) 456-7891</p>
                      <p><strong>Billing:</strong> (123) 456-7892</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-3">Send us a detailed message</p>
                    <div className="space-y-1 text-sm">
                      <p><strong>General:</strong> info@healthcare.com</p>
                      <p><strong>Appointments:</strong> appointments@healthcare.com</p>
                      <p><strong>Billing:</strong> billing@healthcare.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-gray-600 mb-3">Chat with our support team</p>
                    <button className="text-[#1F4E79] font-medium hover:underline">
                      Start Live Chat →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Hours</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between font-semibold text-red-600">
                      <span>Emergency:</span>
                      <span>24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Department Directory Section
const DepartmentDirectorySection = ({ className = "" }) => {
  const departments = [
    {
      icon: Calendar,
      name: "Appointments",
      phone: "(123) 456-7891",
      email: "appointments@healthcare.com",
      description: "Schedule, reschedule, or cancel appointments"
    },
    {
      icon: CreditCard,
      name: "Billing & Insurance",
      phone: "(123) 456-7892",
      email: "billing@healthcare.com",
      description: "Questions about bills, payments, and insurance"
    },
    {
      icon: FileText,
      name: "Medical Records",
      phone: "(123) 456-7893",
      email: "records@healthcare.com",
      description: "Request copies of medical records and test results"
    },
    {
      icon: Users,
      name: "Patient Services",
      phone: "(123) 456-7894",
      email: "patientservices@healthcare.com",
      description: "General patient support and assistance"
    },
    {
      icon: Heart,
      name: "Cardiology",
      phone: "(123) 456-7895",
      email: "cardiology@healthcare.com",
      description: "Heart and cardiovascular care inquiries"
    },
    {
      icon: Brain,
      name: "Neurology",
      phone: "(123) 456-7896",
      email: "neurology@healthcare.com",
      description: "Brain and nervous system care"
    },
    {
      icon: Baby,
      name: "Pediatrics",
      phone: "(123) 456-7897",
      email: "pediatrics@healthcare.com",
      description: "Children's healthcare services"
    },
    {
      icon: Activity,
      name: "Emergency Department",
      phone: "(123) 456-7890",
      email: "emergency@healthcare.com",
      description: "24/7 emergency medical care"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Department Directory
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect directly with the right department for your specific needs
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.name}
                className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#1F4E79] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {dept.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {dept.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <a
                      href={`tel:${dept.phone}`}
                      className="flex items-center justify-center gap-2 text-[#1F4E79] hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {dept.phone}
                    </a>
                    <a
                      href={`mailto:${dept.email}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#1F4E79] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Location & Directions Section
const LocationDirectionsSection = ({ className = "" }) => {
  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Location Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Visit Our Medical Center
              </h2>
              <p className="text-xl text-gray-600">
                Conveniently located in the heart of Healthcare City with easy access and ample parking.
              </p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1F4E79]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Address</h3>
                  <p className="text-gray-600 mb-4">
                    123 Medical Center Drive<br />
                    Healthcare City, HC 12345<br />
                    United States
                  </p>
                  <button className="inline-flex items-center gap-2 text-[#1F4E79] font-medium hover:underline">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Transportation Options */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Getting Here</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Car className="w-5 h-5 text-[#1F4E79]" />
                    <span className="font-medium">By Car</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Free parking available. Valet service from 7 AM - 7 PM.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Bus className="w-5 h-5 text-[#1F4E79]" />
                    <span className="font-medium">Public Transit</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Bus routes 15, 22, and 38 stop directly in front.
                  </p>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Accessibility className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
                  <p className="text-gray-600 mb-3">
                    Our facility is fully accessible with wheelchair ramps, elevators, and accessible parking spaces.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ADA compliant entrances and restrooms</li>
                    <li>• TTY phones available: (123) 456-7899</li>
                    <li>• Sign language interpreters upon request</li>
                    <li>• Large print materials available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-sm">123 Medical Center Drive</p>
                <p className="text-sm">Healthcare City, HC 12345</p>
                <button className="mt-4 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View in Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = ({ className = "" }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment by calling (123) 456-7891, using our online patient portal, or visiting our appointment desk. We recommend calling ahead for specialty appointments."
    },
    {
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans including Medicare, Medicaid, and private insurance. Please call our billing department at (123) 456-7892 to verify your specific plan coverage."
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Please bring a valid photo ID, your insurance card, a list of current medications, any relevant medical records, and your copayment. Arrive 15 minutes early for check-in."
    },
    {
      question: "How can I access my medical records?",
      answer: "You can access your medical records through our patient portal or by contacting our Medical Records department at (123) 456-7893. We can provide copies electronically or by mail."
    },
    {
      question: "Do you offer telemedicine appointments?",
      answer: "Yes, we offer telemedicine consultations for certain types of appointments. Contact our scheduling team to see if your visit qualifies for a virtual appointment."
    },
    {
      question: "What are your visiting hours?",
      answer: "General visiting hours are 8:00 AM - 8:00 PM daily. ICU and special units may have different hours. Please check with the nursing station for specific unit policies."
    },
    {
      question: "How do I pay my bill?",
      answer: "You can pay your bill online through our patient portal, by phone at (123) 456-7892, by mail, or in person at our billing office. We also offer payment plans for qualifying patients."
    },
    {
      question: "Do you have emergency services?",
      answer: "Yes, our Emergency Department is open 24/7. For life-threatening emergencies, call 911. For urgent but non-emergency care, you can visit our Emergency Department or call (123) 456-7890."
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Quick answers to common questions about our services and policies
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <div className="w-6 h-6 text-[#1F4E79]">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 text-gray-400">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
          <HelpCircle className="w-12 h-12 text-[#1F4E79] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1F4E79] border-2 border-[#1F4E79] rounded-lg hover:bg-[#1F4E79] hover:text-white transition-colors duration-200 font-medium">
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Contact Us Page Component
const ContactUsPage = ({ className = "" }) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <ContactHeroSection />
      <EmergencyContactSection />
      <ContactFormSection />
      <DepartmentDirectorySection />
      <LocationDirectionsSection />
      <FAQSection />
    </div>
  );
};

export default ContactUsPage;