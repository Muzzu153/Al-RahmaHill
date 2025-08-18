import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Stethoscope,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  RefreshCw,
} from "lucide-react";
import axios from "axios";

const DoctorsList = () => {
  const { backendUrl, atoken } = useContext(AdminContext);

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpeciality, setFilterSpeciality] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [updatingAvailability, setUpdatingAvailability] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editData, setEditData] = useState(false)

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
    "Cardiologist",
    "Orthopedic",
    "Psychiatrist",
    "Radiologist",
    "Ophthalmologist",
    "ENT Specialist",
  ];

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/admin/all-doctors`, {}, {
        headers: { atoken },
      });

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(
        error.message || "Failed to fetch doctors. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle doctor availability
  const toggleAvailability = async (doctorId, currentStatus) => {
    try {
      setUpdatingAvailability((prev) => ({ ...prev, [doctorId]: true }));

      const { data } = await axios.patch(
        `${backendUrl}/api/admin/doctor-availability`,
        {
          doctorId,
          available: !currentStatus,
        },
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors((prev) =>
          prev.map((doctor) =>
            doctor._id === doctorId
              ? { ...doctor, available: !currentStatus }
              : doctor
          )
        );
        toast.success(
          `Doctor ${!currentStatus ? "marked available" : "marked unavailable"}`
        );
      } else {
        toast.error(data.message || "Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update availability. Please try again.");
    } finally {
      setUpdatingAvailability((prev) => ({ ...prev, [doctorId]: false }));
    }
  };

  // Delete doctor
  const handleDeleteDoctor = async (doctorId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/doctor/${doctorId}`,
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors((prev) => prev.filter((doctor) => doctor._id !== doctorId));
        toast.success("Doctor deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor. Please try again.");
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpeciality =
      filterSpeciality === "" || doctor.speciality === filterSpeciality;
    const matchesAvailability =
      filterAvailability === "" ||
      (filterAvailability === "available" && doctor.available) ||
      (filterAvailability === "unavailable" && !doctor.available);

    return matchesSearch && matchesSpeciality && matchesAvailability;
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <Loader className="w-6 h-6 animate-spin text-primary" />
              <span className="text-gray-600">Loading doctors...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex flex-col-reverse gap-4 xs:flex-row  items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 self-start xs:self-auto hidden  h-10 bg-primary rounded-lg xs:flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div >
              <h1 className="text-2xl font-bold text-gray-900">Doctors List</h1>
              <p className="text-gray-600  ">
                Manage all doctors in Al-RahmaHill medical team
              </p>
            </div>
          </div>
          <button
            onClick={fetchDoctors}
            className="flex w-full xs:w-auto items-center self-start align gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#1a3f66] transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name, email, or speciality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <select
            value={filterSpeciality}
            onChange={(e) => setFilterSpeciality(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Specialities</option>
            {specialities.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span>Total: {doctors.length} doctors</span>
          <span>Available: {doctors.filter((d) => d.available).length}</span>
          <span>Unavailable: {doctors.filter((d) => !d.available).length}</span>
          {filteredDoctors.length !== doctors.length && (
            <span className="text-primary font-medium">
              Showing: {filteredDoctors.length} results
            </span>
          )}
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No doctors found
          </h3>
          <p className="text-gray-600">
            {searchTerm || filterSpeciality || filterAvailability
              ? "Try adjusting your search criteria"
              : "No doctors have been added yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Doctor Photo and Status */}
              <div className="relative hover:bg-primary transiton-all duration-300">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      doctor.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {doctor.available ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {doctor.available ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <Stethoscope className="w-4 h-4" />
                      {doctor.speciality}
                    </div>
                  </div>
                </div>

                {/* <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{doctor.degree}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{doctor.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>${doctor.fee} consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                  {doctor.address?.line1 && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">
                        {doctor.address.line1}
                        {doctor.address.line2 && `, ${doctor.address.line2}`}
                      </span>
                    </div>
                  )}
                </div> */}

                {/* Availability Toggle */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Availability Status
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doctor.available}
                        onChange={() =>
                          toggleAvailability(doctor._id, doctor.available)
                        }
                        disabled={updatingAvailability[doctor._id]}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      {updatingAvailability[doctor._id] && (
                        <Loader className="w-4 h-4 animate-spin ml-2 text-primary" />
                      )}
                    </label>
                  </div>
                </div>

                <dialog open>
                  <form action="dialog" method="POST">
                    <div></div>
                  </form>
                </dialog>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  {/* <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-[#1a3f66] transition text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button> */}
                  <button onClick={()=>setEditData(!editData)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(doctor)}
                    className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Doctor
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete Dr. {deleteConfirm.name}? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteDoctor(deleteConfirm._id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
