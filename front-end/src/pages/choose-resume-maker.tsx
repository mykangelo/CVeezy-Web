// src/pages/choose-resume-maker.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChooseResumeMaker: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header always visible */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow px-4 py-6 flex flex-col items-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="self-start text-sm text-blue-600 hover:underline mb-4 flex items-center gap-1"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold mb-6">
          How will you make your resume?
        </h1>

        {/* Option Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          <div
            className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer relative w-90 hover:bg-blue-200 transition"
            onClick={() => navigate('/uploader')}
          >
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              20% faster
            </div>
            <h2 className="text-lg font-semibold mb-2">
              I already have a resume
            </h2>
            <p className="text-gray-700">
              Upload your existing resume to make quick edits
            </p>
          </div>

          <div
            className="bg-gray-100 p-6 rounded-lg shadow-md cursor-pointer w-90 hover:bg-gray-200 transition"
            onClick={() => navigate('/builder')}
          >
            <h2 className="text-lg font-semibold mb-2">Start from scratch</h2>
            <p className="text-gray-700">
              Our AI will guide you through resume creation
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <blockquote className="text-center text-sm italic text-gray-500 max-w-2xl mt-8 px-4">
          "I tried other tools but Resume Builder was the easiest. I could edit
          everything fast and download my resume. The paid version is worth it
          for more formats."
        </blockquote>
      </main>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
};

export default ChooseResumeMaker;
