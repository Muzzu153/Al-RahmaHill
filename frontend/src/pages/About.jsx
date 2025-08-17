import { useState } from "react";
import {
  Heart,
  Shield,
  Award,
  Users,
  Stethoscope,
  Clock,
  MapPin,
  CheckCircle,
  Star,
  Target,
  Eye,
  Lightbulb,
  BookOpen,
  Microscope,
  Building,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Quote
} from "lucide-react";

// Hero Section Component
const AboutHeroSection = ({ className = "" }) => {
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
            About Our
            <span className="block text-blue-200">Medical Center</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
            Dedicated to providing exceptional healthcare services with compassion, innovation, and excellence for over 25 years.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">25+</div>
              <div className="text-blue-200 text-sm">Years Serving</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">50k+</div>
              <div className="text-blue-200 text-sm">Lives Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">100+</div>
              <div className="text-blue-200 text-sm">Medical Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white">98%</div>
              <div className="text-blue-200 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Our Story Section
const OurStorySection = ({ className = "" }) => {
  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 1998, HealthCare Medical Center began as a small community clinic with a simple mission: to provide compassionate, high-quality healthcare to everyone who walks through our doors.
                </p>
                <p>
                  Over the past 25 years, we've grown from a single-building facility to a comprehensive medical center serving over 50,000 patients annually. Our journey has been marked by continuous innovation, unwavering dedication to patient care, and a commitment to medical excellence.
                </p>
                <p>
                  Today, we stand as a beacon of hope and healing in our community, equipped with state-of-the-art technology and staffed by some of the most skilled medical professionals in the region.
                </p>
              </div>
            </div>

            {/* Timeline Highlights */}
            <div className="space-y-4 pt-6">
              <div className="flex gap-4">
                <div className="w-4 h-4 bg-[#1F4E79] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900">1998 - Foundation</div>
                  <div className="text-gray-600">Opened as a small community clinic</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-4 h-4 bg-[#1F4E79] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900">2010 - Expansion</div>
                  <div className="text-gray-600">Added specialized departments and emergency care</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-4 h-4 bg-[#1F4E79] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-gray-900">2020 - Innovation</div>
                  <div className="text-gray-600">Introduced telemedicine and advanced diagnostics</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="aspect-[4/3] bg-white/50 rounded-xl flex items-center justify-center">
                <Building className="w-32 h-32 text-[#1F4E79]/20" />
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1F4E79]">Since</div>
                <div className="text-3xl font-bold text-[#1F4E79]">1998</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mission, Vision, Values Section
const MissionVisionSection = ({ className = "" }) => {
  const items = [
    {
      icon: Target,
      title: "Our Mission",
      content: "To provide exceptional, compassionate healthcare services that improve the well-being of our patients and strengthen our community through medical excellence, innovation, and personalized care.",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Eye,
      title: "Our Vision",
      content: "To be the leading healthcare provider in our region, recognized for clinical excellence, patient satisfaction, and innovative medical solutions that set the standard for quality care.",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Heart,
      title: "Our Values",
      content: "Compassion, Integrity, Excellence, Innovation, Respect, and Community. These core values guide every decision we make and every interaction we have with our patients and their families.",
      color: "text-red-500",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Foundation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that drive us forward and guide our commitment to exceptional healthcare
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 ${item.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Leadership Team Section
const LeadershipSection = ({ className = "" }) => {
  const leaders = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Executive Officer",
      specialty: "Healthcare Administration",
      image: "SM",
      description: "Leading healthcare innovation with 20+ years of executive experience."
    },
    {
      name: "Dr. James Rodriguez",
      role: "Chief Medical Officer",
      specialty: "Internal Medicine",
      image: "JR",
      description: "Ensuring clinical excellence across all medical departments."
    },
    {
      name: "Dr. Emily Chen",
      role: "Director of Operations",
      specialty: "Healthcare Operations",
      image: "EC",
      description: "Optimizing patient care delivery and operational efficiency."
    },
    {
      name: "Dr. Michael Johnson",
      role: "Head of Emergency Medicine",
      specialty: "Emergency Medicine",
      image: "MJ",
      description: "Leading our 24/7 emergency care and critical response teams."
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced medical professionals dedicated to advancing healthcare excellence
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
            >
              {/* Profile Image */}
              <div className="w-24 h-24 bg-gradient-to-r from-[#1F4E79] to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                {leader.image}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {leader.name}
              </h3>
              
              <div className="text-[#1F4E79] font-medium mb-2">
                {leader.role}
              </div>
              
              <div className="text-sm text-gray-500 mb-3">
                {leader.specialty}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {leader.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements & Accreditations Section
const AchievementsSection = ({ className = "" }) => {
  const achievements = [
    {
      icon: Award,
      title: "Joint Commission Accredited",
      description: "Gold Seal of Approval for quality and safety"
    },
    {
      icon: Star,
      title: "5-Star Patient Safety Rating",
      description: "Recognized for exceptional patient safety measures"
    },
    {
      icon: CheckCircle,
      title: "Magnet Hospital Status",
      description: "Excellence in nursing services and patient outcomes"
    },
    {
      icon: Shield,
      title: "ISO 9001 Certified",
      description: "International standard for quality management"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-[#1F4E79] text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Awards & Accreditations
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Recognition for our commitment to excellence in healthcare delivery
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3">
                  {achievement.title}
                </h3>
                
                <p className="text-blue-100 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Community Impact Section
const CommunityImpactSection = ({ className = "" }) => {
  const impacts = [
    {
      number: "10,000+",
      label: "Free Health Screenings",
      description: "Annual community health screenings and preventive care"
    },
    {
      number: "500+",
      label: "Medical Students Trained",
      description: "Supporting the next generation of healthcare professionals"
    },
    {
      number: "$2M+",
      label: "Community Investment",
      description: "Annual investment in community health programs"
    },
    {
      number: "50+",
      label: "Health Education Programs",
      description: "Educational initiatives promoting wellness and prevention"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Community Impact
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Beyond providing medical care, we're committed to improving the overall health and wellness of our community through education, outreach, and preventive care programs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our community initiatives include free health screenings, medical education programs, support groups, and partnerships with local organizations to address healthcare disparities and promote wellness for all.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {impacts.map((impact) => (
              <div
                key={impact.label}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center"
              >
                <div className="text-3xl font-bold text-[#1F4E79] mb-2">
                  {impact.number}
                </div>
                <div className="font-semibold text-gray-900 mb-2">
                  {impact.label}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {impact.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Technology & Innovation Section
const TechnologySection = ({ className = "" }) => {
  const technologies = [
    {
      icon: Microscope,
      title: "Advanced Diagnostics",
      description: "State-of-the-art imaging and laboratory technology for accurate diagnosis"
    },
    {
      icon: Stethoscope,
      title: "Robotic Surgery",
      description: "Minimally invasive surgical procedures with precision robotics"
    },
    {
      icon: BookOpen,
      title: "Electronic Health Records",
      description: "Comprehensive digital health records for seamless care coordination"
    },
    {
      icon: Phone,
      title: "Telemedicine",
      description: "Remote consultations and follow-up care for patient convenience"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Technology & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging cutting-edge medical technology to provide the most advanced care possible
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.title}
                className="text-center group hover:bg-gray-50 rounded-xl p-6 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1F4E79] transition-colors duration-300">
                  <Icon className="w-8 h-8 text-[#1F4E79] group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {tech.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Call to Action Section
const CallToActionSection = ({ className = "" }) => {
  return (
    <section className={`py-16 bg-gradient-to-r from-[#1F4E79] to-blue-600 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Experience Exceptional Care?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of patients who trust us with their health. Schedule your appointment today and experience the difference of personalized, compassionate healthcare.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1F4E79] rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Calendar className="w-5 h-5" />
            Book Appointment
          </button>
          
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-semibold text-lg border-2 border-white/20">
            <Phone className="w-5 h-5" />
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

// Main About Us Component
const AboutUsPage = ({ className = "" }) => {
  return (
    <div className={`min-h-screen ${className}`}>
      <AboutHeroSection />
      <OurStorySection />
      <MissionVisionSection />
      <LeadershipSection />
      <AchievementsSection />
      <CommunityImpactSection />
      <TechnologySection />
      <CallToActionSection />
    </div>
  );
};

export default AboutUsPage;