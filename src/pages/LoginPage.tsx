import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('Login attempt with:', { email, password });
    // Add your authentication logic here
    // After successful login, navigate to dashboard
    // navigate('/dashboard');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    // Add forgot password logic here
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen bg-[#f4faff] flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-white flex items-center px-8 py-6 shadow-sm">
        <div className="flex items-center">
          <img
            src="/images/bettercv-logo.png"
            alt="BetterCV Logo"
            className="h-8 w-8 mr-3"
          />
          <Link to="/" className="text-2xl font-bold text-[#222] font-sans hover:text-[#2196f3] transition-colors">
            CVeezy
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#2E404A] mb-8 leading-tight">
            Welcome back! Please sign in
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-[#2E404A] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-[#bde3fa] placeholder-gray-400 text-[#222] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A2FF] focus:border-transparent focus:z-10 text-lg bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-lg font-semibold text-[#2E404A]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-lg text-[#05A2FF] hover:text-[#2196f3] transition-colors font-semibold"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Forgot your password?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-[#bde3fa] placeholder-gray-400 text-[#222] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A2FF] focus:border-transparent focus:z-10 text-lg bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              />
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-lg text-white bg-[#05A2FF] hover:bg-[#2196f3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#05A2FF] transition-colors shadow"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <span className="text-lg text-[#2E404A] font-semibold">
                Don't have an account?{' '}
                <button
                  onClick={handleSignupClick}
                  className="text-[#05A2FF] hover:text-[#2196f3] font-bold transition-colors"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  Sign up here
                </button>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;