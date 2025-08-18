import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ChevronDown, ChevronUp, Calendar, Clock, User } from "lucide-react";
import AppointmentsList from "../components/AppointmentCard";
import { VIEW_MODES } from "../components/AppointmentCard";
import axios from "axios";

const MyAppointments = () => {
  // Mock data - replace with your actual context and imports
  const { doctors, backendUrl, utoken } = useContext(AppContext);
  const [appointmentsList, setAppointmentList] = useState([]);
  // const { appointmentsList } = useContext(UserContext)

  const navigate = useNavigate();

  // Enhanced state management
  const [collapsedSections, setCollapsedSections] = useState({
    future: false,
    past: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAppointmentsList = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/user/my-appointments`,
          {
            headers: {
              Authorization: `Bearer ${utoken}`, // or 'utoken': token
            },
          }
        );
        if (data.success) {
          console.log(data.appointmentList);
          setAppointmentList(data.mapped);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.response?.data || error.message);
      }
    };
    getAppointmentsList();
  }, []);

  // Mock your utility function with better logic
  const getAppointments = (isPast, appointments) => {
    const now = new Date();
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return isPast ? aptDate < now : aptDate >= now;
    });
  };

  const pastAppointments = getAppointments(true, appointmentsList);
  const futureAppointments = getAppointments(false, appointmentsList);

  // Enhanced action handlers
  const handlePay = (appointment) => {
    console.log("Processing payment for:", appointment.doctorName);
    // Add your payment logic here
  };

  const handleReschedule = (appointment) => {
    console.log("Rescheduling appointment with:", appointment.doctorName);
    // Add your reschedule logic here
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setLoading(true);
      try {
        // Add your cancel API call here
        console.log("Cancelling appointment:", appointmentId);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Failed to cancel appointment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewPrescription = (appointment) => {
    console.log("Viewing prescription for:", appointment.doctorName);
    // Add your prescription view logic here
  };

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const actions = {
    onPay: handlePay,
    onReschedule: handleReschedule,
    onCancel: handleCancel,
    onViewPrescription: handleViewPrescription,
  };

  const futureEmptyState = {
    icon: <Calendar className="w-12 h-12 text-blue-300" />,
    title: "No upcoming appointments",
    message: "Book your next appointment to stay on top of your health",
    action: {
      text: "Book Appointment",
      onClick: () => navigate("/doctors"),
    },
  };

  const pastEmptyState = {
    icon: <Clock className="w-12 h-12 text-gray-300" />,
    title: "No past appointments",
    message: "Your completed appointments will appear here",
  };

  return (
    <div className="w-full animate-flip-up animate-duration-1000ms">
      {/* Future Appointments Section */}
      <div className="space-y-4 w-full px-4 max-w-5xl mx-auto mb-8">
        <div
          className="flex gap-2 items-center cursor-pointer group"
          onClick={() => toggleSection("future")}
        >
          <h1 className="text-lg self-start sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            Future Appointments
            {futureAppointments.length > 0 && (
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                {futureAppointments.length}
              </span>
            )}
          </h1>
          {collapsedSections.future ? (
            <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
          )}
        </div>

        {!collapsedSections.future && (
          <div className="transition-all duration-300 ease-in-out">
            <AppointmentsList
              appointments={futureAppointments}
              doctors={doctors}
              viewMode={VIEW_MODES.DETAILED}
              actions={actions}
              emptyStateConfig={futureEmptyState}
            />
          </div>
        )}
      </div>

      {/* Past Appointments Section */}
      <div className="space-y-4 w-full max-w-5xl px-4 mx-auto">
        <div
          className="flex gap-2 items-center cursor-pointer group"
          onClick={() => toggleSection("past")}
        >
          <h1 className="self-start text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            Past Appointments
            {pastAppointments.length > 0 && (
              <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {pastAppointments.length}
              </span>
            )}
          </h1>
          {collapsedSections.past ? (
            <ChevronUp className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
          )}
        </div>

        {!collapsedSections.past && (
          <div className="transition-all duration-300 ease-in-out">
            <AppointmentsList
              appointments={pastAppointments}
              doctors={doctors}
              viewMode={VIEW_MODES.ATTENDED}
              actions={actions}
              emptyStateConfig={pastEmptyState}
            />
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
