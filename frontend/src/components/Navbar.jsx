import React from "react";

export default function MainPage() {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Background Resume Preview */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <div className="w-[600px] h-[800px] md:w-[800px] md:h-[1000px] lg:w-[1000px] lg:h-[1200px] opacity-10 blur-sm scale-125 transition-all duration-300 pointer-events-none select-none bg-white border border-gray-300 rounded-xl shadow-2xl p-8">
          {/* Fake lines to simulate resume */}
          <div className="text-5xl text-center font-bold mb-4">Christian Moises</div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto mb-12"></div>

          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-1/4 bg-gray-400 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center px-8">
        {/* Left Section */}
        <div className="space-y-6 py-12 md:py-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Build your resume with AI
          </h1>
          <p className="text-lg text-gray-600">
            Answer a few questions and get a polished, professional resume generated in minutes.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg transition duration-300 ease-in-out">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
