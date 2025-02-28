import React from 'react';
import { useFormContext, FieldError } from 'react-hook-form';

type UserContactErrors = {
  email?: FieldError;
  phoneNumber?: FieldError;
  fax?: FieldError;
  linkedInUrl?: FieldError;
};

const Step2ContactInfo = () => {
  const { register, formState: { errors } } = useFormContext();
  const userContactErrors = errors.userContact as UserContactErrors | undefined;

  return (
    <div className="space-y-4">
      <div>
        <label className="block">Email</label>
        <input
          {...register('userContact.email', { 
            required: 'Email is required', 
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } 
          })}
          className="border p-2 rounded w-full"
        />
        {userContactErrors?.email && (
          <p className="text-red-500">{userContactErrors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block">Phone Number</label>
        <input
          {...register('userContact.phoneNumber', { required: 'Phone number is required' })}
          className="border p-2 rounded w-full"
        />
        {userContactErrors?.phoneNumber && (
          <p className="text-red-500">{userContactErrors.phoneNumber.message}</p>
        )}
      </div>
      <div>
        <label className="block">Fax (optional)</label>
        <input
          {...register('userContact.fax')}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block">LinkedIn URL (optional)</label>
        <input
          {...register('userContact.linkedInUrl')}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default Step2ContactInfo;
