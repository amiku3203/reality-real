import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const PriceLocationForm = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        price: {
          startingFrom: '',
          discount: '',
          basePrice: '',
          locationPremium: '',
          amenitiesCharge: '',
          tax: '',
          totalPrice: '',
        },
        projectLocation: {
          embedCode: '',
          name: '',
        },
        ContactNumber: '',
        thumbnail: '',
      }}
      onSubmit={(values) => onNext(values, 3)}
    >
      <Form className="space-y-6">
        <div>
          <label htmlFor="price.startingFrom" className="block text-lg font-semibold text-gray-700">Starting Price</label>
          <Field
            id="price.startingFrom"
            name="price.startingFrom"
            type="number"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="price.startingFrom" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label htmlFor="projectLocation.name" className="block text-lg font-semibold text-gray-700">Location Name</label>
          <Field
            id="projectLocation.name"
            name="projectLocation.name"
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="projectLocation.name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <button type="submit" className="w-full py-3 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            Next
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default PriceLocationForm;
