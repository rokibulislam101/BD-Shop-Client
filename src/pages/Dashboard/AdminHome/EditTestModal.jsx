import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const EditTestModal = ({ test, onClose, onUpdate }) => {
  const [title, setTitle] = useState(test.title);
  const [image, setImage] = useState(test.image);
  const [description, setDescription] = useState(test.description);
  const [price, setPrice] = useState(test.price);
  const [dateline, setDateline] = useState(test.dateline);
  const [slots, setSlots] = useState(test.slots);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedTest = { title, image, description, price, dateline, slots };

    try {
      await axiosSecure.put(`/tests/${test._id}`, updatedTest);
      Swal.fire({
        title: 'Success',
        text: 'Test updated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Error updating test:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update test. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-6">Edit Test</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Test Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              value={image}
              onChange={e => setImage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dateline</label>
            <input
              type="date"
              value={dateline}
              onChange={e => setDateline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Slots</label>
            <input
              type="number"
              value={slots}
              onChange={e => setSlots(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Update Test
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded ml-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTestModal;
