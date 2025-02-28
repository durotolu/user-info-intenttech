import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetail from '../components/UserDetail';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <UserDetail id={id} />
    </div>
  );
};

export default UserDetailPage;
