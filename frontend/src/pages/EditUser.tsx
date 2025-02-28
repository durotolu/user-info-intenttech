import React from 'react';
import EditUserForm from '../components/EditUserForm';

const EditUser = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit User</h1>
      <EditUserForm />
    </div>
  );
};

export default EditUser;
