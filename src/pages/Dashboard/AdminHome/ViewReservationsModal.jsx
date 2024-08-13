import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ViewReservationsModal = ({ test, onClose }) => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [testResult, setTestResult] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (test) {
      fetchReservations();
    }
  }, [test]);

  const fetchReservations = async () => {
    try {
      const response = await axiosSecure.get('/reservations', {
        params: { testTitle: test.title },
      });
      setReservations(response.data);
      setFilteredReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch reservations. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSearch = event => {
    const email = event.target.value;
    setSearchEmail(email);
    if (email === '') {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter(reservation =>
        reservation.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredReservations(filtered);
    }
  };

  const handleCancelReservation = async id => {
    try {
      await axiosSecure.delete(`/reservations/${id}`);
      Swal.fire({
        title: 'Cancelled',
        text: 'Reservation cancelled successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      fetchReservations();
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to cancel reservation. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSubmitResult = async id => {
    try {
      await axiosSecure.put(`/reservations/${id}`, {
        resultLink: testResult,
        status: 'delivered',
      });
      Swal.fire({
        title: 'Submitted',
        text: 'Test result submitted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setTestResult('');
      fetchReservations();
    } catch (error) {
      console.error('Error submitting test result:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit test result. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-3/4">
        <h2 className="text-2xl font-bold mb-6">
          Reservations for {test.title}
        </h2>
        <input
          type="text"
          placeholder="Search by user email"
          value={searchEmail}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded w-full"
        />
        {filteredReservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User Email</th>
                <th className="py-2 px-4 border-b">Slot</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Cancel</th>
                <th className="py-2 px-4 border-b">Submit Result</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map(reservation => (
                <tr key={reservation._id}>
                  <td className="py-2 px-4 border-b">{reservation.email}</td>
                  <td className="py-2 px-4 border-b">{reservation.slot}</td>
                  <td className="py-2 px-4 border-b">{reservation.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleCancelReservation(reservation._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      placeholder="Result link"
                      value={testResult}
                      onChange={e => setTestResult(e.target.value)}
                      className="p-2 border rounded mb-2"
                    />
                    <button
                      onClick={() => handleSubmitResult(reservation._id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewReservationsModal;
