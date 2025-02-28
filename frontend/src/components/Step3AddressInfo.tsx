import React from 'react';
import { useFormContext, FieldError } from 'react-hook-form';

type AddressErrors = {
  address?: FieldError;
  city?: FieldError;
  state?: FieldError;
  country?: FieldError;
  zipCode?: FieldError;
};

const Step3AddressInfo = () => {
  const { register, formState: { errors } } = useFormContext();
  const addressErrors = errors.userAddress as AddressErrors | undefined;

  return (
    <div className="space-y-4">
      <div>
        <label className="block">Address</label>
        <input
          {...register('userAddress.address', { required: 'Address is required' })}
          className="border p-2 rounded w-full"
        />
        {addressErrors?.address && (
          <p className="text-red-500">{addressErrors.address.message}</p>
        )}
      </div>
      <div>
        <label className="block">City</label>
        <input
          {...register('userAddress.city', { required: 'City is required' })}
          className="border p-2 rounded w-full"
        />
        {addressErrors?.city && (
          <p className="text-red-500">{addressErrors.city.message}</p>
        )}
      </div>
      <div>
        <label className="block">State</label>
        <input
          {...register('userAddress.state', { required: 'State is required' })}
          className="border p-2 rounded w-full"
        />
        {addressErrors?.state && (
          <p className="text-red-500">{addressErrors.state.message}</p>
        )}
      </div>
      <div>
        <label className="block">Country</label>
        <input
          {...register('userAddress.country', { required: 'Country is required' })}
          className="border p-2 rounded w-full"
        />
        {addressErrors?.country && (
          <p className="text-red-500">{addressErrors.country.message}</p>
        )}
      </div>
      <div>
        <label className="block">Zip Code</label>
        <input
          {...register('userAddress.zipCode', { required: 'Zip code is required' })}
          className="border p-2 rounded w-full"
        />
        {addressErrors?.zipCode && (
          <p className="text-red-500">{addressErrors.zipCode.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step3AddressInfo;
