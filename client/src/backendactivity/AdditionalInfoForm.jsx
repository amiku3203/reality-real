import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const AdditionalInfoForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        Brochure: '',
        YouTubeVideo: '',
        Disclaimer: '',
        faqs: [{ question: '', answer: '' }],
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className="space-y-6">
        <div>
          <label htmlFor="Brochure" className="block text-lg font-semibold text-gray-700">Brochure</label>
          <Field
            id="Brochure"
            name="Brochure"
            type="file"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="YouTubeVideo" className="block text-lg font-semibold text-gray-700">YouTube Video URL</label>
          <Field
            id="YouTubeVideo"
            name="YouTubeVideo"
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <button type="submit" className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AdditionalInfoForm;
