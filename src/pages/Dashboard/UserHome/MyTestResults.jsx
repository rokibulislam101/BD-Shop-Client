// MyTestResults.jsx
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const MyTestResults = () => {
  const [testResults, setTestResults] = useState([]);
  const { user } = useAuth(); // Assuming user object contains the email
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axiosPublic.get(`/test-results/${user.email}`);
        setTestResults(response.data);
      } catch (error) {
        console.error('Error fetching test results:', error);
      }
    };

    if (user && user.email) {
      fetchTestResults();
    }
  }, [user, axiosPublic]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Test Results</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Test Name</th>
              <th className="py-3 px-6 text-left">Result</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {testResults.length > 0 ? (
              testResults.map((result, index) => (
                <tr
                  key={result._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left">{result.testName}</td>
                  <td className="py-3 px-6 text-left">{result.result}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(result.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 focus:outline-none">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center">
                  No Test Results Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTestResults;
