
export default function MainPage() {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Background Resume Preview */}
      <div className="absolute bottom-0 right-0 -translate-y-0 md:top-1/2 md:-translate-y-1/2 md:-right-20 z-0">
        <div className="w-[250px] h-[350px] md:w-[600px] md:h-[850px] bg-white border border-gray-300 rounded-xl shadow-2xl p-6 blur-[2px] md: opacity-50 md:blur-[1px] pointer-events-none select-none">
          {/* Fake Resume Header */}
          <div className="text-xl text-center font-bold mb-4 text-gray-800">Christian Moises</div>
          <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-2 bg-gray-300 rounded w-1/3 mx-auto mb-8"></div>

          {/* Resume Sections */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-3 w-1/4 bg-gray-400 rounded mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-2 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-8 h-full">
        {/* Left Content */}
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
