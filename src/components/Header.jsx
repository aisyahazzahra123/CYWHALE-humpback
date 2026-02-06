import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4sm:py-6">
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer flex items-center space-x-3"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">CW</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
              CYWHALE-HUMPBACK
            </h1>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-[var(--primary)] transition-colors duration-200">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-[var(--primary)] transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-[var(--primary)] transition-colors duration-200 w-full">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;