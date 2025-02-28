import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FormData } from './UserFormWizard';

const Step4AcademicInfo = () => {
  const { control, register } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'userAcademics',
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4">
          <input
            {...register(`userAcademics.${index}.schoolName` as const, { required: 'School name is required' })}
            className="border p-2 rounded w-full"
            placeholder="School Name"
          />
          <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ schoolName: '' })} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add School
      </button>
    </div>
  );
};

export default Step4AcademicInfo;
