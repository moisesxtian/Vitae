import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Pencil, Linkedin } from 'lucide-react';

export default function Create() {
  const navigate = useNavigate();

  const buildOptions = [
    {
      title: 'Smart AI Build',
      description: 'Answer a few questions, and let our AI craft your resume.',
      icon: <Sparkles className="w-8 h-8 text-gray-400" />,
      route: '/create/ai',
      disabled: true, // Mark as in-progress
    },
    {
      title: 'Manual Build',
      description: 'Start from scratch and enter details manually.',
      icon: <Pencil className="w-8 h-8 text-primary" />,
      route: '/create/manual',
    },
    {
      title: 'Import LinkedIn',
      description: 'Fetch and parse your LinkedIn profile into a resume.',
      icon: <Linkedin className="w-8 h-8 text-primary" />,
      route: '/create/linkedin',
      disabled: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-bgcolor text-dark flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent2 mb-2 text-center">
        Choose Build Type
      </h1>

      <p className="text-dark/70 mb-8 text-center max-w-lg text-sm sm:text-base">
        How would you like to start building your resume?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
        {buildOptions.map((option, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (!option.disabled) navigate(option.route);
            }}
            className={`cursor-pointer border rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 
              ${option.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'hover:shadow-lg hover:scale-[1.02] bg-bgcolor border-dark/10'}
            `}
          >
            <div className="mb-3">{option.icon}</div>
            <h2 className={`text-lg sm:text-xl font-semibold ${option.disabled ? 'text-gray-400' : 'text-accent2'}`}>
              {option.title}
            </h2>
            <p className="text-sm text-dark/60 mt-2">
              {option.description}
              {option.disabled && <span className="block text-xs mt-1 text-gray-400">(Coming Soon)</span>}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/')}
        className="mt-10 text-sm text-primary hover:underline"
      >
        ← Back to Home
      </button>
    </div>
  );
}
