// src/pages/uploader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineUploadFile } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ImproveResume: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Go Back Link */}
        <div
          className="flex items-center text-blue-400 cursor-pointer hover:underline w-fit mt-5 ml-5"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack className="text-2xl mr-1" />
          <span className="text-md font-semibold">Go Back</span>
        </div>

        {/* Upload Section */}
        <div className="flex items-center justify-center pt-20 pb-24">
          <div className="w-[60%] max-w-3xl border-2 border-dashed border-slate-400/80 p-8 rounded-3xl bg-white shadow-md text-center transition-all duration-300 hover:shadow-xl hover:cursor-pointer">
            <MdOutlineUploadFile className="mx-auto text-6xl text-slate-400/70 mb-4" />
            <h2 className="text-2xl font-semibold mb-1">Drag and drop your resume here</h2>
            <p className="text-gray-400 mb-1">or</p>
            <button className="bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Upload from device
            </button>
            <p className="text-gray-400 my-3">Files we can read: DOCX, PDF, HTML, TXT</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImproveResume;
