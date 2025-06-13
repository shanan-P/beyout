import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Create your account to start learning</p>
        <Link to="/login" className="btn-primary">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;