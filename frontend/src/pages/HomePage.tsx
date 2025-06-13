import { Link } from 'react-router-dom';
import { FaYoutube, FaGraduationCap, FaUsers, FaCertificate } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform YouTube Playlists into Premium Courses
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Learn with structure, track progress, earn certificates, and connect with learners
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/signup" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Beyout?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaYoutube className="w-12 h-12" />}
              title="YouTube Integration"
              description="Convert any YouTube playlist into a structured course with chapters based on timestamps"
            />
            <FeatureCard
              icon={<FaGraduationCap className="w-12 h-12" />}
              title="Smart Learning"
              description="AI-generated quizzes, exercise links, and progress tracking for effective learning"
            />
            <FeatureCard
              icon={<FaUsers className="w-12 h-12" />}
              title="Community Features"
              description="Connect with instructors and learners, share insights, and learn together"
            />
            <FeatureCard
              icon={<FaCertificate className="w-12 h-12" />}
              title="Earn Certificates"
              description="Get personalized certificates upon course completion to showcase your achievements"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Paste YouTube Playlist"
              description="Simply paste a YouTube playlist URL to get started"
            />
            <StepCard
              number="2"
              title="Learn with Structure"
              description="Videos are split into chapters with quizzes and exercises"
            />
            <StepCard
              number="3"
              title="Track & Certify"
              description="Monitor your progress and earn certificates"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of learners who are turning YouTube content into structured education
          </p>
          <Link to="/signup" className="btn-primary text-lg px-8 py-3">
            Start Learning Today
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="card p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-primary-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;