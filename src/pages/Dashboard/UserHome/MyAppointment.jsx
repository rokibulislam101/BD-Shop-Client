import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth(); // Assuming user object contains the email
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosPublic.get(`/reservations/${user.email}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    if (user && user.email) {
      fetchAppointments();
    }
  }, [user, axiosPublic]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        My Upcoming Appointments
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Test Name</th>
              <th className="py-3 px-6 text-left">Test Price</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Time</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">
                    {appointment.title}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {appointment.price}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(appointment.dateline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">{appointment.time}</td>
                  <td className="py-3 px-6 text-left">
                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
