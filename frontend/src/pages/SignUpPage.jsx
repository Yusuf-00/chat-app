import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full Name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error('Invalid email format');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) await signup(formData);
    
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-16 rounded-xl bg-primary/10 flex items-center justify-center
              group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-10 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Join Our Community</h1>
              <p className='text-base-content/60'>Create your account to get started!</p>
            </div>
          </div>
          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1'>
                  <User className='size-5 text-base-content/40' />
                </div>
                <input 
                  type="text"
                  className={'input input-bordered w-full pl-10'}
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>
            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input 
                  type="email"
                  className={'input input-bordered w-full pl-10'}
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  className={'input input-bordered w-full pl-10'}
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-base-content/40' />
                  ) : (
                    <Eye className='size-5 text-base-content/40' />
                  )}
                </button>
              </div>
            </div>
            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className='size-5 mr-2 animate-spin' />
                  Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an accoout?{' '}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side - image pattern */}
      <AuthImagePattern title="Sign Up" subtitle="Connect with friends and the world around you by creating an account." />
    </div>
  )
}

export default SignUpPage