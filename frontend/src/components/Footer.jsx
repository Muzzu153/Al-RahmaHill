import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Stethoscope,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";
import { assets } from "../assets/assets";

const Footer = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Find a Doctor", href: "/doctors" },
    { name: "Patient Portal", href: "/portal" },
    { name: "Insurance", href: "/insurance" },
    { name: "Careers", href: "/careers" },
  ];

  const services = [
    { name: "Emergency Care", href: "/services/emergency" },
    { name: "Cardiology", href: "/services/cardiology" },
    { name: "Neurology", href: "/services/neurology" },
    { name: "Orthopedics", href: "/services/orthopedics" },
    { name: "Pediatrics", href: "/services/pediatrics" },
    { name: "Surgery", href: "/services/surgery" },
  ];

  const patientResources = [
    { name: "Book Appointment", href: "/book-appointment" },
    { name: "Medical Records", href: "/medical-records" },
    { name: "Billing & Payment", href: "/billing" },
    { name: "Visitor Information", href: "/visitors" },
    { name: "Health Library", href: "/health-library" },
    { name: "Support Groups", href: "/support" },
  ];

  //   const socialLinks = [
  //     { icon: , href: "#", label: "" },
  //     { icon: , href: "#", label: "" },
  //     { icon: , href: "#", label: "" },
  //     { icon: , href: "#", label: "" },
  //     { icon: , href: "#", label: "" }
  //   ];

  return (
    <footer className={`bg-gray-900 rounded-xl my-10 text-white ${className}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Hospital Info & Contact */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo/Brand */}
            <div className="flex flex-row items-center gap-1 mb-6">
              <div>
                <img src={assets.mobile_menu_logo} className="w-15" alt="" />
              </div>
              <span className="self-center text-3xl">Al RahmaHill</span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Providing compassionate, world-class healthcare with cutting-edge
              technology and experienced medical professionals for over 25
              years.
            </p>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1F4E79] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Medical Center Drive
                    <br />
                    Healthcare City, HC 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1F4E79] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Main: (123) 456-7890
                    <br />
                    Emergency: 911
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#1F4E79] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    info@healthcare.com
                    <br />
                    appointments@healthcare.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#1F4E79] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Mon-Fri: 8:00 AM - 8:00 PM
                    <br />
                    Sat-Sun: 9:00 AM - 6:00 PM
                    <br />
                    Emergency: 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:text-[#1F4E79] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white hover:text-[#1F4E79] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Patient Resources</h4>
            <ul className="space-y-3">
              {patientResources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-white hover:text-[#1F4E79] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Newsletter Signup */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Stay Updated:</span>
              <button className="px-6 py-2 bg-[#1F4E79] hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Accreditations */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Joint Commission Accredited</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-5 h-5" />
              <span className="text-sm">5-Star Safety Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Stethoscope className="w-5 h-5" />
              <span className="text-sm">Magnet Hospital Status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Al RahmaHIll. All rights reserved.
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/hipaa"
                className="hover:text-white transition-colors duration-200"
              >
                HIPAA Notice
              </a>
              <a
                href="/accessibility"
                className="hover:text-white transition-colors duration-200"
              >
                Accessibility
              </a>
              <a
                href="/sitemap"
                className="hover:text-white transition-colors duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
