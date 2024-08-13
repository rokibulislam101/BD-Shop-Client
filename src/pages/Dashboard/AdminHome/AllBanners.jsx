import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllBanners = () => {
  const [banners, setBanners] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axiosSecure.get('/banners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleDelete = async id => {
    try {
      await axiosSecure.delete(`/banners/${id}`);
      Swal.fire({
        title: 'Deleted',
        text: 'Banner deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete banner. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSetActive = async id => {
    try {
      await axiosSecure.post(`/banners/setActive/${id}`);
      Swal.fire({
        title: 'Updated',
        text: 'Banner set as active successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      fetchBanners();
    } catch (error) {
      console.error('Error setting banner as active:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to set banner as active. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleUpdateRedirect = id => {
    navigate(`/banners/update/${id}`); // Use navigate
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">All Banners</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Banner Title</th>
            <th className="py-2 px-4 border-b text-center">Active</th>
            <th className="py-2 px-4 border-b text-center">Update</th>
            <th className="py-2 px-4 border-b text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {banners.map(banner => (
            <tr key={banner._id}>
              <td className="py-2 px-4 border-b text-center">{banner.title}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleSetActive(banner._id)}
                  className={`py-1 px-3 rounded ${
                    banner.isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {banner.isActive ? 'Active' : 'Set Active'}
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleUpdateRedirect(banner._id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Update
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(banner._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBanners;
