import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import EditTestModal from './EditTestModal';
import ViewReservationsModal from './ViewReservationsModal';

const AllTestManage = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReservationsModal, setShowReservationsModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axiosSecure.get('/tests');
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axiosSecure.delete(`/tests/${id}`);
      Swal.fire({
        title: 'Deleted',
        text: 'Test deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      fetchTests();
    } catch (error) {
      console.error('Error deleting test:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete test. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = test => {
    setSelectedTest(test);
    setShowEditModal(true);
  };

  const handleViewReservations = test => {
    setSelectedTest(test);
    setShowReservationsModal(true);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">All Tests</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Test Title</th>
            <th className="py-2 px-4 border-b text-center">Update</th>
            <th className="py-2 px-4 border-b text-center">Delete</th>
            <th className="py-2 px-4 border-b text-center">Reservations</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test => (
            <tr key={test._id}>
              <td className="py-2 px-4 border-b text-center">{test.title}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(test)}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Update
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(test._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleViewReservations(test)}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Reservations
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditTestModal
          test={selectedTest}
          onClose={() => setShowEditModal(false)}
          onUpdate={fetchTests}
        />
      )}
      {showReservationsModal && (
        <ViewReservationsModal
          test={selectedTest}
          onClose={() => setShowReservationsModal(false)}
        />
      )}
    </div>
  );
};

export default AllTestManage;
