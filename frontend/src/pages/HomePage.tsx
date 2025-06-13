import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiBookOpen, FiUsers, FiAward, FiTrendingUp, FiZap, FiShield } from 'react-icons/fi';
import { useAuthStore } from '../stores/authStore';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: FiBookOpen,
      title: 'Interactive Courses',
      description: 'Learn through hands-on projects and real-world examples with our interactive learning platform.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiUsers,
      title: 'Community Learning',
      description: 'Connect with learners worldwide, share knowledge, and grow together in our vibrant community.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiAward,
      title: 'Earn Certificates',
      description: 'Get recognized for your achievements with verified certificates upon course completion.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and personalized insights.',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Learners' },
    { value: '500+', label: 'Expert Instructors' },
    { value: '1000+', label: 'Courses' },
    { value: '95%', label: 'Success Rate' },
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
              New courses added weekly
            </span>
          </div>

          {/* Hero heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Master New Skills
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Transform Your Career
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of learners advancing their careers with expert-led courses, 
            hands-on projects, and a supportive community.
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-appear"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Why Choose LearnHub?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
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
                Start Your Learning Journey Today
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our community of learners and unlock your potential with free access to premium courses.
              </p>
              <Link 
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group"
              >
                <span>{isAuthenticated ? "Explore Courses" : "Get Started for Free"}</span>
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