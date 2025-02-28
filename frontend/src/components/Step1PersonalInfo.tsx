import React from 'react';
import { useFormContext, FieldError } from 'react-hook-form';

type UserInfoErrors = {
  firstName?: FieldError;
  lastName?: FieldError;
  dob?: FieldError;
  occupation?: FieldError;
  gender?: FieldError;
};

const Step1PersonalInfo = () => {
  const { register, formState: { errors } } = useFormContext();
  const userInfoErrors = errors.userInfo as UserInfoErrors | undefined;

  return (
    <div className="space-y-4">
      <div>
        <label className="block">First Name</label>
        <input
          {...register('userInfo.firstName', { required: 'First name is required' })}
          className="border p-2 rounded w-full"
        />
        {userInfoErrors?.firstName && (
          <p className="text-red-500">{userInfoErrors.firstName.message}</p>
        )}
      </div>
      <div>
        <label className="block">Last Name</label>
        <input
          {...register('userInfo.lastName', { required: 'Last name is required' })}
          className="border p-2 rounded w-full"
        />
        {userInfoErrors?.lastName && (
          <p className="text-red-500">{userInfoErrors.lastName.message}</p>
        )}
      </div>
      <div>
        <label className="block">Date of Birth</label>
        <input
          type="date"
          {...register('userInfo.dob', { required: 'Date of birth is required' })}
          className="border p-2 rounded w-full"
        />
        {userInfoErrors?.dob && (
          <p className="text-red-500">{userInfoErrors.dob.message}</p>
        )}
      </div>
      <div>
        <label className="block">Occupation</label>
        <input
          {...register('userInfo.occupation', { required: 'Occupation is required' })}
          className="border p-2 rounded w-full"
        />
        {userInfoErrors?.occupation && (
          <p className="text-red-500">{userInfoErrors.occupation.message}</p>
        )}
      </div>
      <div>
        <label className="block">Gender</label>
        <select
          {...register('userInfo.gender', { required: 'Gender is required' })}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {userInfoErrors?.gender && (
          <p className="text-red-500">{userInfoErrors.gender.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step1PersonalInfo;
