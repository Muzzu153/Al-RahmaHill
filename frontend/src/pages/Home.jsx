import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import {
  Calendar,
  Phone,
  MapPin,
  Clock,
  Star,
  Users,
  Award,
  Heart,
  Shield,
  Stethoscope,
  Activity,
  Brain,
  Eye,
  Bone,
  Baby,
  ArrowRight,
  Play,
  CheckCircle,
  PhoneCall,
  Mail,
} from "lucide-react";

// Hero Section Component
const HeroSection = ({ className = "" }) => {
  const navigate = useNavigate();
//   const { isLoggedIn } = useContext(UserContext);

  return (
    <section className={`relative bg-gradient-to-br from-blue-600 to-primary text-white rounded-xl overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 rotate-45 border border-white/20"></div>
        <div className="absolute bottom-32 right-1/4 w-8 h-8 rotate-45 border border-white/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Health, Our
                <span className="block text-blue-200">Priority</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Providing compassionate, world-class healthcare with cutting-edge technology and experienced medical professionals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/book-appointment")}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#1F4E79] rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
              
              <button
                onClick={() => navigate("/emergency")}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Emergency: 911
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-blue-200 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-blue-200 text-sm">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-blue-200 text-sm">Expert Doctors</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Video */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-[#1F4E79] p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">24/7 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = ({ className = "" }) => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Heart care with advanced diagnostics and treatment",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: Brain,
      title: "Neurology", 
      description: "Brain and nervous system specialized care",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Bone,
      title: "Orthopedics",
      description: "Bone, joint, and muscle treatment",
      color: "text-blue-500", 
      bgColor: "bg-blue-50"
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Complete eye care and vision services",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Specialized healthcare for children",
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      icon: Activity,
      title: "Emergency Care",
      description: "24/7 emergency medical services",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 rounded-xl bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare services delivered by our expert medical team using state-of-the-art technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
                onClick={() => navigate(`/services/${service.title.toLowerCase()}`)}
              >
                <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${service.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#1F4E79] transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center text-[#1F4E79] font-medium group-hover:gap-2 transition-all duration-200">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F4E79] text-white rounded-lg hover:bg-[#1a3f66] transition-colors duration-200 font-semibold text-lg"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = ({ className = "" }) => {
  const features = [
    {
      icon: Award,
      title: "Expert Medical Team",
      description: "Board-certified doctors with years of specialized experience"
    },
    {
      icon: Shield,
      title: "Advanced Technology",
      description: "State-of-the-art medical equipment and diagnostic tools"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Care",
      description: "Round-the-clock emergency services and critical care"
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Patient-centered approach with personalized treatment plans"
    }
  ];

  return (
    <section className={`py-16 rounded-xl lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose HealthCare Medical Center?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We're committed to providing exceptional healthcare services that put our patients first. Our combination of expert medical professionals, cutting-edge technology, and compassionate care sets us apart.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#1F4E79]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image/Stats */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="aspect-square bg-white/50 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-32 h-32 text-[#1F4E79]/20" />
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-white p-6 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1F4E79]">98%</div>
                <div className="text-sm text-gray-600">Patient Satisfaction</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">24/7</div>
                <div className="text-sm text-gray-600">Emergency Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Section
const StatisticsSection = ({ className = "" }) => {
  const stats = [
    { number: "50,000+", label: "Patients Treated", icon: Users },
    { number: "100+", label: "Expert Doctors", icon: Stethoscope },
    { number: "25+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Success Rate", icon: CheckCircle }
  ];

  return (
    <section className={`py-16 rounded-xl bg-[#1F4E79] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center text-white">
                <div className="mb-4 flex justify-center">
                  <Icon className="w-8 h-8 text-blue-200" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-lg">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = ({ className = "" }) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "The care I received was exceptional. The doctors were thorough, compassionate, and explained everything clearly. I couldn't have asked for better treatment.",
      rating: 5,
      image: "S"
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "Outstanding medical facility with state-of-the-art equipment. The staff is professional and caring. Highly recommend for anyone seeking quality healthcare.",
      rating: 5,
      image: "M"
    },
    {
      name: "Emily Davis",
      role: "Patient",
      content: "From booking to treatment, everything was seamless. The medical team is knowledgeable and the facility is clean and modern. Five stars!",
      rating: 5,
      image: "E"
    }
  ];

  return (
    <section className={`py-16 rounded-xl lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from our valued patients
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#1F4E79] to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Emergency Contact Section
const EmergencyContactSection = ({ className = "" }) => {
  return (
    <section className={`py-16 rounded-xl bg-red-500 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Medical Emergency?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Our emergency department is open 24/7. Call now for immediate assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:911"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-xl"
            >
              <PhoneCall className="w-6 h-6" />
              Call 911
            </a>
            
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold text-xl border-2 border-white/20"
            >
              <Phone className="w-6 h-6" />
              Hospital Direct: (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact & Location Section
const ContactLocationSection = ({ className = "" }) => {
  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600">
                Have questions or need to schedule an appointment? We're here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1F4E79]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Medical Center Drive<br />
                    Healthcare City, HC 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#1F4E79]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">
                    Main: (123) 456-7890<br />
                    Emergency: 911
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#1F4E79]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">
                    info@healthcare.com<br />
                    appointments@healthcare.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#1F4E79]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                  <p className="text-gray-600">
                    Mon-Fri: 8:00 AM - 8:00 PM<br />
                    Sat-Sun: 9:00 AM - 6:00 PM<br />
                    Emergency: 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Interactive Map</p>
              <p className="text-sm">Location and directions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Homepage Component
const Homepage = ({ className = "" }) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <StatisticsSection />
      <TestimonialsSection />
      <EmergencyContactSection />
      {/* <ContactLocationSection /> */}
    </div>
  );
};

export default Homepage;

// Export individual sections for reusability
export {
  HeroSection,
  ServicesSection,
  WhyChooseUsSection,
  StatisticsSection,
  TestimonialsSection,
  EmergencyContactSection,
  ContactLocationSection
};