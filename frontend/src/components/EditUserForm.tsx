import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { updateUser } from '../features/users/usersSlice';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2ContactInfo from './Step2ContactInfo';
import Step3AddressInfo from './Step3AddressInfo';
import Step4AcademicInfo from './Step4AcademicInfo';
import Step5Review from './Step5Review';
import api from '../api';

export type FormData = {
  userInfo: {
    profilePhoto?: string;
    firstName: string;
    lastName: string;
    dob: string;
    occupation: string;
    gender: string;
  };
  userContact: {
    email: string;
    phoneNumber: string;
    fax?: string;
    linkedInUrl?: string;
  };
  userAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  userAcademics: { schoolName: string }[];
};

const steps = [
  'Personal Information',
  'Contact Information',
  'Address Information',
  'Academic Information',
  'Review & Submit',
];

const EditUserForm = () => {
  const methods = useForm<FormData>();
  const [currentStep, setCurrentStep] = useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        methods.reset(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id, methods]);

  const onSubmit = async (data: FormData) => {
    try {
      const result = await dispatch(updateUser({ id: id!, user: data })).unwrap();
      console.log('User updated successfully:', result);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1PersonalInfo />;
      case 1:
        return <Step2ContactInfo />;
      case 2:
        return <Step3AddressInfo />;
      case 3:
        return <Step4AcademicInfo />;
      case 4:
        return <Step5Review />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="p-4 space-y-6">
        <h2 className="text-2xl font-bold">{steps[currentStep]}</h2>
        {renderStep()}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => methods.handleSubmit(onSubmit)()}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditUserForm;
