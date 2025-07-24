import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";



const Contacts: React.FC = () => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState<number | null>(null);


  const [experiences, setExperiences] = useState([{ jobTitle: "", employer: "", company: "", startDate: null, endDate: null, collapsed: false  }]);

  const updateExperience = (index: number, field: string, value: any) => {
    if (field !== "startDate" && field !== "endDate") return;

    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };


  const addExperience = () => {
    setExperiences([...experiences, { jobTitle: "", employer: "", company: "", startDate: null, endDate: null, collapsed: false  }]);
  };


  const deleteExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };


  const toggleCollapseEx = (index: number) => {
    const updated = [...experiences];
    updated[index].collapsed = !updated[index].collapsed;
    setExperiences(updated);
  };


        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative bg-white p-4 mb-4 rounded-lg border border-gray-200 shadow-sm"
              >
                {/* Top Right Buttons: Delete + Collapse */}
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  {/* Collapse Toggle */}
                  <button
                    onClick={() => toggleCollapseEx(index)}
                    className="text-xl text-black/20 hover:text-black transition"
                  >
                    {exp.collapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      setExperienceToDelete(index);
                      setShowDeleteModal(true);
                    }}
                    className="text-xl text-black/20 hover:text-red-500 hover:text-opacity-100 transition"
                  >
                    <RiDeleteBinLine />
                  </button>

                </div>
                
                {/* Header: Summary of Job Title, Employer, and Dates */}
                <div className="mt-2 mb-4 text-sm font-medium text-gray-800 hover:text-blue-600" onClick={() => toggleCollapseEx(index)}
                  >
                  {exp.jobTitle || "Job Title"}, {exp.employer || "Employer"} {" "}
                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Start"}{" "}
                  -{" "}
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "End"}
                  
                </div>

                {/* Collapsible Card Content */}
                {!exp.collapsed && (
                  <div className="space-y-2 mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Job Title
                      </label>
                      <input
                        id="job-title"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Software Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Employer
                      </label>
                      <input
                        id="employer"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="ABC Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Company
                      </label>
                      <input
                        id="company"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="ABC Corp"
                      />
                    </div>

                    <div className="space-y-2 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <DatePicker
                          selected={exp.startDate ? new Date(exp.startDate) : null}
                          onChange={(date) => updateExperience(index, "startDate", date)}
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
                          onChange={(date) => updateExperience(index, "endDate", date)}
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
              onClick={addExperience}
              className="mt-2 text-blue-600 text-sm font-medium cursor-pointer  hover:text-blue-800 transition"
            >
              + Add Experience
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
                        if (experienceToDelete !== null) {
                          deleteExperience(experienceToDelete);
                        }
                        setShowDeleteModal(false);
                        setExperienceToDelete(null);
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
