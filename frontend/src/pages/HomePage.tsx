import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiBookOpen, FiUsers, FiAward, FiTrendingUp, FiZap, FiShield } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: FiBookOpen,
      title: 'YouTube to Courses',
      description: 'Transform any YouTube playlist into a structured learning course with chapters, notes, and progress tracking.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiUsers,
      title: 'Community Learning',
      description: 'Connect with other learners, share insights, and discuss course content in dedicated community spaces.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiAward,
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with detailed progress tracking and completion certificates.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Personalized Learning',
      description: 'Get personalized recommendations based on your interests and learning patterns.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center animate-appear">
          {/* Hero badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 backdrop-blur-sm border border-primary-500/20 rounded-full px-4 py-2 mb-8">
            <FiZap className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Transform YouTube content into structured courses
            </span>
          </div>

          {/* Hero heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Learn Smarter with
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Beyout
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Turn any YouTube playlist into a comprehensive learning experience. 
            Add structure, track progress, and learn together with a community.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="group btn-primary text-lg px-8 py-4 inline-flex items-center justify-center space-x-2"
            >
              <span>{isAuthenticated ? "Go to Dashboard" : "Start Learning Free"}</span>
              <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="btn-glass text-lg px-8 py-4 inline-flex items-center justify-center space-x-2 text-gray-900 dark:text-white">
              <FiPlay className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Platform highlights instead of fake stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-appear">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
                Free
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Forever for Learners
              </div>
            </div>
            <div className="text-center animate-appear" style={{ animationDelay: '100ms' }}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
                Open
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Community Driven
              </div>
            </div>
            <div className="text-center animate-appear" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
                Simple
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Easy to Get Started
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Why Choose Beyout?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We make online learning more structured and social
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group card-hover p-8 animate-appear"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-glass p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10" />
            
            <div className="relative z-10">
              <FiShield className="w-16 h-16 mx-auto mb-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join Beyout today and start converting YouTube content into structured courses. 
                It's free to start and always will be for learners.
              </p>
              <Link 
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group"
              >
                <span>{isAuthenticated ? "Create Your First Course" : "Get Started for Free"}</span>
                <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;