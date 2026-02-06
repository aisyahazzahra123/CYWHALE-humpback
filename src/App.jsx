import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CategorySelection from './components/CategorySelection';
import ResultDisplay from './components/ResultDisplay';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#FAFAFA]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:category" element={<CategorySelection />} />
          <Route path="/result" element={<ResultDisplay />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;