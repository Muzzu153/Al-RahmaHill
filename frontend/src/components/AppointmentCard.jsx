import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// Utility functions (can be moved to a separate utils file)
export const formatDate = (dateStr, locale = "en-IN") => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, options);
};

// export const mergeAppointmentWithDoctor = (appointment, doctors) => {
//   const doctor = doctors.find((doc) => doc._id === appointment.docId);
//   return {
//     ...appointment,
//     department: doctor?.speciality || "General",
//     photo: doctor?.image || "/images/default-doctor.jpg",
//   };
// };

// Define possible view modes instead of multiple booleans
const VIEW_MODES = {
  MINIMAL: "minimal", // Just basic info
  COMPACT: "compact", // Basic info + photo
  DETAILED: "detailed", // All info + actions
  ATTENDED: "attended", // Post-appointment view
};

// Define display options as a configuration object
const DEFAULT_DISPLAY_OPTIONS = {
  showPhoto: false,
  showActions: false,
  showDateTime: true,
  actionType: "upcoming", // 'upcoming' | 'attended' | 'past'
};

// Separate component for doctor info
const DoctorInfo = ({ doctorName, department, photo, showPhoto = false }) => (
  <div className="flex xs:block gap-4">
    {showPhoto && photo && (
      <img
        src={photo}
        alt={doctorName}
        className="w-16 h-16 bg-gradient-to-r from-blue-600 to-primary shadow-sm rounded-full"
      />
    )}
    <div className="mt-4">
      <h4 className="text-lg font-semibold">{doctorName}</h4>
      <p className="text-sm text-gray-600">{department}</p>
    </div>
  </div>
);

// Separate component for appointment time/date
const AppointmentDateTime = ({ date, time }) => (
  <div className="flex justify-between items-center">
    <div className="block m-auto text-center lg:text-xl">
      <p>{formatDate(date)}</p>
      <span className="block mt-2 px-4 py-1 bg-blue-100 text-blue-600 rounded-full">
        {time}
      </span>
    </div>
  </div>
);

// Action buttons based on appointment status
const AppointmentActions = ({ appointment, actionType, actions = {} }) => {
  const { onCancel, onPay, onReschedule, onViewPrescription } = actions;

  const renderUpcomingActions = () => (
    <div className="flex gap-3 flex-col">
      {appointment.paymentStatus === "pending" && (
        <button
          onClick={() => onPay?.(appointment)}
          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
        >
          Pay
        </button>
      )}
      <button
        type="button"
        onClick={() => onCancel?.(appointment.id || appointment._id)}
        className="px-2 rounded-full border border-white absolute top-0.5 right-1 text-gray-500 hover:text-white hover:bg-red-600 transition-ease-in text-xl font-bold"
        aria-label="Cancel appointment"
      >
        &times;
      </button>
      <button
        onClick={() => onReschedule?.(appointment)}
        className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
      >
        Reschedule
      </button>
    </div>
  );

  const renderAttendedActions = () => (
    <button
      onClick={() => onViewPrescription?.(appointment)}
      className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
    >
      View Prescription
    </button>
  );

  const renderPastActions = () => (
    <div className="flex gap-2 flex-col">
      <button
        onClick={() => onViewPrescription?.(appointment)}
        className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
      >
        View Details
      </button>
      <button
        onClick={() => onReschedule?.(appointment)}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm"
      >
        Book Again
      </button>
    </div>
  );

  switch (actionType) {
    case "upcoming":
      return renderUpcomingActions();
    case "attended":
      return renderAttendedActions();
    case "past":
      return renderPastActions();
    default:
      return null;
  }
};

// Individual appointment card component with cleaner props
const AppointmentCard = ({
  appointment,
  viewMode,
  displayOptions = {},
  actions = {},
  className = "",
}) => {
  // Determine display options based on view mode
  const getDisplayConfig = (mode) => {
    switch (mode) {
      case "minimal":
        return { showPhoto: false, showActions: false, showDateTime: true };
      case "compact":
        return { showPhoto: true, showActions: false, showDateTime: true };
      case "detailed":
        return {
          showPhoto: true,
          showActions: true,
          showDateTime: true,
          actionType: "upcoming",
        };
      case "attended":
        return {
          showPhoto: true,
          showActions: true,
          showDateTime: true,
          actionType: "attended",
        };
      default:
        return DEFAULT_DISPLAY_OPTIONS;
    }
  };

  const config = { ...getDisplayConfig(viewMode) };
  console.log(config);
  const baseClassName = `flex flex-col xs:flex-row gap-4 bg-gray-50 border w-full relative items-center flex justify-between rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition ${className}`;

  return (
    <div key={appointment.id || appointment._id} className={baseClassName}>
      <DoctorInfo
        doctorName={appointment.docId.name}
        department={appointment.department}
        photo={appointment.photo}
        showPhoto={config.showPhoto}
      />

      {config.showDateTime && (
        <AppointmentDateTime date={appointment.date} time={appointment.time} />
      )}

      {config.showActions && (
        <div className="flex flex-wrap flex-col gap-2 w-full xs:w-auto mt-3 self-end">
          <AppointmentActions
            appointment={appointment}
            actionType={config.actionType}
            actions={actions}
          />
        </div>
      )}
    </div>
  );
};

// Main container component with semantic props
const AppointmentsList = ({
  appointments = [],
  doctors = [],
  viewMode = VIEW_MODES.COMPACT,
  actions = {},
  className = "",
  emptyStateConfig = {},
}) => {
  const [appointmentsList, setAppointmentsList] = useState(appointments);

  // Validation
  if (!Array.isArray(appointmentsList)) {
    console.error(
      "Expected 'appointments' to be an array but got:",
      appointments
    );
    return <div className="text-red-500">Invalid appointments data</div>;
  }
  if (!Array.isArray(doctors)) {
    console.error("Expected 'doctors' to be an array but got:", doctors);
    return <div className="text-red-500">Invalid appointments data</div>;
  }

  // Default cancel handler if none provided
  const defaultActions = {
    onCancel: (id) => {
      setAppointmentsList((prev) =>
        prev.filter((app) => (app._id || app.id) !== id)
      );
    },
    ...actions,
  };

  // Process appointments with doctor data
  // const processedAppointments = appointmentsList.map((appointment) =>
  //   mergeAppointmentWithDoctor(appointment, doctors)
  // );

  if (appointmentsList.length === 0) {
    if (appointmentsList.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <div className="flex flex-col items-center gap-3">
            {emptyStateConfig.icon || (
              <Calendar className="w-12 h-12 text-gray-300" />
            )}
            <p className="text-lg font-medium">
              {emptyStateConfig.title || "No appointments found"}
            </p>
            <p className="text-sm">
              {emptyStateConfig.message || "Your appointments will appear here"}
            </p>
            {emptyStateConfig.action && (
              <button
                onClick={emptyStateConfig.action.onClick}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {emptyStateConfig.action.text}
              </button>
            )}
          </div>
        </div>
      );
    }
  }

  return (
    <div className={`appointments-list ${className}`}>
      {appointmentsList.map((appointment) => (
        <AppointmentCard
          key={appointment.id || appointment._id}
          appointment={appointment}
          viewMode={viewMode}
          actions={defaultActions}
        />
      ))}
    </div>
  );
};

// Export everything including the constants for external use
export {
  VIEW_MODES,
  DEFAULT_DISPLAY_OPTIONS,
  DoctorInfo,
  AppointmentDateTime,
  AppointmentActions,
  AppointmentCard,
  AppointmentsList as default,
};

// Usage examples with much cleaner API:

/*
// MUCH BETTER: Semantic view modes
<AppointmentsList 
  appointments={appointments} 
  doctors={doctors} 
  viewMode={VIEW_MODES.DETAILED}
/>

// Instead of: showDoctorPhoto={true} detailed={true} attended={false}
<AppointmentsList 
  appointments={attendedAppointments} 
  doctors={doctors} 
  viewMode={VIEW_MODES.ATTENDED}
  actions={{
    onViewPrescription: handleViewPrescription
  }}
/>

// Custom configuration when needed
<AppointmentsList 
  appointments={appointments}
  doctors={doctors}
  viewMode={VIEW_MODES.COMPACT}
  displayOptions={{
    showPhoto: false,  // Override the mode default
    actionType: 'past'
  }}
  actions={{
    onCancel: handleCustomCancel,
    onPay: handlePayment
  }}
/>

// Individual card with clear intent
<AppointmentCard 
  appointment={appointment} 
  viewMode={VIEW_MODES.MINIMAL}
/>
*/
