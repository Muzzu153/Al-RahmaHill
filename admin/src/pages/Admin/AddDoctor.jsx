import { useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  GraduationCap,
  FileText,
  Upload,
  Eye,
  EyeOff,
  Save,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const AddDoctor = () => {
  const { backendUrl, atoken } = useContext(AdminContext);
  // console.log(aToken);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fee: "",
    address: {
      line1: "",
      line2: "",
    },
    available: true,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    // if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.speciality) newErrors.speciality = "Speciality is required";
    if (!formData.degree.trim()) newErrors.degree = "Degree is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.fee) newErrors.fee = "Fees is required";
    if (!image) newErrors.image = "Doctor photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus("error");
      toast.error("Image not selected");
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      console.log(formData);
      console.log(formDataToSend);

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "address") {
          formDataToSend.append("address", JSON.stringify(formData.address));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (image) {
        formDataToSend.append("image", image);
      }

      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // Mock API call - replace with your actual endpoint
      console.log("Submitting doctor data:", formData);
      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formDataToSend,
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      setSubmitStatus("success");

      // Reset form after successful submission
      setTimeout(() => {
        resetForm();
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding doctor:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      speciality: "",
      degree: "",
      experience: "",
      about: "",
      fee: "",
      address: { line1: "", line2: "" },
      available: true,
    });
    setImage(null);
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-[#1F4E79] rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
            <p className="text-gray-600">
              Add a new doctor to Al-RahmaHill medical team
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">
                Doctor Added Successfully!
              </p>
              <p className="text-green-600 text-sm">
                The new doctor has been added to the system.
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-800 font-medium">
                Please fix the errors below
              </p>
              <p className="text-red-600 text-sm">
                All required fields must be filled correctly.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Doctor Photo */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#1F4E79]" />
            Doctor Photo
          </h3>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Doctor preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                id="doctor-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="doctor-image"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                <Upload className="w-4 h-4" />
                Choose Photo
              </label>
              <p className="text-sm text-gray-600 mt-2">
                Upload a professional photo of the doctor
              </p>
              {errors.image && (
                <p className="text-red-600 text-sm mt-1">{errors.image}</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#1F4E79]" />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Dr. John Smith"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="doctor@alrahmahill.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pr-10 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {/* 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div> */}
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#1F4E79]" />
            Professional Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speciality *
              </label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                  errors.speciality ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Speciality</option>
                {specialities.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.speciality && (
                <p className="text-red-600 text-sm mt-1">{errors.speciality}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                    errors.degree ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="MBBS, MD, etc."
                />
              </div>
              {errors.degree && (
                <p className="text-red-600 text-sm mt-1">{errors.degree}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience (Years) *
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                min="0"
                max="50"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                  errors.experience ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="5"
              />
              {errors.experience && (
                <p className="text-red-600 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Fees ($) *
              </label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition ${
                  errors.fee ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="100"
              />
              {errors.fee && (
                <p className="text-red-600 text-sm mt-1">{errors.fee}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Doctor
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition"
              placeholder="Brief description about the doctor's expertise and background..."
            />
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#1F4E79]" />
            Address Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 1
              </label>
              <input
                type="text"
                name="address.line1"
                value={formData.address.line1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition"
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="address.line2"
                value={formData.address.line2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent transition"
                placeholder="City, State, ZIP"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#1F4E79]" />
            Availability
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleInputChange}
              className="w-4 h-4 text-[#1F4E79] border-gray-300 rounded focus:ring-[#1F4E79]"
            />
            <label
              htmlFor="available"
              className="text-sm font-medium text-gray-700"
            >
              Doctor is available for appointments
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Reset Form
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-[#1F4E79] text-white rounded-lg hover:bg-[#1a3f66] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Doctor...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Add Doctor
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
