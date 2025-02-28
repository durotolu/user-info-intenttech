import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

interface UserDetailProps {
  id: string;
}

const UserDetail: React.FC<UserDetailProps> = ({ id }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/users/${id}`);
        if (isMounted) {
          setUser(response.data);
        }
      } catch (err) {
        if (isMounted) setError('Failed to fetch user details.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p className="text-center">Loading user details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="text-gray-500">User not found.</p>;

  return (
    <div className="p-4 bg-gray-50 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <p>Name: {user.userInfo?.firstName} {user.userInfo?.lastName}</p>
        <p>DOB: {user.userInfo?.dob}</p>
        <p>Occupation: {user.userInfo?.occupation}</p>
        <p>Gender: {user.userInfo?.gender}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p>Email: {user.userContact?.email}</p>
        <p>Phone: {user.userContact?.phoneNumber}</p>
        {user.userContact?.fax && <p>Fax: {user.userContact.fax}</p>}
        {user.userContact?.linkedInUrl && <p>LinkedIn: <a href={user.userContact.linkedInUrl} className="text-blue-600" target="_blank" rel="noopener noreferrer">{user.userContact.linkedInUrl}</a></p>}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Address Information</h2>
        <p>{user.userAddress?.address}, {user.userAddress?.city}, {user.userAddress?.state}, {user.userAddress?.country} - {user.userAddress?.zipCode}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Academic Background</h2>
        <ul className="list-disc list-inside">
          {user.userAcademics?.length > 0 ? (
            user.userAcademics.map((acad: any, index: number) => (
              <li key={index}>{acad.schoolName}</li>
            ))
          ) : (
            <p className="text-gray-500">No academic records available.</p>
          )}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => navigate(`/edit/${id}`)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Edit User
      </button>
    </div>
  );
};

export default UserDetail;
