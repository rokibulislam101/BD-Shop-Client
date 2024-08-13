import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const UpdateBanner = () => {
  const { id } = useParams();
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState('');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    fetchBanner();
  }, [id]);

  const fetchBanner = async () => {
    try {
      const response = await axiosSecure.get(`/banners/${id}`);
      setBanner(response.data);
      setTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching banner:', error);
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/banners/${id}`, { title });
      Swal.fire({
        title: 'Updated',
        text: 'Banner updated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/banners'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Error updating banner:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update banner. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (!banner) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Update Banner</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block mb-2">Banner Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate('/banners')} // Use navigate instead of history.push
          className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
