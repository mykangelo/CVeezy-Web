import React from "react";
import Header from "../downloadpage/Header";
import Sidebar from "../downloadpage/SideBar";
import DownloadPDFButton from "../downloadpage/DownloadPage";

const DownloadLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Full-width Header at the top */}
      <Header />

      {/* Rest of the layout: Sidebar + Main Content */}
      <div className="flex flex-1">
        <Sidebar onSelect={() => {}} />
        <main className="flex-1 p-8">
          {/* Content goes here */}
        </main>
      </div>
    </div>
  );
};

export default DownloadLayout;
