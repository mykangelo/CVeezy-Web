import React from "react";
import { Plus } from "lucide-react";
import RichTextEditor from "../../components/RichTextEditor";

interface SummaryTabProps {
  summaryText: string;
  setSummaryText: (text: string) => void;
  hideTitle?: boolean;
  hideSuggestions?: boolean;
}

const Summary: React.FC<SummaryTabProps> = ({ 
  summaryText, 
  setSummaryText, 
  hideTitle = false,
  hideSuggestions = false 
}) => {
  const summaryTemplates = [
    "Detail-oriented professional with 3+ years of experience in [field]. Skilled in [key skills]. Seeking to contribute to [type of team/company or goal].",
    "Motivated recent graduate with a background in [field]. Eager to apply skills in [skill area] and grow within a dynamic organization.",
    "Creative thinker with a passion for [field]. Experienced in [tools or platforms]. Looking to bring fresh ideas to a forward-thinking team.",
    "Results-driven professional with expertise in [field]. Proven track record of [achievement]. Ready to take on new challenges in [industry]."
  ];

  const handleTemplateClick = (template: string) => {
    setSummaryText(template);
  };

  return (
    <>
      {!hideTitle && (
        <>
          <h2 className="text-2xl font-bold mb-2">Summary</h2>
          <p className="text-gray-600 mb-6">
            Write a short introduction that highlights your experience, key skills, and career goals.
          </p>
        </>
      )}
      
      <div className="mb-6">
        {!hideTitle && (
          <label className="block text-sm font-medium mb-1">Professional Summary</label>
        )}
        <RichTextEditor
          content={summaryText}
          setContent={setSummaryText}
          placeholder="Write your professional summary here..."
        />
      </div>

      {!hideSuggestions && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Suggested summary structure</h3>
          <p className="text-gray-500 text-sm mb-4">Click an example to insert and customize.</p>
          
          <div className="grid grid-cols-2 gap-3">
            {summaryTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateClick(template)}
                className="flex items-start gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
              >
                <Plus className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{template}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;