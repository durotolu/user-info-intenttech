import React from 'react';
import UserFormWizard from '../components/UserFormWizard';

const CreateUser = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New User</h1>
      <UserFormWizard />
    </div>
  );
};

export default CreateUser;
