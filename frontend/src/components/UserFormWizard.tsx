import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import { createUser } from '../features/users/usersSlice';
import Step1PersonalInfo from './Step1PersonalInfo';
import Step2ContactInfo from './Step2ContactInfo';
import Step3AddressInfo from './Step3AddressInfo';
import Step4AcademicInfo from './Step4AcademicInfo';
import Step5Review from './Step5Review';

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

const UserFormWizard = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      userInfo: { firstName: '', lastName: '', dob: '', occupation: '', gender: '' },
      userContact: { email: '', phoneNumber: '', fax: '', linkedInUrl: '' },
      userAddress: { address: '', city: '', state: '', country: '', zipCode: '' },
      userAcademics: [{ schoolName: '' }],
    },
  });
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await dispatch(createUser(data)).unwrap();
      console.log('User created successfully:', result);
      methods.reset();
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
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

export default UserFormWizard;
