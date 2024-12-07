import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 

const validationSchema = Yup.object({
    RERA: Yup.string().required('RERA number is required'),
    PropertySize: Yup.number().required('Property size is required').positive('Property size must be a positive number'),
    ProjectName: Yup.string().required('Project name is required'),
  });
const BasicDetailsForm = ({ onNext }) => {
    
  return (
    <Formik
      initialValues={{
        RERA: '',
        PropertySize: '',
        ProjectStatus: '',
        ProjectNameOnRera: '',
        ProjectTypology: [''],
        ProjectName: '',
        city: '',
        locality: '',
        BuilderName: '',
        QRCodeLink: '',
      }}
      validationSchema={validationSchema} // Use your validation schema
      onSubmit={(values) => onNext(values, 2)}
    >
      <Form className="space-y-6">
        <div>
          <label htmlFor="RERA" className="block text-lg font-semibold text-gray-700">RERA Number</label>
          <Field
            id="RERA"
            name="RERA"
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="RERA" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label htmlFor="PropertySize" className="block text-lg font-semibold text-gray-700">Property Size (sq ft)</label>
          <Field
            id="PropertySize"
            name="PropertySize"
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="PropertySize" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label htmlFor="ProjectName" className="block text-lg font-semibold text-gray-700">Project Name</label>
          <Field
            id="ProjectName"
            name="ProjectName"
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="ProjectName" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Next
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default BasicDetailsForm;
