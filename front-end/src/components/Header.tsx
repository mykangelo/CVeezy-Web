// components/Header.tsx
import React from 'react';

const Header: React.FC = () => (
<header className="w-full bg-white flex items-center px-8 py-6 shadow-sm">
  <div className="flex items-center">
    <img
      src="/images/bettercv-logo.png"
      alt="BetterCV Logo"
      className="h-8 w-8 mr-3"
    />
    <span className="text-2xl font-bold text-[#222] font-sans">CVeezy</span>
  </div>
</header>
);

export default Header;
