import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const AddTest = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [dateline, setDateline] = useState('');
  const [slots, setSlots] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const newTest = {
      title: name,
      image,
      description,
      price,
      dateline,
      slots,
      status: 'Published', // Hidden status field
      displayName: user.displayName, // Current user's display name
    };

    try {
      const response = await axiosSecure.post('/tests', newTest);
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Success',
          text: 'Test added successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        // Reset form fields
        setName('');
        setImage('');
        setDescription('');
        setPrice('');
        setDateline('');
        setSlots('');
      }
    } catch (error) {
      console.error('Error adding test:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add test. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Add a New Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Test Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
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
          Add Test
        </button>
      </form>
    </div>
  );
};

export default AddTest;
