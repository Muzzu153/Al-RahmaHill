import { motion } from "framer-motion";

const HamburgerButton = ({ isOpen, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20 ${className}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}>

      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
        {/* Top line */}
        <motion.div
          className="h-0.5 bg-gray-700 rounded-full origin-center"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
            width: isOpen ? "24px" : "18px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        
        {/* Middle line */}
        <motion.div
          className="h-0.5 bg-gray-700 rounded-full origin-center"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? 10 : 0,
            width: "20px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        
        {/* Bottom line */}
        <motion.div
          className="h-0.5 bg-gray-700 rounded-full origin-center"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
            width: isOpen ? "24px" : "22px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </button>
  );
};

// Alternative version without framer-motion for lighter bundle
const HamburgerButtonCSS = ({ isOpen, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E79]/20 ${className}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
        {/* Top line */}
        <div
          className={`h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen 
              ? "rotate-45 translate-y-[6px] w-6" 
              : "rotate-0 translate-y-0 w-[18px]"
          }`}
        />
        
        {/* Middle line */}
        <div
          className={`h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-in-out w-5 ${
            isOpen 
              ? "opacity-0 translate-x-2" 
              : "opacity-100 translate-x-0"
          }`}
        />
        
        {/* Bottom line */}
        <div
          className={`h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen 
              ? "-rotate-45 -translate-y-[6px] w-6" 
              : "rotate-0 translate-y-0 w-[22px]"
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerButton;
export { HamburgerButtonCSS };