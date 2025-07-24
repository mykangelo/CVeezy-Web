import React, { useState } from "react";
import { Trash2, Plus, GripVertical } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  level: string;
}

interface SkillsTabProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  showExperienceLevel: boolean;
  setShowExperienceLevel: (show: boolean) => void;
}


export const SkillLevelSlider = ({
  level,
  onChange,
}: {
  level: string;
  onChange: (level: string) => void;
}) => {
  const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

  return (
    <div className="flex flex-col items-center w-64"> {/* Fixed width container */}
      <div className="text-sm font-medium text-gray-700 mb-1">
        Level - {level}
      </div>

      <div className="flex h-8 w-full bg-blue-200 rounded-md overflow-hidden">
        {skillLevels.map((skillLevel, index) => (
          <div
            key={skillLevel}
            onClick={() => onChange(skillLevel)}
            className={`flex-1 border-r border-white last:border-r-0 cursor-pointer transition-colors ${
              skillLevels.indexOf(level) >= index ? "bg-blue-600" : "bg-blue-200"
            }`}
            title={skillLevel}
          />
        ))}
      </div>

      <div className="flex w-full justify-between text-xs text-gray-500 mt-1">
        {skillLevels.map((skillLevel) => (
          <span key={skillLevel} className="w-1/5 text-center truncate">
            {skillLevel.charAt(0)}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsTabProps> = ({
  skills,
  setSkills,
  showExperienceLevel,
  setShowExperienceLevel,
}) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  // Skill operations
  const addSkill = () => {
    setSkills([...skills, { id: Date.now(), name: "", level: "Novice" }]);
  };

  const updateSkill = (id: number, field: string, value: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const deleteSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => setDraggedItem(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newSkills = [...skills];
    const [removed] = newSkills.splice(draggedItem, 1);
    newSkills.splice(dropIndex, 0, removed);
    setSkills(newSkills);
    setDraggedItem(null);
  };

  return (
    <div className="skills-container">
      <h2 className="text-2xl font-bold mb-2">Skills</h2>
      <p className="text-gray-600 mb-6">Add your most relevant professional skills.</p>

      {/* Experience Level Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setShowExperienceLevel(!showExperienceLevel)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            showExperienceLevel ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              showExperienceLevel ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700">Show experience level</span>
      </div>

      {/* Skills List */}
      <div className="space-y-3 mb-4">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="skill-item"
          >
            <GripVertical className="drag-handle" />

            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              placeholder="Enter skill"
              className="skill-input"
            />

            {showExperienceLevel && (
              <SkillLevelSlider
                level={skill.level}
                onChange={(level) => updateSkill(skill.id, "level", level)}
              />
            )}

            <button onClick={() => deleteSkill(skill.id)} className="delete-button">
              <Trash2 className="icon" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Skill Button */}
      <button onClick={addSkill} className="add-skill-button">
        <Plus className="icon" />
        Add Skill
      </button>
    </div>
  );
};

export default Skills;
