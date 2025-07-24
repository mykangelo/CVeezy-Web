import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";


const Contacts: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [educationToDelete, setEducationToDelete] = useState<number | null>(null);

  const [educations, setEducations] = useState([{ schoolName: "", location: "", degree: "", startDate: null, endDate: null, collapsed: false  }]);

  const updateEducation = (index: number, field: string, value: any) => {
    if (field !== "startDate" && field !== "endDate") return;

    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };


  const addEducation = () => {
    setEducations([...educations, { schoolName: "", location: "", degree: "", startDate: null, endDate: null, collapsed: false  }]);
  };


  const deleteEducation = (index: number) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducations(newEducations);
  };



  const toggleCollapseEd = (index: number) => {
    const updated = [...educations];
    updated[index].collapsed = !updated[index].collapsed;
    setEducations(updated);
  };



       return (
          <>
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            {educations.map((exp, index) => (
              <div
                key={index}
                className="relative bg-white p-4 mb-4 rounded-lg border border-gray-200 shadow-sm"
              >
                {/* Top Right Buttons: Delete + Collapse */}
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  {/* Collapse Toggle */}
                  <button
                    onClick={() => toggleCollapseEd(index)}
                    className="text-xl text-black/20 hover:text-black transition"
                  >
                    {exp.collapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      setEducationToDelete(index);
                      setShowDeleteModal(true);
                    }}
                    className="text-xl text-black/20 hover:text-red-500 hover:text-opacity-100 transition"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
                
                {/* Header: Summary of School Name, Location, and Dates */}
                <div className="mt-2 mb-4 text-sm font-medium text-gray-800 hover:text-blue-600" onClick={() => toggleCollapseEd(index)}
                  >
                  {exp.schoolName || "School Name"}, {exp.location || "Location"} {" "}
                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Start"}{" "}
                  -{" "}
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "End"}
                  
                </div>

                {/* Collapsible Card Content */}
                {!exp.collapsed && (
                  <div className="space-y-2 mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        School Name
                      </label>
                      <input
                        id="school-name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="UCLA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Location
                      </label>
                      <input
                        id="location"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Degree
                      </label>
                      <input
                        id="degree"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Bachelor of Science in Information Technology"
                      />
                    </div>

                    <div className="space-y-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <DatePicker
                          selected={exp.startDate ? new Date(exp.startDate) : null}
                          onChange={(date) => updateEducation(index, "startDate", date)}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholderText="MM/YYYY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <DatePicker
                          selected={exp.endDate ? new Date(exp.endDate) : null}
                          onChange={(date) => updateEducation(index, "endDate", date)}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholderText="MM/YYYY"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <input
                        id="description"
                        className="w-full p-2 border border-gray-300 rounded-md pb-20"
                        placeholder="Sample Text"
                      />
                    </div>
                </div>
                )}
              </div>
            ))}

            {/* Add Experience Button */}
            <button
              type="button"
              onClick={addEducation}
              className="mt-2 text-blue-600 text-sm font-medium cursor-pointer  hover:text-blue-800 transition"
            >
              + Add Education
            </button>
            {showDeleteModal && (
              <div className="fixed inset-0 bg-gray-700/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
                  <h3 className="text-xl font-semibold mb-4">Confirm</h3>
                  <p className="mb-6">Would you like to delete this summary?</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (educationToDelete !== null) {
                          deleteEducation(educationToDelete);
                        }
                        setShowDeleteModal(false);
                        setEducationToDelete(null);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>       
                  </div>
                </div>
              </div>
            )}                         
          </>
        );

};

export default Contacts;
