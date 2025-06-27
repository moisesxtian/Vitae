export default function Navbar() {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Logo using BucklaneScript */}
              <div className="text-accent2 text-4xl font-bold font-logo">
                Vitae
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-sans"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-sans"
                >
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
