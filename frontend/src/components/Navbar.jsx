import { Link,useNavigate} from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="bg-bgcolor shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Logo using BucklaneScript */}
              <div className="text-accent2 text-4xl font-bold font-logo hover:scale-105 hover:rotate-2 transition-transform duration-300 cursor-pointer" onClick={() => navigate('/')}>
                Vitae
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-dark hover:text-accent2 px-3 py-2 rounded-md text-sm font-medium font-sans"
                >
                  Home
                </Link>
                <Link
                  to="/create"
                  className="text-dark hover:text-accent2 px-3 py-2 rounded-md text-sm font-medium font-sans"
                >
                  Create
                </Link>
                <Link
                  to="/about"
                  className="text-dark hover:text-accent2 px-3 py-2 rounded-md text-sm font-medium font-sans"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
