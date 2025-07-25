import React from "react";
import DownloadPDFButton from "./DownloadPage";

const Header: React.FC = () => (
  <header
    className="flex items-center justify-between px-8 py-4 pb-6 bg-white border-b sticky top-0 z-50"
    style={{ borderColor: "#e5e7eb" }}
  >
    {/* Logo and Title */}
    <div className="flex items-center gap-2">
      <img src="/logo.png" alt="" className="h-8" />
      <span className="font-bold text-xl text-[#1a3e6b]">CVeezy</span>
    </div>

    {/* Saved status */}
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="7" cy="7" r="7" fill="#22C55E" />
          <path
            d="M4 7.5L6.2 9.5L10 5.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[#1a3e6b] font-medium">Saved</span>
    </div>

    {/* Actions */}
    <div className="flex items-center">
      <DownloadPDFButton />
    </div>
  </header>
);

export default Header;
