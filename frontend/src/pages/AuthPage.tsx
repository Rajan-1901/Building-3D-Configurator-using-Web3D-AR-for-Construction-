import React, { useState } from 'react';
import { Building2, Sparkles, Shield, Mail, Lock, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { UserRole, User as UserType } from '../types';
import { NavigationTab } from '../store/useAppStore';

interface AuthPageProps {
  onLoginSuccess: (user: UserType) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'otp' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('ARCHITECT');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length > 7) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const strength = getPasswordStrength();

  const handleInstantDemoLogin = (selectedRole: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser: UserType = {
        id: Math.floor(Math.random() * 1000),
        email: `demo.${selectedRole.toLowerCase()}@buildverse.ai`,
        full_name: `Lead ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1).toLowerCase()}`,
        role: selectedRole,
        organization: "BuildVerse Enterprise Labs",
        phone: "+1 (555) 948-2026",
        avatar_url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`,
        is_active: true,
        is_verified: true,
        created_at: new Date().toISOString()
      };
      setIsLoading(false);
      onLoginSuccess(demoUser);
      onNavigate('dashboard');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const newUser: UserType = {
        id: 1,
        email: email || "alexander.vance@autodesk-buildverse.com",
        full_name: fullName || "Alexander Vance",
        role: role,
        organization: "Vance & Partners Global Architecture",
        phone: "+1 (555) 382-9102",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        is_active: true,
        is_verified: true,
        created_at: new Date().toISOString()
      };
      setIsLoading(false);
      onLoginSuccess(newUser);
      onNavigate('dashboard');
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[300px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            BuildVerse<span className="text-cyan-400">.AI</span> Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {mode === 'login' && 'Sign in to access your digital twins and BIM models'}
            {mode === 'register' && 'Create your enterprise construction account'}
            {mode === 'otp' && 'Enter the 6-digit verification code sent to your device'}
            {mode === 'forgot' && 'Reset your secure account credentials'}
          </p>
        </div>

        {/* 1-Click Fast Persona Switcher (For Smart India Hackathon & Investors) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">⚡ 1-Click Demo Login</span>
            <Badge variant="electric" size="sm">SIH LIVE</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {(['ARCHITECT', 'ENGINEER', 'HOMEOWNER', 'CONTRACTOR', 'DEVELOPER'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleInstantDemoLogin(r)}
                className="py-1.5 px-2 rounded-xl text-[11px] font-semibold bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition cursor-pointer"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="border-slate-800 bg-slate-900/95 shadow-2xl p-6 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'register' && (
              <>
                <Input
                  label="Full Name"
                  placeholder="e.g. Elena Rostova"
                  leftIcon={<User className="w-4 h-4" />}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Primary Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none"
                  >
                    <option value="ARCHITECT">Architect / BIM Designer</option>
                    <option value="ENGINEER">Civil / Structural Engineer</option>
                    <option value="HOMEOWNER">Homeowner / Property Buyer</option>
                    <option value="CONTRACTOR">General Contractor / Builder</option>
                    <option value="DEVELOPER">Real Estate Developer</option>
                  </select>
                </div>
              </>
            )}

            {mode !== 'otp' && (
              <>
                <Input
                  label="Corporate Email"
                  type="email"
                  placeholder="name@buildverse.ai"
                  leftIcon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {mode !== 'forgot' && (
                  <div className="space-y-2">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      leftIcon={<Lock className="w-4 h-4" />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    {/* Password Strength Meter */}
                    {mode === 'register' && password.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>Security Strength</span>
                          <span>{strength}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              strength <= 25 ? 'bg-red-500 w-1/4' :
                              strength <= 50 ? 'bg-amber-500 w-2/4' :
                              strength <= 75 ? 'bg-blue-500 w-3/4' : 'bg-emerald-400 w-full'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {mode === 'otp' && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-slate-400">Verification Code</p>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                      }}
                      className="w-10 h-12 text-center text-lg font-bold bg-slate-800 border border-slate-700 rounded-xl text-cyan-400 focus:border-cyan-400 outline-none"
                    />
                  ))}
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="electric"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {mode === 'login' && 'Sign In to Studio'}
              {mode === 'register' && 'Create Account'}
              {mode === 'otp' && 'Verify & Authenticate'}
              {mode === 'forgot' && 'Send Reset Link'}
            </Button>
          </form>

          {/* Mode Switcher Links */}
          <div className="text-center pt-2 text-xs text-slate-400 space-x-1">
            {mode === 'login' ? (
              <>
                <span>New to BuildVerse?</span>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
