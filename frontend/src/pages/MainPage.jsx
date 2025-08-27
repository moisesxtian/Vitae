import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Floating Resume Preview */}
      <motion.div
        className="absolute bottom-0 right-0 md:top-1/2 md:-translate-y-1/2 md:-right-20 z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className="w-[250px] h-[350px] md:w-[600px] md:h-[850px] bg-white border border-gray-300 rounded-xl shadow-2xl p-6 opacity-60 blur-[1px] pointer-events-none select-none">
          {/* Fake Resume Header */}
          <div className="text-xl text-center font-bold mb-4 text-gray-800">
            Christian Moises
          </div>
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
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-8 h-full">
        {/* Left Content */}
        <div className="space-y-8 py-12 md:py-0">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Build your resume <br />
            <span className="text-blue-600">Instanly.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Answer a few questions and get a polished, professional resume
            generated in minutes.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["0 0 0px #2563eb", "0 0 25px #2563eb", "0 0 0px #2563eb"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => navigate("/create")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition duration-300 ease-in-out"
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Background Gradient Glow */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <motion.div
    className="absolute top-0 -left-1/3 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl"
    animate={{ x: ["0%", "250%"] }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  />
</div>

<motion.div className="absolute -z-10 inset-0"
  style={{
    background: "radial-gradient(600px 300px at 10% 10%, rgba(59,130,246,.2), transparent), radial-gradient(600px 300px at 90% 90%, rgba(99,102,241,.2), transparent)"
  }}
  animate={{ opacity: [0.3, 0.6, 0.3] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
/>
    </div>
  );
}
