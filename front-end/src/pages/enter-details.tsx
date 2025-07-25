import React, { useState } from "react";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Contacts from "./builder/cntc";
import Experience from "./builder/expr";
import Education from "./builder/educ";
import Summary from "./builder/sum";
import { FinalizeTab } from "./builder/fin";


// Type definitions
interface LanguageItem {
  id: number;
  content: string;
  level: string;
}

interface WebsiteItem {
  id: number;
  content: string;
  title: string;
  url: string;
}

interface BaseSectionItem {
  id: number;
  content: string;
}

type SectionItem = BaseSectionItem | LanguageItem | WebsiteItem;

interface CustomSection {
  id: number;
  name: string;
  items: SectionItem[];
}

interface Skill {
  id: number;
  name: string;
  level: string;
}

// Skill Level Slider Component
interface SkillLevelSliderProps {
  level: string;
  onChange: (level: string) => void;
}

const SkillLevelSlider: React.FC<SkillLevelSliderProps> = ({ level, onChange }) => {
  const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const currentIndex = skillLevels.indexOf(level);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-16">{level}</span>
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="4"
          value={currentIndex}
          onChange={(e) => onChange(skillLevels[parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          {skillLevels.map((_, index) => (
            <div key={index} className="w-1 h-1 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Skills Tab Component
interface SkillsTabProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  showExperienceLevel: boolean;
  setShowExperienceLevel: (show: boolean) => void;
}

const Skills: React.FC<SkillsTabProps> = ({
  skills,
  setSkills,
  showExperienceLevel,
  setShowExperienceLevel,
}) => {
  const addSkill = () => {
    setSkills([...skills, { id: Date.now(), name: "", level: "Novice" }]);
  };

  const updateSkill = (id: number, field: keyof Skill, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
    if (isNaN(draggedIndex)) return;

    const draggedSkill = skills[draggedIndex];
    const newSkills = [...skills];
    newSkills.splice(draggedIndex, 1);
    newSkills.splice(dropIndex, 0, draggedSkill);
    
    setSkills(newSkills);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Skills</h2>
      <p className="text-gray-600 mb-6">Add your most relevant professional skills.</p>
      
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setShowExperienceLevel(!showExperienceLevel)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            showExperienceLevel ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          aria-label={showExperienceLevel ? "Hide experience levels" : "Show experience levels"}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              showExperienceLevel ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700">Show experience level</span>
      </div>

      <div className="space-y-3 mb-4">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
            aria-label={`Skill: ${skill.name || 'Unnamed skill'}`}
          >
            <GripVertical 
              className="w-4 h-4 text-gray-400 cursor-grab" 
              aria-label="Drag handle" 
            />
            
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="Enter skill"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Skill name"
            />
            
            {showExperienceLevel && (
              <div className="w-64">
                <SkillLevelSlider 
                  level={skill.level} 
                  onChange={(level) => updateSkill(skill.id, 'level', level)}
                />
              </div>
            )}
            
            <button
              onClick={() => deleteSkill(skill.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              aria-label="Delete skill"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        aria-label="Add new skill"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>
    </>
  );
};

const steps = ["Contacts", "Experience", "Education", "Skills", "Summary", "Finalize"];

const EnterDetails: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<Skill[]>([{ id: Date.now(), name: "", level: "Novice" }]);
  const [showExperienceLevel, setShowExperienceLevel] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  const [hovered, setHovered] = useState(false);
  
  // Finalize tab states
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [certifications, setCertifications] = useState<SectionItem[]>([]);
  const [awards, setAwards] = useState<SectionItem[]>([]);
  const [websites, setWebsites] = useState<WebsiteItem[]>([]);
  const [showReferences, setShowReferences] = useState(false);
  const [hobbies, setHobbies] = useState<SectionItem[]>([]);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Contacts/>;
      case 1:
        return <Experience />;
      case 2:
        return <Education />;
      case 3:
        return <Skills {...{ skills, setSkills, showExperienceLevel, setShowExperienceLevel }} />;
      case 4:
        return <Summary summaryText={summaryText} setSummaryText={setSummaryText} />;
      case 5:
        return (
          <FinalizeTab 
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
            languages={languages}
            setLanguages={setLanguages}
            certifications={certifications}
            setCertifications={setCertifications}
            awards={awards}
            setAwards={setAwards}
            websites={websites}
            setWebsites={setWebsites}
            showReferences={showReferences}
            setShowReferences={setShowReferences}
            hobbies={hobbies}
            setHobbies={setHobbies}
            customSections={customSections}
            setCustomSections={setCustomSections}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side */}
      <div className="lg:w-1/2 w-full bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-[95%] h-[90%] bg-white rounded-xl shadow-lg p-8 overflow-auto">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-xs font-medium text-gray-500 cursor-pointer"
                onClick={() => setCurrentStep(index)}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                    index === currentStep
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {index === currentStep && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  )}
                </div>
                <span className="mt-1 text-center">{step}</span>
              </div>
            ))}
          </div>

          {renderStepContent()}
        </div>

        <div className="w-[95%] mt-2 bg-white p-4 rounded-xl shadow-md flex justify-between">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="bg-gray-200 px-6 py-2 rounded-md text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length - 1) {
                navigate("/download");
              } else {
                setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
              }
            }}
            className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            Next: {steps[currentStep + 1] || "Done"}
          </button>

        </div>
      </div>


      {/* Right Panel - Resume Preview */}
      <div className="lg:w-1/2 w-full bg-gray-100 relative p-4">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative bg-slate-50 shadow-2xl rounded-2xl border border-gray-300 pt-10">
            <div className="absolute top-4 left-0 w-full px-6 flex justify-between items-center text-sm font-medium text-gray-600">
              <span>Resume Score</span>
              {hovered && (
                <span className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition">
                  Change Template
                </span>
              )}
            </div>

            <div className="w-[525px] h-[772px] bg-white shadow-lg p-6 mx-auto overflow-auto">
              <h2 className="text-2xl font-bold mb-4">Your Name</h2>
              <p className="text-gray-600 mb-2">Professional Title</p>
              <hr className="my-4" />
              <section className="mb-4">
                <h3 className="text-lg font-semibold">Experience</h3>
                <p className="text-sm text-gray-700">• Job Title at Company</p>

              </section>
              <section className="mb-4">
                <h3 className="text-lg font-semibold">Education</h3>
                <p className="text-sm text-gray-700">• Degree at University</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold">Skills</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Skill 1</li>
                  <li>Skill 2</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterDetails;