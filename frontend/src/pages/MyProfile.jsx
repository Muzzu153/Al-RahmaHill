import { useState, useEffect } from "react";
import {
  User,
  Edit3,
  Save,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Shield,
  Pill,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Download,
  Upload,
  Camera,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

// Mock user data (you'd get this from your context/API)
const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  dob: "1985-06-15",
  bloodGroup: "O+",
  address: "123 Main Street, Healthcare City, HC 12345",
  profileImage: null,
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  allergies: ["Penicillin", "Shellfish"],
  medicalConditions: ["Hypertension", "Type 2 Diabetes"],
  currentMedications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
  ],
  appointments: [
    {
      id: 1,
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      date: "2025-08-15",
      time: "10:00 AM",
      status: "upcoming",
      type: "Follow-up",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: "2025-07-20",
      time: "2:00 PM",
      status: "completed",
      type: "Check-up",
    },
  ],
  healthMetrics: {
    lastCheckup: "2025-07-20",
    bmi: "24.5",
    bloodPressure: "120/80",
    lastBloodWork: "2025-06-15",
  },
};

const MyProfile = () => {
  // const [user, setUser] = useState(null);
  const { user, setUser } = useContext(AppContext);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  // useEffect(() => {
  //   setUser(user);
  // }, []);

  const startEdit = (section) => {
    setEditing(section);
    setFormData(JSON.parse(JSON.stringify(user[section] || user)));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData(null);
  };

  const saveEdit = (section) => {
    if (section === "basicInfo") {
      setUser((prev) => ({ ...prev, ...formData }));
    } else {
      setUser((prev) => ({ ...prev, [section]: formData }));
    }
    setEditing(null);
    setFormData(null);
  };

  const upcomingAppointments =
    user?.appointments?.filter((apt) => apt.status === "upcoming") || [];
  const pastAppointments =
    user?.appointments?.filter((apt) => apt.status === "completed") || [];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F4E79]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-[#1F4E79] to-blue-600 px-6 py-8 text-white text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    {user?.profileImage ? (
                      <img
                        src={user?.profileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-blue-100 text-sm">Patient ID: #12345</p>
              </div>

              {/* Quick Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-[#1F4E79]" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#1F4E79]" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#1F4E79]" />
                  <span>DOB: {new Date(user?.dob).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Activity className="w-4 h-4 text-[#1F4E79]" />
                  <span>Blood Type: {user?.bloodGroup}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="px-6 pb-6">
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Appointment</span>
                    <span className="font-medium">Aug 15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Checkup</span>
                    <span className="font-medium">Jul 20</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Medications</span>
                    <span className="font-medium">
                      {user?.currentMedications?.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-3">
                <button
                  onClick={() => startEdit("basicInfo")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Records
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "overview", label: "Overview", icon: User },
                    { id: "medical", label: "Medical Info", icon: Heart },
                    {
                      id: "appointments",
                      label: "Appointments",
                      icon: Calendar,
                    },
                    { id: "medications", label: "Medications", icon: Pill },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-[#1F4E79] text-[#1F4E79]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "overview" && <OverviewTab user={user} />}
              {activeTab === "medical" && (
                <MedicalTab
                  user={user}
                  editing={editing}
                  formData={formData}
                  startEdit={startEdit}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                  setFormData={setFormData}
                />
              )}
              {activeTab === "appointments" && <AppointmentsTab user={user} />}
              {activeTab === "medications" && (
                <MedicationsTab
                  user={user}
                  editing={editing}
                  formData={formData}
                  startEdit={startEdit}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                  setFormData={setFormData}
                />
              )}
            </div>

            {/* Basic Info Edit Modal */}
            {editing === "basicInfo" && (
              <BasicInfoModal
                user={user}
                formData={formData}
                setFormData={setFormData}
                onSave={() => saveEdit("basicInfo")}
                onCancel={cancelEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Components
const OverviewTab = ({ user }) => (
  <div className="space-y-6">
    {/* Health Summary Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Health Status</h3>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-green-600">Good</p>
        <p className="text-sm text-gray-600">
          Last updated: {user?.healthMetrics?.lastCheckup}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Next Appointment</h3>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">Aug 15</p>
        <p className="text-sm text-gray-600">Dr. Sarah Wilson - Cardiology</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Active Medications</h3>
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Pill className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">
          {user?.currentMedications?.length}
        </p>
        <p className="text-sm text-gray-600">Currently prescribed</p>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Appointment completed
            </p>
            <p className="text-sm text-gray-600">
              Dr. Michael Chen - General Medicine
            </p>
            <p className="text-xs text-gray-500">July 20, 2025</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Lab results available
            </p>
            <p className="text-sm text-gray-600">
              Blood work - All values normal
            </p>
            <p className="text-xs text-gray-500">July 18, 2025</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MedicalTab = ({
  user,
  editing,
  formData,
  startEdit,
  saveEdit,
  cancelEdit,
  setFormData,
}) => (
  <div className="space-y-6">
    {/* Allergies */}
    <SectionCard
      title="Allergies"
      isEditing={editing === "allergies"}
      onEdit={() => startEdit("allergies")}
      onSave={() => saveEdit("allergies")}
      onCancel={cancelEdit}
    >
      {editing === "allergies" ? (
        <ListEditor
          items={formData}
          onChange={setFormData}
          placeholder="Enter allergy"
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {user?.allergies?.length > 0 ? (
            user?.allergies?.map((allergy, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
              >
                {allergy}
              </span>
            ))
          ) : (
            <p className="text-gray-500 italic">No known allergies</p>
          )}
        </div>
      )}
    </SectionCard>

    {/* Medical Conditions */}
    <SectionCard
      title="Medical Conditions"
      isEditing={editing === "medicalConditions"}
      onEdit={() => startEdit("medicalConditions")}
      onSave={() => saveEdit("medicalConditions")}
      onCancel={cancelEdit}
    >
      {editing === "medicalConditions" ? (
        <ListEditor
          items={formData}
          onChange={setFormData}
          placeholder="Enter medical condition"
        />
      ) : (
        <div className="space-y-2">
          {user?.medicalConditions?.length > 0 ? (
            user?.medicalConditions?.map((condition, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-gray-700">{condition}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No medical conditions recorded
            </p>
          )}
        </div>
      )}
    </SectionCard>

    {/* Emergency Contact */}
    <SectionCard
      title="Emergency Contact"
      isEditing={editing === "emergencyContact"}
      onEdit={() => startEdit("emergencyContact")}
      onSave={() => saveEdit("emergencyContact")}
      onCancel={cancelEdit}
    >
      {editing === "emergencyContact" ? (
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData?.name || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <input
              type="text"
              value={formData?.relationship || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  relationship: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData?.phone || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <p className="font-medium">{user?.emergencyContact?.name}</p>
            </div>
            <div>
              <span className="text-gray-600">Relationship:</span>
              <p className="font-medium">
                {user?.emergencyContact?.relationship}
              </p>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>
              <p className="font-medium">{user?.emergencyContact?.phone}</p>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  </div>
);

const AppointmentsTab = ({ user }) => {
  const { backendUrl, utoken } = useContext(AppContext);
  const [appointmentsList, setAppointmentList] = useState([])
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
        console.error(
          "Error fetching appointments:",
          error.response?.data || error.message
        );
      }
    };
    getAppointmentsList();
  }, []);
  const upcomingAppointments = appointmentsList?.filter(
    (apt) => apt.status === "booked"
  );
  const pastAppointments = user?.appointments?.filter(
    (apt) => apt.status === "completed"
  );

  return (
    <div className="space-y-6">
      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Upcoming Appointments
          </h3>
          <button className="px-4 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Book New Appointment
          </button>
        </div>
        <div className="p-6">
          {upcomingAppointments?.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment?.id}
                  appointment={appointment}
                  isUpcoming={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-8">
              No upcoming appointments
            </p>
          )}
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Past Appointments
          </h3>
        </div>
        <div className="p-6">
          {pastAppointments?.length > 0 ? (
            <div className="space-y-4">
              {pastAppointments?.map((appointment) => (
                <AppointmentCard
                  key={appointment?.id}
                  appointment={appointment}
                  isUpcoming={false}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-8">
              No past appointments
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const MedicationsTab = ({
  user,
  editing,
  formData,
  startEdit,
  saveEdit,
  cancelEdit,
  setFormData,
}) => (
  <div className="space-y-6">
    <SectionCard
      title="Current Medications"
      isEditing={editing === "currentMedications"}
      onEdit={() => startEdit("currentMedications")}
      onSave={() => saveEdit("currentMedications")}
      onCancel={cancelEdit}
    >
      {editing === "currentMedications" ? (
        <MedicationEditor medications={formData} onChange={setFormData} />
      ) : (
        <div className="space-y-4">
          {user?.currentMedications?.length > 0 ? (
            user?.currentMedications?.map((med, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Medication</span>
                    <p className="font-semibold text-gray-900">{med?.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dosage</span>
                    <p className="font-medium text-gray-700">{med?.dosage}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Frequency</span>
                    <p className="font-medium text-gray-700">
                      {med?.frequency}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center py-8">
              No current medications
            </p>
          )}
        </div>
      )}
    </SectionCard>
  </div>
);

// Helper Components
const SectionCard = ({
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  children,
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-3 py-1 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const AppointmentCard = ({ appointment, isUpcoming }) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isUpcoming ? "bg-blue-100" : "bg-green-100"
          }`}
        >
          {isUpcoming ? (
            <Calendar className="w-6 h-6 text-blue-600" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-600" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">
            {appointment?.docId.name}
          </h4>
          <p className="text-sm text-gray-600">{appointment?.specialty}</p>
          <p className="text-sm text-gray-500">{appointment?.type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900">
          {new Date(appointment?.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">{appointment?.time}</p>
        <span
          className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
            isUpcoming
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {appointment?.status}
        </span>
      </div>
    </div>
  </div>
);

const ListEditor = ({ items, onChange, placeholder }) => (
  <div className="space-y-3">
    {items.map((item, idx) => (
      <div key={idx} className="flex items-center gap-2">
        <input
          type="text"
          value={item}
          onChange={(e) => {
            const newItems = [...items];
            newItems[idx] = e.target.value;
            onChange(newItems);
          }}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
          placeholder={placeholder}
        />
        <button
          onClick={() => onChange(items.filter((_, i) => i !== idx))}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
    <button
      onClick={() => onChange([...items, ""])}
      className="flex items-center gap-2 px-3 py-2 text-[#1F4E79] hover:bg-blue-50 rounded-lg transition-colors text-sm"
    >
      <Plus className="w-4 h-4" />
      Add Item
    </button>
  </div>
);

const MedicationEditor = ({ medications, onChange }) => (
  <div className="space-y-4">
    {medications?.map((med, idx) => (
      <div
        key={idx}
        className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={med?.name || ""}
            onChange={(e) => {
              const newMeds = [...medications];
              newMeds[idx] = { ...newMeds[idx], name: e.target.value };
              onChange(newMeds);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
            placeholder="Medication name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <input
            type="text"
            value={med?.dosage || ""}
            onChange={(e) => {
              const newMeds = [...medications];
              newMeds[idx] = { ...newMeds[idx], dosage: e.target.value };
              onChange(newMeds);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
            placeholder="e.g., 10mg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <input
            type="text"
            value={med?.frequency || ""}
            onChange={(e) => {
              const newMeds = [...medications];
              newMeds[idx] = { ...newMeds[idx], frequency: e.target.value };
              onChange(newMeds);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
            placeholder="e.g., Once daily"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => onChange(medications.filter((_, i) => i !== idx))}
            className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    ))}
    <button
      onClick={() =>
        onChange([...medications, { name: "", dosage: "", frequency: "" }])
      }
      className="flex items-center gap-2 px-4 py-2 text-[#1F4E79] hover:bg-blue-50 rounded-lg transition-colors text-sm border border-blue-200 hover:border-blue-300"
    >
      <Plus className="w-4 h-4" />
      Add Medication
    </button>
  </div>
);

// Basic Info Modal Component
const BasicInfoModal = ({ user, formData, setFormData, onSave, onCancel }) => {
  const fields = [
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "email", label: "Email Address", type: "email", required: true },
    { key: "phone", label: "Phone Number", type: "tel", required: true },
    { key: "dob", label: "Date of Birth", type: "date", required: true },
    {
      key: "bloodGroup",
      label: "Blood Group",
      type: "select",
      required: true,
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    { key: "address", label: "Address", type: "textarea", required: false },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Edit Basic Information
            </h3>
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={field.key === "address" ? "md:col-span-2" : ""}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === "select" ? (
                    <select
                      value={formData?.[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={formData?.[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      required={field.required}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent resize-vertical"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData?.[field.key] || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      required={field.required}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
