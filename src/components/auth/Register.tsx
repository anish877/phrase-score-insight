import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password || !confirmPassword) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (!email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }

    try {
      await register(email, password, name || undefined);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      
      // Handle specific error cases
      if (errorMessage.includes('already exists')) {
        setFormError('An account with this email already exists. Please try logging in instead.');
      } else {
        setFormError(errorMessage);
      }
    }
  };

  const displayError = formError || error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Apple-style clean header */}
      <div className="w-full max-w-sm text-center mb-6">
        <div className="mb-4">
          {/* Simple, clean logo area */}
          <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Sign Up
        </h1>
        <p className="text-base text-gray-600">
          Create your account to get started
        </p>
      </div>
  
      {/* Apple-style form */}
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {displayError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-600">
                {displayError}
                {displayError.includes('already exists') && (
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign in instead →
                  </button>
                )}
              </p>
            </div>
          )}
          
          {/* Name field - Apple style floating label */}
          <div className="relative">
            <Input
              id="name"
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full h-14 px-4 pt-6 pb-2 text-base border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none bg-white transition-colors"
              disabled={loading}
            />
            <Label 
              htmlFor="name" 
              className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-200
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                         peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500
                         peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-700"
            >
              Full Name (Optional)
            </Label>
          </div>
  
          {/* Email field */}
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full h-14 px-4 pt-6 pb-2 text-base border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none bg-white transition-colors"
              disabled={loading}
              required
            />
            <Label 
              htmlFor="email" 
              className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-200
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                         peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500
                         peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-700"
            >
              Email Address
            </Label>
          </div>
  
          {/* Password field */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full h-14 px-4 pt-6 pb-2 pr-12 text-base border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none bg-white transition-colors"
              disabled={loading}
              required
            />
            <Label 
              htmlFor="password" 
              className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-200
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                         peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500
                         peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-700"
            >
              Password (min 6 characters)
            </Label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
  
          {/* Confirm Password field */}
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full h-14 px-4 pt-6 pb-2 pr-12 text-base border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-0 focus:outline-none bg-white transition-colors"
              disabled={loading}
              required
            />
            <Label 
              htmlFor="confirmPassword" 
              className="absolute left-4 top-4 text-gray-500 text-base transition-all duration-200
                         peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                         peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500
                         peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-700"
            >
              Confirm Password
            </Label>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
  
          {/* Apple-style primary button */}
          <Button
            type="submit"
            className="w-full h-14 bg-black hover:bg-gray-800 text-white font-medium text-base rounded-xl transition-colors duration-200 shadow-sm mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
  
        {/* Apple-style secondary actions */}
        <div className="mt-6 space-y-4">
          <div className="text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 font-medium text-base transition-colors"
              disabled={loading}
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
  
      {/* Apple-style footer */}
      
    </div>
  );
};

export default Register; 