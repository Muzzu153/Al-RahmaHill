import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Users,
  Search,
  Mail,
  MapPin,
  GraduationCap,
  Stethoscope,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Loader,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate()

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpeciality, setFilterSpeciality] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");

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
      const { data } = await axios.get(
        `${backendUrl}/api/all-doctors`,
        {}
      );
      
      console.log(data)

      if (data.success) {
        console.log(data);
        console.log(data.doctor);
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
            <div>
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
          {doctors.length !== doctors.length && (
            <span className="text-primary font-medium">
              Showing: {doctors.length} results
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
            onClick={()=>navigate(`/appointments/${doctor._id}`)}
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

                <div className="space-y-2 text-sm text-gray-600">
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

                  {doctor.address?.line1 && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">
                        {doctor.address.line1}
                        {doctor.address.line2 && `, ${doctor.address.line2}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
