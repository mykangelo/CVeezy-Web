import React, { useState } from "react";
import { Trash2, Plus, Languages, Award, Globe, Users, Heart, Settings, ChevronDown, ChevronRight } from "lucide-react";
import RichTextEditor from "../../components/RichTextEditor";

interface BaseSectionItem {
  id: number;
  content: string;
}

interface LanguageItem extends BaseSectionItem {
  level: string;
}

interface WebsiteItem extends BaseSectionItem {
  title: string;
  url: string;
}

type SectionItem = BaseSectionItem | LanguageItem | WebsiteItem;

interface CustomSection {
  id: number;
  name: string;
  items: SectionItem[];
}

interface FinalizeTabProps {
  selectedSections: string[];
  setSelectedSections: React.Dispatch<React.SetStateAction<string[]>>;
  languages: LanguageItem[];
  setLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>;
  certifications: SectionItem[];
  setCertifications: React.Dispatch<React.SetStateAction<SectionItem[]>>;
  awards: SectionItem[];
  setAwards: React.Dispatch<React.SetStateAction<SectionItem[]>>;
  websites: WebsiteItem[];
  setWebsites: React.Dispatch<React.SetStateAction<WebsiteItem[]>>;
  showReferences: boolean;
  setShowReferences: React.Dispatch<React.SetStateAction<boolean>>;
  hobbies: SectionItem[];
  setHobbies: React.Dispatch<React.SetStateAction<SectionItem[]>>;
  customSections: CustomSection[];
  setCustomSections: React.Dispatch<React.SetStateAction<CustomSection[]>>;
}


const isLanguageItem = (item: SectionItem): item is LanguageItem => {
  return 'level' in item;
};


const isWebsiteItem = (item: SectionItem): item is WebsiteItem => {
  return 'title' in item && 'url' in item;
};

interface SectionInputProps<T extends SectionItem> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  placeholder: string;
  showLevel?: boolean;
  isWebsite?: boolean;
  useRichText?: boolean;
}
interface LanguageLevelSliderProps {
  level: string;
  onChange: (level: string) => void;
}

//Slider
const LanguageLevelSlider: React.FC<LanguageLevelSliderProps> = ({ level, onChange }) => {
  const languageLevels = ["Elementary", "Intermediate", "Proficient", "Advanced", "Native"];
  const currentIndex = languageLevels.indexOf(level);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-20">{level}</span>
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="4"
          value={currentIndex}
          onChange={(e) => onChange(languageLevels[parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          {languageLevels.map((_, index) => (
            <div key={index} className="w-1 h-1 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionInput = <T extends SectionItem>({
  items,
  setItems,
  placeholder,
  showLevel = false,
  isWebsite = false,
  useRichText = false,
}: SectionInputProps<T>) => {
  const addItem = () => {
    const newItem = isWebsite 
      ? { id: Date.now(), content: "", title: "", url: "" } as T
      : showLevel
      ? { id: Date.now(), content: "", level: "Elementary" } as T
      : { id: Date.now(), content: "" } as T;
    
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: number, field: string, value: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="mt-4 space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          {isWebsiteItem(item) ? (
            <>
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                placeholder="Link Title"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                value={item.url}
                onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                placeholder="URL"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          ) : useRichText ? (
            <div className="flex-1">
              <RichTextEditor
                content={item.content}
                setContent={(content) => updateItem(item.id, 'content', content)}
                placeholder={placeholder}
                hideToolbar={false}
              />
            </div>
          ) : (
            <input
              type="text"
              value={item.content}
              onChange={(e) => updateItem(item.id, 'content', e.target.value)}
              placeholder={placeholder}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

            {showLevel && isLanguageItem(item) && (
            <LanguageLevelSlider 
              level={item.level}
              onChange={(level) => updateItem(item.id, 'level', level)}
            />
          )}

          <button
            onClick={() => deleteItem(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        type="button"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>
    </div>
  );
};

const CustomSectionManager = ({
  customSections,
  setCustomSections
}: {
  customSections: CustomSection[];
  setCustomSections: React.Dispatch<React.SetStateAction<CustomSection[]>>;
}) => {
  const updateSectionItems = (id: number, newItems: SectionItem[]) => {
    setCustomSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, items: newItems } : section
      )
    );
  };

  return (
    <div className="space-y-4">
      {customSections.map(section => (
        <div key={section.id} className="border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={section.name}
              onChange={(e) => {
                const newName = e.target.value;
                setCustomSections(prev =>
                  prev.map(s => (s.id === section.id ? { ...s, name: newName } : s))
                );
              }}
              placeholder="Section name"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              onClick={() => {
                setCustomSections(prev => prev.filter(s => s.id !== section.id));
              }}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <SectionInput<SectionItem>
            items={section.items}
            setItems={(action) =>
                updateSectionItems(section.id,typeof action === "function" ? action(section.items) : action)
                }
            placeholder="Enter content for this section"
            useRichText={true}
          />
        </div>
      ))}
      
      <button
        onClick={() => {
          setCustomSections(prev => [
            ...prev,
            { id: Date.now(), name: "", items: [] }
          ]);
        }}
        className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        type="button"
      >
        <Plus className="w-4 h-4" />
        Add Custom Section
      </button>
    </div>
  );
};

//Collapsible section component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
  children: React.ReactNode;
  itemCount?: number;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  isSelected,
  isExpanded,
  onToggleSelect,
  onToggleExpand,
  children,
  itemCount = 0
}) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <button
          onClick={onToggleSelect}
          className={`flex items-center gap-3 flex-1 text-left transition-colors ${
            isSelected
              ? 'text-blue-700'
              : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          <div className={`p-2 rounded-full ${
            isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
          }`}>
            {icon}
          </div>
          <div>
            <span className="text-sm font-medium">{title}</span>
            {isSelected && itemCount > 0 && (
              <span className="ml-2 text-xs text-gray-500">({itemCount} items)</span>
            )}
          </div>
        </button>
        
        {isSelected && (
          <button
            onClick={onToggleExpand}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      {isSelected && isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export const FinalizeTab: React.FC<FinalizeTabProps> = ({
  selectedSections,
  setSelectedSections,
  languages,
  setLanguages,
  certifications,
  setCertifications,
  awards,
  setAwards,
  websites,
  setWebsites,
  showReferences,
  setShowReferences,
  hobbies,
  setHobbies,
  customSections,
  setCustomSections
}) => {
 
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setSelectedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleExpanded = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const availableSections = [
    { 
      name: "Languages", 
      icon: <Languages className="w-5 h-5" />,
      itemCount: languages.length
    },
    { 
      name: "Certifications and Licenses", 
      icon: <Award className="w-5 h-5" />,
      itemCount: certifications.length
    },
    { 
      name: "Awards and Honors", 
      icon: <Award className="w-5 h-5" />,
      itemCount: awards.length
    },
    { 
      name: "Websites and Social Media", 
      icon: <Globe className="w-5 h-5" />,
      itemCount: websites.length
    },
    { 
      name: "References", 
      icon: <Users className="w-5 h-5" />,
      itemCount: showReferences ? 1 : 0
    },
    { 
      name: "Hobbies and Interests", 
      icon: <Heart className="w-5 h-5" />,
      itemCount: hobbies.length
    },
    { 
      name: "Custom Sections", 
      icon: <Settings className="w-5 h-5" />,
      itemCount: customSections.length
    }
  ];

  return (
    <div className="pb-8">
      <h2 className="text-2xl font-bold mb-2">Finalize</h2>
      <p className="text-gray-500 text-sm mb-6">
        Add certifications, languages, awards, or any extra details you want recruiters to see.
      </p>

      <div className="space-y-3">
        {availableSections.map(({ name, icon, itemCount }) => (
          <CollapsibleSection
            key={name}
            title={name}
            icon={icon}
            isSelected={selectedSections.includes(name)}
            isExpanded={expandedSections.includes(name)}
            onToggleSelect={() => toggleSection(name)}
            onToggleExpand={() => toggleExpanded(name)}
            itemCount={itemCount}
          >
            {name === "Languages" && (
              <SectionInput<LanguageItem>
                items={languages}
                setItems={setLanguages}
                placeholder="Enter language"
                showLevel={true}
              />
            )}

            {name === "Certifications and Licenses" && (
              <SectionInput<SectionItem>
                items={certifications}
                setItems={setCertifications}
                placeholder="Enter certification details"
                useRichText={true}
              />
            )}

            {name === "Awards and Honors" && (
              <SectionInput<SectionItem>
                items={awards}
                setItems={setAwards}
                placeholder="Enter award details"
                useRichText={true}
              />
            )}

            {name === "Websites and Social Media" && (
              <SectionInput<WebsiteItem>
                items={websites}
                setItems={setWebsites}
                placeholder="Enter website details"
                isWebsite={true}
              />
            )}

            {name === "References" && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showReferences}
                    onChange={(e) => setShowReferences(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Show "References available upon request"
                  </span>
                </label>
              </div>
            )}

            {name === "Hobbies and Interests" && (
              <SectionInput<SectionItem>
                items={hobbies}
                setItems={setHobbies}
                placeholder="Enter hobby or interest"
              />
            )}

            {name === "Custom Sections" && (
              <CustomSectionManager
                customSections={customSections}
                setCustomSections={setCustomSections}
              />
            )}
          </CollapsibleSection>
        ))}
      </div>

      <div className="mt-8">
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
          Finish
        </button>
      </div>
    </div>
  );
};