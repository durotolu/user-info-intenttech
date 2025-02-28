import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from './UserFormWizard';

const Step5Review = () => {
  const { getValues } = useFormContext<FormData>();
  const data = getValues();

  return (
    <div className="p-4 bg-gray-50 border rounded">
      <h3 className="text-xl font-bold mb-2">Review Your Information</h3>
      <div className="space-y-2">
        <div>
          <strong>Personal Info:</strong> {data.userInfo.firstName} {data.userInfo.lastName} | {data.userInfo.dob} | {data.userInfo.occupation} | {data.userInfo.gender}
        </div>
        <div>
          <strong>Contact Info:</strong> {data.userContact.email} | {data.userContact.phoneNumber} {data.userContact.fax && `| ${data.userContact.fax}`} {data.userContact.linkedInUrl && `| ${data.userContact.linkedInUrl}`}
        </div>
        <div>
          <strong>Address Info:</strong> {data.userAddress.address}, {data.userAddress.city}, {data.userAddress.state}, {data.userAddress.country} - {data.userAddress.zipCode}
        </div>
        <div>
          <strong>Academic Background:</strong>
          <ul className="list-disc list-inside">
            {data.userAcademics.map((acad, index) => (
              <li key={index}>{acad.schoolName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step5Review;
