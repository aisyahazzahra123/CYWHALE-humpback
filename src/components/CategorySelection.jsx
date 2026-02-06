import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from './Header';

const CategorySelection = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { setGenerationData } = useApp();
  const [selectedMake, setSelectedMake] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const makeOptions = [
    'Business/work', 'Video/photo', 'Music/audio', 'Productivity',
    'Mobile game', 'Dating', 'Social media', 'News/content',
    'Shopping/marketplace', 'Fitness/health'
  ];

  const roleOptions = [
    'Sales', 'Product manager', 'Content creator/influencer',
    'Designer', 'Software engineer', 'Founder/entrepreneur',
    'Marketing professional'
  ];

  const categoryTitles = {
    'build-tools': 'Build Internal Tools',
    'start-business': 'Start a Business',
    'client-work': 'Client Work',
    'entertainment': 'Play/Entertainment',
    'solve-problem': 'Solve My Problem',
    'prototypes': 'Prototypes for Work'
  };

  const handleMakeToggle = (option) => {
    setSelectedMake(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleRoleToggle = (option) => {
    setSelectedRole(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleGenerate = async () => {
    if (selectedMake.length === 0 || selectedRole.length === 0 || !description.trim()) {
      alert('Please fill in all fields before generating.');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedContent = `Generated content for ${categoryTitles[category]}:\n\nWhat you want to make: ${selectedMake.join(', ')}\nYour role: ${selectedRole.join(', ')}\nDescription: ${description}\n\nAI Response: Based on your requirements, here's a comprehensive solution tailored for ${categoryTitles[category]}. This includes detailed implementation steps, best practices, and actionable insights to help you achieve your goals effectively.`;
      
      setGenerationData({
        category: categoryTitles[category],
        content: generatedContent,
        make: selectedMake,
        role: selectedRole,
        description
      });
      
      setIsLoading(false);
      navigate('/result');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6sm:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 mb-4sm:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3 sm:mb-4">
            {categoryTitles[category]}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Configure your preferences to get personalized AI-generated content.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8 sm:space-y-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-4 sm:mb-6">
              I want to make:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {makeOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-[var(--primary)] cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedMake.includes(option)}
                    onChange={() => handleMakeToggle(option)}
                    className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <span className="text-sm sm:text-base text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-4 sm:mb-6">
              I am a:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {roleOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-[var(--primary)] cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedRole.includes(option)}
                    onChange={() => handleRoleToggle(option)}
                    className="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <span className="text-sm sm:text-base text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-4 sm:mb-6">
              Description:
            </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your specific requirements, goals, or what you'd like to achieve..."
              rows={6}
              className="w-full p-4 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] resize-none text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Back
            </button>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full sm:flex-1 bg-gradient-to-r from-[var(--primary)] to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategorySelection;