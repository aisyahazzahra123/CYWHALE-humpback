import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Download, RefreshCw, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Header from './Header';

const ResultDisplay = () => {
  const navigate = useNavigate();
  const { generationData } = useApp();
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!generationData) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generationData.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generationData.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${generationData.category.toLowerCase().replace(/\s+/g, '-')}-ai-generated.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate regeneration
    setTimeout(() => {
      setIsRegenerating(false);
      // In a real app, this would trigger a new generation with the same parameters
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-[var(--primary)] transition-colors duration-200 mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text)] mb-3 sm:mb-4">
            Generated Result
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Category: <span className="font-semibold text-[var(--primary)]">{generationData.category}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6mb-6 sm:mb-8">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-2">What you want to make:</h3>
                <div className="flex flex-wrap gap-2">
                  {generationData.make.map((item, index) => (
                    <span key={index} className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your role:</h3>
                <div className="flex flex-wrap gap-2">
                  {generationData.role.map((item, index) => (
                    <span key={index} className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description:</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {generationData.description}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text)]">
                AI Generated Content
              </h2>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
                
                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="flex items-center space-x-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                  <span className="text-sm">{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8">
              <pre className="whitespace-pre-wrap text-sm sm:text-base text-gray-800 leading-relaxed font-sans">
                {generationData.content}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultDisplay;