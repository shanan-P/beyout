const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
          <p className="text-gray-600 dark:text-gray-400">Continue your learning journey</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
