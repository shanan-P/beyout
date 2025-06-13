import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header will go here */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600">Beyout</h1>
            <nav className="flex gap-4">
              <a href="/" className="text-gray-700 hover:text-primary-600">Home</a>
              <a href="/login" className="text-gray-700 hover:text-primary-600">Login</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer will go here */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Beyout. Transform YouTube playlists into courses.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;