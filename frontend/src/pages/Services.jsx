import { useState } from "react";
import {
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity,
  Stethoscope,
  Microscope,
  Scan,
  Zap,
  Users,
  Clock,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
  Phone,
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  Timer,
  Ambulance,
  Pill,
  Droplets,
  Thermometer,
  TestTube,
  X,
  Building,
  Siren
} from "lucide-react";

// Services Hero Section
const ServicesHeroSection = ({ className = "" }) => {
  return (
    <section className={`relative bg-gradient-to-br from-[#1F4E79] via-blue-600 to-blue-700 text-white overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 rotate-45 border border-white/20"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 rotate-45 border border-white/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Our Medical
            <span className="block text-blue-200">Services</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
            Comprehensive healthcare services delivered by expert medical professionals using state-of-the-art technology and compassionate care.
          </p>
          
          {/* Service Categories Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium">Consultations</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Scan className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium">Diagnostics</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium">Emergency Care</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TestTube className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium">Laboratory</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Filter Component
const ServicesFilter = ({ selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }) => {
  const categories = [
    { id: "all", name: "All Services", icon: Building },
    { id: "consultation", name: "Consultations", icon: Stethoscope },
    { id: "diagnostic", name: "Diagnostics", icon: Scan },
    { id: "emergency", name: "Emergency", icon: Siren },
    { id: "laboratory", name: "Laboratory", icon: TestTube },
    { id: "specialty", name: "Specialty Care", icon: Heart },
    { id: "inpatient", name: "Inpatient Care", icon: Building }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search Bar */}
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-[#1F4E79] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, onBookAppointment }) => {
  const Icon = service.icon;
  
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Service Header */}
      <div className={`relative p-6 ${service.bgGradient} text-white`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{service.name}</h3>
              <p className="text-white/80 text-sm">{service.department}</p>
            </div>
          </div>
          {service.priority && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {service.priority}
            </span>
          )}
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Service Features */}
        <div className="space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Service Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{service.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{service.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{service.availability}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{service.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onBookAppointment(service)}
            className="flex-1 bg-[#1F4E79] text-white px-4 py-3 rounded-lg hover:bg-[#1a3f66] transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </button>
          <button className="px-4 py-3 border border-gray-300 rounded-lg hover:border-[#1F4E79] hover:text-[#1F4E79] transition-colors duration-200 flex items-center justify-center">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Emergency Services Section
const EmergencyServicesSection = ({ className = "" }) => {
  const emergencyServices = [
    {
      icon: Ambulance,
      title: "24/7 Emergency Care",
      description: "Round-the-clock emergency medical services with rapid response",
      contact: "911"
    },
    {
      icon: Heart,
      title: "Cardiac Emergency",
      description: "Immediate care for heart attacks, chest pain, and cardiac events",
      contact: "(555) 0911"
    },
    {
      icon: Brain,
      title: "Stroke Center",
      description: "Rapid diagnosis and treatment for stroke patients",
      contact: "(555) 0912"
    },
    {
      icon: Activity,
      title: "Trauma Center",
      description: "Advanced trauma care for critical injuries",
      contact: "(555) 0913"
    }
  ];

  return (
    <section className={`py-16 bg-red-50 rounded-2xl ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Emergency Services
          </h2>
          <p className="text-xl text-gray-600">
            Life-saving care when every second counts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencyServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-red-200"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <a
                  href={`tel:${service.contact}`}
                  className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {service.contact}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Main Services Component
const Services = ({ className = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Complete services data
  const allServices = [
    // Consultation Services
    {
      id: 1,
      name: "General Consultation",
      category: "consultation",
      department: "General Medicine",
      icon: Stethoscope,
      bgGradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      description: "Comprehensive health assessment and treatment by our experienced general practitioners.",
      features: [
        "Complete physical examination",
        "Medical history review",
        "Treatment recommendations",
        "Follow-up care planning"
      ],
      duration: "30-45 mins",
      price: "₹500",
      availability: "Mon-Sat 9AM-6PM",
      location: "OPD Block A"
    },
    {
      id: 2,
      name: "Cardiology Consultation",
      category: "consultation",
      department: "Cardiology",
      icon: Heart,
      bgGradient: "bg-gradient-to-r from-red-500 to-red-600",
      description: "Specialized heart care consultation with advanced cardiac diagnostics.",
      features: [
        "ECG analysis",
        "Heart rhythm assessment",
        "Cardiovascular risk evaluation",
        "Treatment planning"
      ],
      duration: "45-60 mins",
      price: "₹800",
      availability: "Mon-Fri 10AM-5PM",
      location: "Cardiology Wing"
    },
    {
      id: 3,
      name: "Neurology Consultation",
      category: "consultation",
      department: "Neurology",
      icon: Brain,
      bgGradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      description: "Expert consultation for brain and nervous system disorders.",
      features: [
        "Neurological examination",
        "Brain function assessment",
        "Memory and cognition tests",
        "Specialized treatment plans"
      ],
      duration: "60 mins",
      price: "₹1000",
      availability: "Tue, Thu, Sat 2PM-6PM",
      location: "Neurology Center"
    },
    {
      id: 4,
      name: "Pediatric Consultation",
      category: "consultation",
      department: "Pediatrics",
      icon: Baby,
      bgGradient: "bg-gradient-to-r from-pink-500 to-pink-600",
      description: "Specialized healthcare for infants, children, and adolescents.",
      features: [
        "Growth monitoring",
        "Vaccination schedules",
        "Developmental assessments",
        "Child-friendly environment"
      ],
      duration: "30 mins",
      price: "₹400",
      availability: "Daily 9AM-6PM",
      location: "Pediatric Wing"
    },

    // Diagnostic Services
    {
      id: 5,
      name: "MRI Scan",
      category: "diagnostic",
      department: "Radiology",
      icon: Scan,
      bgGradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      description: "High-resolution magnetic resonance imaging for detailed internal body visualization.",
      features: [
        "3T MRI technology",
        "Brain and spine imaging",
        "Joint and soft tissue scans",
        "Contrast studies available"
      ],
      duration: "45-90 mins",
      price: "₹8000-15000",
      availability: "24/7",
      location: "Radiology Block"
    },
    {
      id: 6,
      name: "CT Scan",
      category: "diagnostic",
      department: "Radiology",
      icon: Zap,
      bgGradient: "bg-gradient-to-r from-green-500 to-green-600",
      description: "Advanced computed tomography for rapid and accurate diagnosis.",
      features: [
        "128-slice CT scanner",
        "Emergency trauma imaging",
        "Contrast enhanced studies",
        "3D reconstruction"
      ],
      duration: "15-30 mins",
      price: "₹3000-6000",
      availability: "24/7",
      location: "Emergency Radiology"
    },
    {
      id: 7,
      name: "X-Ray",
      category: "diagnostic",
      department: "Radiology",
      icon: Activity,
      bgGradient: "bg-gradient-to-r from-teal-500 to-teal-600",
      description: "Digital X-ray imaging for bones, chest, and abdominal examinations.",
      features: [
        "Digital radiography",
        "Immediate results",
        "Low radiation exposure",
        "Portable X-ray available"
      ],
      duration: "10-15 mins",
      price: "₹300-800",
      availability: "24/7",
      location: "Radiology Dept"
    },
    {
      id: 8,
      name: "Ultrasound",
      category: "diagnostic",
      department: "Radiology",
      icon: Eye,
      bgGradient: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      description: "Safe, non-invasive ultrasound imaging for various medical conditions.",
      features: [
        "4D ultrasound technology",
        "Prenatal imaging",
        "Abdominal scans",
        "Doppler studies"
      ],
      duration: "20-45 mins",
      price: "₹800-2000",
      availability: "Mon-Sat 8AM-8PM",
      location: "Ultrasound Suite"
    },

    // Laboratory Services
    {
      id: 9,
      name: "Blood Tests",
      category: "laboratory",
      department: "Pathology",
      icon: Droplets,
      bgGradient: "bg-gradient-to-r from-red-500 to-pink-500",
      description: "Comprehensive blood analysis including CBC, biochemistry, and specialized tests.",
      features: [
        "Complete blood count",
        "Lipid profile",
        "Liver and kidney function",
        "Same-day results"
      ],
      duration: "5-10 mins",
      price: "₹200-2000",
      availability: "24/7",
      location: "Laboratory Block"
    },
    {
      id: 10,
      name: "Urine Analysis",
      category: "laboratory",
      department: "Pathology",
      icon: TestTube,
      bgGradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
      description: "Complete urine examination for kidney function and urinary tract health.",
      features: [
        "Routine urine analysis",
        "Microscopic examination",
        "Culture and sensitivity",
        "24-hour urine collection"
      ],
      duration: "5 mins",
      price: "₹150-500",
      availability: "24/7",
      location: "Laboratory Block"
    },
    {
      id: 11,
      name: "Pathology Services",
      category: "laboratory",
      department: "Pathology",
      icon: Microscope,
      bgGradient: "bg-gradient-to-r from-purple-500 to-indigo-500",
      description: "Advanced pathological examination including biopsies and cytology.",
      features: [
        "Histopathology",
        "Cytopathology",
        "Immunohistochemistry",
        "Molecular diagnostics"
      ],
      duration: "3-7 days",
      price: "₹1000-5000",
      availability: "Mon-Sat 9AM-5PM",
      location: "Pathology Lab"
    },

    // Emergency Services
    {
      id: 12,
      name: "Emergency Care",
      category: "emergency",
      department: "Emergency Medicine",
      icon: Ambulance,
      bgGradient: "bg-gradient-to-r from-red-600 to-red-700",
      description: "24/7 emergency medical care for critical and urgent conditions.",
      features: [
        "Trauma care",
        "Cardiac emergencies",
        "Stroke management",
        "Critical care support"
      ],
      duration: "Variable",
      price: "₹2000+",
      availability: "24/7/365",
      location: "Emergency Department",
      priority: "URGENT"
    },
    {
      id: 13,
      name: "Ambulance Service",
      category: "emergency",
      department: "Emergency Transport",
      icon: Siren,
      bgGradient: "bg-gradient-to-r from-orange-500 to-red-500",
      description: "Advanced life support ambulance service with trained paramedics.",
      features: [
        "Advanced life support",
        "Trained paramedics",
        "GPS tracking",
        "ICU on wheels"
      ],
      duration: "On-demand",
      price: "₹1500-3000",
      availability: "24/7",
      location: "Emergency Bay"
    },

    // Specialty Care
    {
      id: 14,
      name: "Orthopedic Care",
      category: "specialty",
      department: "Orthopedics",
      icon: Bone,
      bgGradient: "bg-gradient-to-r from-slate-500 to-slate-600",
      description: "Comprehensive bone, joint, and musculoskeletal care.",
      features: [
        "Joint replacement surgery",
        "Sports injury treatment",
        "Fracture management",
        "Arthroscopic procedures"
      ],
      duration: "45 mins",
      price: "₹800",
      availability: "Mon-Sat 10AM-4PM",
      location: "Orthopedic Wing"
    },
    {
      id: 15,
      name: "Eye Care",
      category: "specialty",
      department: "Ophthalmology",
      icon: Eye,
      bgGradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      description: "Complete eye care services including surgery and vision correction.",
      features: [
        "Comprehensive eye exams",
        "Cataract surgery",
        "Retinal treatments",
        "LASIK procedures"
      ],
      duration: "30-60 mins",
      price: "₹600",
      availability: "Mon-Fri 9AM-6PM",
      location: "Eye Care Center"
    },

    // Inpatient Care
    {
      id: 16,
      name: "ICU Care",
      category: "inpatient",
      department: "Intensive Care",
      icon: Activity,
      bgGradient: "bg-gradient-to-r from-gray-600 to-gray-700",
      description: "Advanced intensive care for critically ill patients.",
      features: [
        "24/7 monitoring",
        "Ventilator support",
        "Cardiac monitoring",
        "Specialized nursing care"
      ],
      duration: "As needed",
      price: "₹15000/day",
      availability: "24/7",
      location: "ICU Block"
    },
    {
      id: 17,
      name: "General Ward",
      category: "inpatient",
      department: "Inpatient Care",
      icon: Building,
      bgGradient: "bg-gradient-to-r from-blue-600 to-blue-700",
      description: "Comfortable inpatient accommodation with comprehensive medical care.",
      features: [
        "Private and shared rooms",
        "24/7 nursing care",
        "Regular doctor rounds",
        "Family accommodation"
      ],
      duration: "As needed",
      price: "₹2000-5000/day",
      availability: "24/7",
      location: "Inpatient Wings"
    },
    {
      id: 18,
      name: "Pharmacy Services",
      category: "specialty",
      department: "Pharmacy",
      icon: Pill,
      bgGradient: "bg-gradient-to-r from-green-600 to-green-700",
      description: "24/7 pharmacy services with medication counseling and home delivery.",
      features: [
        "Prescription medications",
        "Over-the-counter drugs",
        "Medication counseling",
        "Home delivery available"
      ],
      duration: "5-10 mins",
      price: "As per medication",
      availability: "24/7",
      location: "Pharmacy Block"
    }
  ];

  // Filter services based on category and search term
  const filteredServices = allServices.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookAppointment = (service) => {
    alert(`Booking appointment for ${service.name}\nDepartment: ${service.department}\nPrice: ${service.price}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}>
      <ServicesHeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ServicesFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No services found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search terms or category filters to find the services you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchTerm("");
              }}
              className="mt-4 px-6 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#1a3f66] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Emergency Services Section */}
        <EmergencyServicesSection />

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Choosing a Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our medical team is here to guide you to the right service for your healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#1F4E79] text-white rounded-lg hover:bg-[#1a3f66] transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Phone className="w-5 h-5" />
              Call (555) 0123
            </button>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1F4E79] border-2 border-[#1F4E79] rounded-lg hover:bg-[#1F4E79] hover:text-white transition-colors duration-200 font-semibold text-lg">
              <Calendar className="w-5 h-5" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;