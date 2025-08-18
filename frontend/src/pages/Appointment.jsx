import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  Info,
  Verified,
  Sun,
  Sunset,
  Moon,
  MapPin,
  Star,
  Award,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import {
  addDays,
  format,
  getDay,
  isToday,
  isSameDay,
  startOfDay,
} from "date-fns";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [payNow, setPayNow] = useState(false); // New state for payment option
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");

  const { backendUrl, utoken } = useContext(AppContext);
  const { docId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});

  const fetchDocInfo = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/appointments/${docId}`
      );

      if (data.success) {
        setDoctor(data.doctorInfo);
        console.log(data.doctorInfo);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId]);

  const bookAppointmentHandle = async () => {
    try {
      setIsBooking(true);
      setBookingError("");

      // Validate required fields
      if (!selectedDate || !selectedSlot || !docId) {
        setBookingError("Please select both date and time slot");
        return;
      }

      // Check if user is logged in (if token is required)
      if (!utoken) {
        setBookingError("Please log in to book an appointment");
        return;
      }

      // Prepare request data with dynamic payment status
      const appointmentData = {
        docId,
        selectedDate,
        selectedSlot,
        fee: doctor.fee,
        doctorName: doctor.name,
        paymentStatus: payNow ? "paid" : "pending" // Set payment status based on checkbox
      };

      console.log("Booking appointment with data:", appointmentData);

      // Make API request with authentication header
      const response = await axios.post(
        `${backendUrl}/api/user/book-appointments`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${utoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking response:", response.data);

      // Handle successful response
      if (response.data.success) {
        setBookingSuccess(true);
        setBookingStatus("booked");

        // Show success message with payment status
        const paymentStatusText = payNow ? "Payment completed" : "Payment pending";
        alert(
          `✅ Appointment booked successfully!\n\nDoctor: ${
            doctor.name
          }\nDate: ${format(
            new Date(selectedDate),
            "EEEE, MMMM do, yyyy"
          )}\nTime: ${
            timeRanges.find((r) => r.id === selectedSlot)?.label
          }\nFee: ₹${doctor.fee}\n${paymentStatusText}\n\nAppointment ID: ${
            response.data.appointmentId || "N/A"
          }`
        );

        // Reset form
        setSelectedDate("");
        setSelectedSlot("");
        setPayNow(false);
      } else {
        setBookingError(response.data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);

      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || "Booking failed";

        switch (statusCode) {
          case 401:
            setBookingError("Please log in to book an appointment");
            break;
          case 403:
            setBookingError(
              "You don't have permission to book this appointment"
            );
            break;
          case 409:
            setBookingError(
              "This time slot is no longer available. Please select another slot."
            );
            break;
          case 400:
            setBookingError(errorMessage || "Invalid appointment data");
            break;
          default:
            setBookingError(`Booking failed: ${errorMessage}`);
        }
      } else if (error.request) {
        setBookingError(
          "Network error. Please check your connection and try again."
        );
      } else {
        setBookingError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsBooking(false);
    }
  };

  // Enhanced Book Appointment Button with payment option
  const renderBookingButton = () => {
    if (!selectedDate || !selectedSlot) return null;

    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 animate-in slide-in-from-bottom duration-700">
        {/* Error Message */}
        {bookingError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 text-red-700">
              <Info className="w-5 h-5" />
              <span className="font-medium">{bookingError}</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {bookingSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                Appointment booked successfully!
              </span>
            </div>
          </div>
        )}

        {/* Payment Option Checkbox */}
        {!bookingSuccess && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Options
            </h3>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  id="pay-now"
                  type="checkbox"
                  checked={payNow}
                  onChange={(e) => setPayNow(e.target.checked)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="pay-now" className="cursor-pointer">
                  <div className="font-medium text-gray-900 mb-1">
                    Pay Now - ₹{doctor.fee}
                  </div>
                  <div className="text-sm text-gray-600">
                    {payNow 
                      ? "✅ Payment will be processed immediately upon booking" 
                      : "⏳ You can pay later. Payment will be marked as pending"
                    }
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Status Indicator */}
            <div className={`mt-3 p-3 rounded-lg transition-all duration-300 ${
              payNow 
                ? "bg-green-100 border border-green-200" 
                : "bg-yellow-100 border border-yellow-200"
            }`}>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  payNow ? "bg-green-500" : "bg-yellow-500"
                }`}></div>
                <span className={`font-medium ${
                  payNow ? "text-green-700" : "text-yellow-700"
                }`}>
                  Payment Status: {payNow ? "Will be marked as PAID" : "Will be marked as PENDING"}
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={bookAppointmentHandle}
          disabled={isBooking || bookingSuccess}
          className={`w-full py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 group ${
            isBooking || bookingSuccess
              ? "bg-gray-400 cursor-not-allowed"
              : payNow
              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          }`}
        >
          {isBooking ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Booking...</span>
            </>
          ) : bookingSuccess ? (
            <>
              <CheckCircle className="w-6 h-6" />
              <span>Booked Successfully!</span>
            </>
          ) : (
            <>
              {payNow ? (
                <CreditCard className="w-6 h-6 group-hover:animate-bounce" />
              ) : (
                <Calendar className="w-6 h-6 group-hover:animate-bounce" />
              )}
              <span>
                {payNow 
                  ? `Pay & Book Appointment - ₹${doctor.fee}`
                  : `Book Appointment - Pay Later`
                }
              </span>
            </>
          )}
        </button>

        {!isBooking && !bookingSuccess && (
          <>
            <p className="text-center text-sm text-gray-500 mt-3">
              {payNow 
                ? "Payment will be processed securely upon booking"
                : "You'll receive a confirmation and can pay before your appointment"
              }
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>
                {payNow 
                  ? "Secure payment • Instant confirmation"
                  : "Flexible payment • Easy booking"
                }
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </>
        )}
      </div>
    );
  };

  const timeRanges = [
    {
      id: "morning",
      label: "Morning",
      time: "9:00 AM - 12:00 PM",
      icon: Sun,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      color: "text-amber-600",
      hoverColor: "hover:border-amber-300 hover:bg-amber-100",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      id: "afternoon",
      label: "Afternoon",
      time: "2:00 PM - 5:00 PM",
      icon: Sunset,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      color: "text-blue-600",
      hoverColor: "hover:border-blue-300 hover:bg-blue-100",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      id: "evening",
      label: "Evening",
      time: "6:00 PM - 9:00 PM",
      icon: Moon,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      color: "text-purple-600",
      hoverColor: "hover:border-purple-300 hover:bg-purple-100",
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  const getCalendarDays = () => {
    const today = startOfDay(new Date());
    const days = [];

    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const isDateDisabled = (date) => {
    const dayOfWeek = getDay(date);
    return dayOfWeek === 0; // Disable Sundays
  };

  const handleBookAppointment = bookAppointmentHandle;

  const onBack = () => {
    console.log("Going back...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-3 hover:bg-blue-100 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Book Appointment
              </h1>
              <p className="text-gray-600 mt-1">
                Schedule your visit with {doctor.name}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  selectedDate ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  selectedSlot ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div
                className={`w-3 h-3 rounded-full transition-colors ${
                  selectedDate && selectedSlot ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Enhanced Doctor Info Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 sticky top-4 overflow-hidden">
              {/* Doctor Image with Gradient Overlay */}
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2">
                    {/* <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {doctor.rating}n
                      </span>
                      <span className="text-sm opacity-80">
                        ({doctor.reviews})
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                {/* Name and Credentials */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {doctor.name}
                    </h2>
                    <Verified className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-gray-600">
                      {doctor.degree} - {doctor.speciality}
                    </span>
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {doctor.experience}
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">About</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {doctor.about}
                  </p>
                </div>

                {/* Fee Information */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">
                      Consultation Fee
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{doctor.fee}
                    </span>
                  </div>
                </div>

                {/* Selected Appointment Summary */}
                {selectedDate && selectedSlot && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 animate-in slide-in-from-top duration-300">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Selected Appointment
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium text-gray-900">
                          {format(new Date(selectedDate), "EEE, MMM d")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900">
                          {timeRanges.find((r) => r.id === selectedSlot)?.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900">
                          {timeRanges.find((r) => r.id === selectedSlot)?.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span className={`font-medium ${
                          payNow ? "text-green-600" : "text-yellow-600"
                        }`}>
                          {payNow ? "Pay Now" : "Pay Later"}
                        </span>
                      </div>
                      <div className="border-t border-green-200 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Fee:</span>
                          <span className="font-bold text-green-600">
                            ₹{doctor.fee}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Booking Section */}
          <div className="xl:col-span-2 space-y-8">
            {/* Enhanced Calendar */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Select Appointment Date
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Next 2 weeks available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-semibold text-gray-500 py-3"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Enhanced Calendar Grid */}
                <div className="grid grid-cols-7 gap-3">
                  {(() => {
                    const calendarDays = getCalendarDays();
                    const firstDay = calendarDays[0];
                    const startPadding = firstDay.getDay();

                    const paddingCells = Array.from(
                      { length: startPadding },
                      (_, index) => (
                        <div key={`padding-${index}`} className="h-16"></div>
                      )
                    );

                    const dateCells = calendarDays.map((date) => {
                      const dateStr = formatDate(date);
                      const isSelected = selectedDate === dateStr;
                      const isDisabled = isDateDisabled(date);
                      const isTodayDate = isToday(date);
                      const dayOfWeek = getDay(date);
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                      return (
                        <button
                          key={dateStr}
                          onClick={() => {
                            if (!isDisabled) {
                              setSelectedDate(dateStr);
                              setSelectedSlot("");
                            }
                          }}
                          disabled={isDisabled}
                          className={`relative h-16 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center group ${
                            isDisabled
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                              : isSelected
                              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl transform scale-110 z-10"
                              : isTodayDate
                              ? "bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg"
                              : "bg-gray-50 text-gray-700 hover:bg-white hover:shadow-lg hover:scale-105 border border-gray-200"
                          }`}
                        >
                          {/* Date Number */}
                          <div
                            className={`text-lg font-bold ${
                              isSelected
                                ? "text-white"
                                : isTodayDate
                                ? "text-blue-600"
                                : "text-gray-900"
                            }`}
                          >
                            {format(date, "d")}
                          </div>

                          {/* Day Indicator */}
                          <div
                            className={`text-xs font-medium ${
                              isSelected
                                ? "text-blue-100"
                                : isTodayDate
                                ? "text-blue-500"
                                : isWeekend && !isDisabled
                                ? "text-orange-500"
                                : "text-gray-500"
                            }`}
                          >
                            {format(date, "EEE")}
                          </div>

                          {/* Today Ring */}
                          {isTodayDate && !isSelected && (
                            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-50 animate-pulse"></div>
                          )}

                          {/* Selected Check */}
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                          )}

                          {/* Weekend Dot */}
                          {isWeekend && !isDisabled && !isSelected && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
                          )}

                          {/* Disabled Strike */}
                          {isDisabled && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-0.5 bg-gray-400 rotate-45"></div>
                            </div>
                          )}
                        </button>
                      );
                    });

                    return [...paddingCells, ...dateCells];
                  })()}
                </div>

                {/* Enhanced Legend */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                    <span className="text-gray-600 font-medium">Today</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-600 font-medium">Weekend</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <span className="text-gray-600 font-medium">
                      Unavailable
                    </span>
                  </div>
                </div>

                {/* Selected Date Display */}
                {selectedDate && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-3 justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        Selected:{" "}
                        {format(new Date(selectedDate), "EEEE, MMMM do, yyyy")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Time Slot Selection */}
            {selectedDate && (
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-bottom duration-500">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        Select Time Slot
                      </h3>
                      <p className="text-purple-100 text-sm">
                        Choose your preferred time
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {timeRanges.map((range) => {
                      const Icon = range.icon;
                      const isSelected = selectedSlot === range.id;

                      return (
                        <button
                          key={range.id}
                          onClick={() => setSelectedSlot(range.id)}
                          className={`group p-6 rounded-2xl transition-all duration-300 text-left relative overflow-hidden ${
                            isSelected
                              ? `bg-gradient-to-br ${range.gradient} text-white transform scale-105 shadow-2xl`
                              : `${range.bgColor} ${range.borderColor} border-2 ${range.hoverColor} hover:scale-102 hover:shadow-xl`
                          }`}
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white transform translate-x-10 -translate-y-10"></div>
                          </div>

                          <div className="relative">
                            <div className="flex items-center gap-4 mb-4">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "bg-white/20"
                                    : `${range.bgColor} ${range.color}`
                                }`}
                              >
                                <Icon className="w-6 h-6" />
                              </div>
                              <div>
                                <h4
                                  className={`font-bold text-lg ${
                                    isSelected ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  {range.label}
                                </h4>
                                <p
                                  className={`text-sm ${
                                    isSelected
                                      ? "text-white/80"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {range.time}
                                </p>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="flex items-center gap-2 text-white animate-in fade-in duration-300">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-semibold">
                                  Selected
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Book Appointment Button */}
            {renderBookingButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;