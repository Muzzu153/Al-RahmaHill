import React, { useState, useContext, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../assets/assets";
import toast, { Toaster } from "react-hot-toast";
import {
  format,
  addDays,
  startOfToday,
  setHours,
  setMinutes,
  isAfter,
  addMinutes,
  isSameDay,
} from "date-fns";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN, MON, TUE, WED, THU, FRI, SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // chatGpt slot booking ui starts
  const [selectedDay, setSelectedDay] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookings, setBookings] = useState([]);
  const now = new Date();

  const daysRef = useRef();
  const slotsRef = useRef();

  const currentUserId = "u1";

  const next7Days = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfToday(), i)
  );

  const generateSlotsForDay = (date) => {
    const slots = [];
    let startTime = setHours(setMinutes(date, 0), 9);
    const endTime = setHours(setMinutes(date, 0), 22);

    while (startTime < endTime) {
      if (isSameDay(date, now) ? isAfter(startTime, now) : true) {
        slots.push(new Date(startTime));
      }
      startTime = addMinutes(startTime, 30);
    }
    return slots;
  };

  const slotsForSelectedDay = generateSlotsForDay(selectedDay);
  const AMSlots = slotsForSelectedDay.filter((s) => format(s, "a") === "AM");
  const PMSlots = slotsForSelectedDay.filter((s) => format(s, "a") === "PM");

  const handleBooking = (slot) => {
    setBookings([
      ...bookings,
      { userId: currentUserId, slot: slot.toISOString() },
    ]);
    setSelectedSlot(null);
    toast.success("Slot booked successfully!");
  };

  const isDayDisabled = (day) => generateSlotsForDay(day).length === 0;
  // chatGpt ends here

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // const getAvailableSlots = async () => {
  //   setDocSlots([]);

  //   // getting current date
  //   let today = new Date();

  //   for (let i = 0; i < 7; i++) {
  //     let idArrya = [];
  //     let id = `slot_id${i}`;
  //     idArrya.push(id);

  //     // getting date with index
  //     let currentDate = new Date(today);
  //     currentDate.setDate(today.getDate() + i);

  //     // setting end time of the date with index
  //     let endTime = new Date();
  //     endTime.setDate(today.getDate() + i);
  //     endTime.setHours(21, 0, 0, 0);

  //     // setting hours
  //     if (today.getDate() === currentDate.getDate()) {
  //       currentDate.setHours(
  //         currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
  //       );
  //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
  //     } else {
  //       currentDate.setHours(10);
  //       currentDate.setMinutes(0);
  //     }

  //     let timeSlots = [];

  //     while (currentDate < endTime) {
  //       let formattedTime = currentDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });

  //       // add slot to array
  //       timeSlots.push({
  //         // id: ,
  //         datetime: new Date(currentDate),
  //         time: formattedTime,
  //       });

  //       // Increment current time by 30 minutes
  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }

  //     setDocSlots((prev) => [...prev, timeSlots]);
  //   }
  // };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // useEffect(() => {
  //   getAvailableSlots();
  // }, [docInfo]);

  // useEffect(() => {
  //   console.log(docSlots);
  // }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* --------------- Doctors details ------------ */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white">
            {/* ------------- Doc info: name, degreee, experience ---------- */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />{" "}
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* ---------------- About Doctor ------------------*/}
            <div>
              <p className="flex items-center gap-1 text:sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ----------- Booking slots ------------- */}
        {/* <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Book Slots</p>
          <div>
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div key={index}>
                  <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                 
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
        </div> */}

        {/* ---------ChatGpt slot booking ui starts here */}
        <div className="p-6 max-w-5xl mx-auto">
          <Toaster position="top-right" />
          <h1 className="text-3xl font-bold mb-6">Book a Slot</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-700">
              Select a Day
            </h2>
            <div className="flex items-center space-x-2 mb-2">
              
               <button 
               onClick={() =>
                  daysRef.current.scrollBy({ left: -150, behavior: "smooth" })
                }
               className="p-2 border rounded cursor-pointer mb-1">
                <ChevronLeft className="w-3 h-3 " />
               </button>
        
              <div
                ref={daysRef}
                className="flex overflow-x-auto space-x-3 pb-2"
              >
                {next7Days.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedSlot(null);
                    }}
                    disabled={isDayDisabled(day)}
                    className={`rounded-full px-5 py-3 text-sm whitespace-nowrap border-2 cursor-pointer shadow ${
                      format(day, "yyyy-MM-dd") ===
                      format(selectedDay, "yyyy-MM-dd")
                        ? "bg-primary text-white border-primary-600"
                        : "hover:bg-blue-100 border-gray-300"
                    } ${
                      isDayDisabled(day) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {format(day, "eee, MMM d")}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  daysRef.current.scrollBy({ left: 150, behavior: "smooth" })
                }
                className="p-2 border rounded mb-1 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-green-700">
              Select a Time
            </h2>
            <div className="space-y-3">
              {AMSlots.length > 0 && (
                <>
                  <h3 className="text-sm text-gray-500">AM</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        slotsRef.current.scrollBy({
                          left: -150,
                          behavior: "smooth",
                        })
                      }
                      className="p-2 border cursor-pointer rounded mb-1"
                    ><ChevronLeft className="w-3 h-3" />
                    </button>
                    <div
                      ref={slotsRef}
                      className="flex overflow-x-auto space-x-3 pb-2"
                    >
                      {AMSlots.map((slot, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg px-4 py-2 text-sm shadow whitespace-nowrap border-2 cursor-pointer ${
                            selectedSlot?.toString() === slot.toString()
                              ? "bg-green-600 text-white border-green-600"
                              : "hover:bg-green-100 border-gray-300"
                          }`}
                        >
                          {format(slot, "hh:mm a")}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        slotsRef.current.scrollBy({
                          left: 150,
                          behavior: "smooth",
                        })
                      }
                      className="p-2 border rounded cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}

              {PMSlots.length > 0 && (
                <>
                  <h3 className="text-sm text-gray-500">PM</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        slotsRef.current.scrollBy({
                          left: -150,
                          behavior: "smooth",
                        })
                      }
                      className="p-2 border rounded"
                    >
                     <ChevronLeft className="w-3 h-3" />
                    </button>
                    <div 
                    ref={slotsRef}
                    className="flex overflow-x-auto space-x-3 pb-2">
                      {PMSlots.map((slot, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg px-4 py-2 text-sm shadow whitespace-nowrap border-2 ${
                            selectedSlot?.toString() === slot.toString()
                              ? "bg-green-600 text-white border-green-600"
                              : "hover:bg-green-100 border-gray-300"
                          }`}
                        >
                          {format(slot, "hh:mm a")}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        slotsRef.current.scrollBy({
                          left: 150,
                          behavior: "smooth",
                        })
                      }
                      className="p-2 border rounded"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}

              {AMSlots.length === 0 && PMSlots.length === 0 && (
                <p className="text-gray-600">
                  No slots available for this day.
                </p>
              )}
            </div>
          </div>

          {selectedSlot && (
            <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded space-y-4">
              <p className="text-green-800 font-semibold">
                ✅ You selected:{" "}
                {format(selectedSlot, "eeee, MMMM do — hh:mm a")}
              </p>
              <button
                onClick={() => handleBooking(selectedSlot)}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
        {/* ends here */}


          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      </div>
    )
  );
};

export default Appointment;
