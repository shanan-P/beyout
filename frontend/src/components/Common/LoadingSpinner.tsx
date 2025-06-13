interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner = ({ fullScreen = false, size = 'md', message }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full animate-pulse-glow" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur-md" />
          <div className="relative w-full h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full">
            <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-full" />
            <div className="absolute inset-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;