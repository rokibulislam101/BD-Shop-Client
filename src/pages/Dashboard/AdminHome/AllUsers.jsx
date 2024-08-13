import React, { useState } from 'react';
import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import useUsers from '../../../Hooks/useUsers';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllUsers = () => {
  const { data: users, isLoading, error } = useUsers();
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDownloadPdf = async userId => {
    try {
      const response = await axiosSecure.get(`/users/${userId}`);
      const user = response.data;
      const doc = new jsPDF();
      doc.text(`User Details: ${user.name}`, 10, 10);
      doc.text(`Email: ${user.email}`, 10, 20);
      doc.text(`Status: ${user.status}`, 10, 30);
      doc.text(`Booked Tests:`, 10, 40);
      user.tests.forEach((test, index) => {
        doc.text(
          `Test ${index + 1}: ${test.name} - Status: ${test.status}`,
          10,
          50 + index * 10
        );
      });
      doc.save(`${user.name}_details.pdf`);
    } catch (error) {
      console.error('Failed to download PDF', error);
    }
  };

  const handleChangeStatus = async (userId, status) => {
    try {
      await axiosSecure.patch(`/users/${userId}/status`, { status });
    } catch (error) {
      console.error('Failed to change status', error);
    }
  };

  const handleDeleteUser = async userId => {
    try {
      await axiosSecure.delete(`/users/${userId}`);
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleChangeRole = async (userId, role) => {
    try {
      const newRole = role === 'admin' ? 'user' : 'admin';
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
    } catch (error) {
      console.error('Failed to change role', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>See Info</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSelectedUser(user)}
                  >
                    See Info
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.role === 'admin' ? 'warning' : 'success'}
                    onClick={() => handleChangeRole(user._id, user.role)}
                  >
                    {user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.status === 'active' ? 'error' : 'success'}
                    onClick={() =>
                      handleChangeStatus(
                        user._id,
                        user.status === 'active' ? 'blocked' : 'active'
                      )
                    }
                  >
                    {user.status === 'active' ? 'Block' : 'Unblock'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDownloadPdf(user._id)}
                  >
                    Download Details
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <Modal
          open={Boolean(selectedUser)}
          onClose={() => setSelectedUser(null)}
        >
          <Box
            p={3}
            bgcolor="background.paper"
            boxShadow={24}
            borderRadius={2}
            maxWidth={500}
            mx="auto"
            mt={5}
          >
            <Typography variant="h6" gutterBottom>
              User Details
            </Typography>
            <Typography>Name: {selectedUser.name}</Typography>
            <Typography>Email: {selectedUser.email}</Typography>
            <Typography>Status: {selectedUser.status}</Typography>
            <Typography>Role: {selectedUser.role}</Typography>
            <Typography>Booked Tests:</Typography>
            <ul>
              {selectedUser.tests.map((test, index) => (
                <li key={index}>
                  {test.name} - Status: {test.status}
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedUser(null)}
              style={{ marginTop: '10px' }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default AllUsers;
