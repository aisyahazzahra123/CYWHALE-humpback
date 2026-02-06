import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Zap, Briefcase, Users, Play, HelpCircle, Wrench } from 'lucide-react';
import Header from './Header';

const Dashboard = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'build-tools',
      title: 'Build internal tools',
      description: 'Create custom applications and tools for your team',
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'start-business',
      title: 'Start a business',
      description: 'Get ideas and plans to launch your new venture',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'client-work',
      title: 'Client work',
      description: 'Deliver exceptional projects for your clients',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'entertainment',
      title: 'Play/entertainment',
      description: 'Create fun and engaging content or games',
      icon: <Play className="w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      id: 'solve-problem',
      title: 'Solve my problem',
      description: 'Get solutions for your specific challenges',
      icon: <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 'prototypes',
      title: 'Prototypes for work',
      description: 'Build and test your ideas quickly',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4 sm:mb-6">
            Welcome to <span className="text-[var(--primary)]">CYWHALE-HUMPBACK</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your intelligent AI assistant for creating anything you need. Choose a category to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 sm:p-8 border border-gray-100"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center text-white mb-4 sm:mb-6mx-auto`}>
                {category.icon}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text)] mb-3 sm:mb-4 text-center">
                {category.title}
              </h3>
              
              <p className="text-gray-600 text-center leading-relaxed mb-6 sm:mb-8">
                {category.description}
              </p>
              
              <button className={`w-full bg-gradient-to-r ${category.gradient} text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200text-sm sm:text-base`}>
                Generate
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;