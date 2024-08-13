import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddBanner = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    title: '',
    description: '',
    couponCode: '',
    couponRate: '',
    isActive: false,
  });

  const axiosSecure = useAxiosSecure();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post('/banners', formData);
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Success',
          text: 'Banner added successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setFormData({
          name: '',
          image: '',
          title: '',
          description: '',
          couponCode: '',
          couponRate: '',
          isActive: false,
        });
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add banner. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Add Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Coupon Rate
          </label>
          <input
            type="text"
            name="couponRate"
            value={formData.couponRate}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Is Active</label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
          >
            Add Banner
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
