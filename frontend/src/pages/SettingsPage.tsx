import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Shield, 
  Bell, 
  Moon, 
  Sun, 
  Save, 
  CheckCircle2, 
  Key, 
  Building2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { User, UserRole } from '../types';

interface SettingsPageProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, onUpdateUser }) => {
  const [fullName, setFullName] = useState(user?.full_name || "Alexander Vance");
  const [email, setEmail] = useState(user?.email || "alexander.vance@autodesk-buildverse.com");
  const [organization, setOrganization] = useState(user?.organization || "Vance & Partners Global Architecture");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 382-9102");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const updated: User = {
      ...user,
      full_name: fullName,
      email,
      organization,
      phone
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Platform Settings</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Manage your enterprise profile, security keys, and digital twin organization branding.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <Card className="p-6 sm:p-8 bg-slate-900 border-slate-800 shadow-2xl space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
            />
            <div>
              <h2 className="text-base font-bold text-white">{user?.full_name}</h2>
              <Badge variant="electric" size="sm">{user?.role} ACCESS</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              label="Corporate Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Organization / Firm"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <Input
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <Button
              type="submit"
              variant="electric"
              size="md"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Profile Preferences
            </Button>
          </div>
        </form>
      </Card>

      {/* Security & Access Section */}
      <Card className="p-6 bg-slate-900 border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Security & API Keys</h3>
          </div>
          <Badge variant="neutral" size="sm">ACTIVE</Badge>
        </div>
        <p className="text-xs text-slate-400">
          Your account is secured with 256-bit JWT authentication and SOC2 Type II encryption standards.
        </p>
      </Card>

    </div>
  );
};
