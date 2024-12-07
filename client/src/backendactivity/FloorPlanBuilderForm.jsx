import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const FloorPlanBuilderForm = ({ onNext }) => {
  return (
    <Formik
      initialValues={{
        floorPlan: {
          thumbnail: '',
          floorPlan: '',
          description: '',
        },
        AboutTheBuilder: {
          thumbnail: '',
          description: '',
        },
      }}
      onSubmit={(values) => onNext(values, 4)}
    >
      <Form className="space-y-6">
        <div>
          <label htmlFor="floorPlan.thumbnail" className="block text-lg font-semibold text-gray-700">Floor Plan Thumbnail</label>
          <Field
            id="floorPlan.thumbnail"
            name="floorPlan.thumbnail"
            type="file"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="floorPlan.description" className="block text-lg font-semibold text-gray-700">Floor Plan Description</label>
          <Field
            id="floorPlan.description"
            name="floorPlan.description"
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
          <ErrorMessage name="floorPlan.description" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
            Next
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default FloorPlanBuilderForm;
