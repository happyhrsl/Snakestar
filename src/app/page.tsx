'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';
import { COUNTRIES, APP_NAME, MILESTONE_BADGES } from '@/lib/constants';
import type { FullPlayer } from '@/types/player';
import {
  Mail, KeyRound, Eye, EyeOff, Loader2, Shield, Ghost, CheckCircle,
  Skull, LogIn, UserPlus, Trophy, Zap, Target, Swords, Crown,
  ChevronRight, LogOut, User, Home as HomeIcon,
  Star, TrendingUp, Store, Users, Gamepad2, Coins
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// ═══════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════
type AuthView = 'login' | 'register' | 'forgot';

// ═══════════════════════════════════════════════════════════════
//  LOADING SCREEN
// ═══════════════════════════════════════════════════════════════
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Skull className="w-6 h-6 text-primary" />
        </div>
        <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Loading arena...</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PASSWORD STRENGTH METER
// ═══════════════════════════════════════════════════════════════
function PasswordStrength({ password }: { password: string }) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const width = score <= 1 ? 'w-1/4' : score === 2 ? 'w-2/4' : score === 3 ? 'w-3/4' : 'w-full';
  const color = score <= 1 ? 'bg-red-500' : score === 2 ? 'bg-orange-500' : score === 3 ? 'bg-yellow-500' : 'bg-emerald-500';
  const textColor = score < 2 ? 'text-red-400' : score < 3 ? 'text-yellow-400' : 'text-emerald-400';
  const label = score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong';

  if (password.length === 0) return null;

  return (
    <div className="space-y-1">
      <div className="h-1.5 w-full rounded-full bg-muted">
        <div className={cn('h-full rounded-full transition-all duration-300', color, width)} />
      </div>
      <p className="text-[10px] text-muted-foreground">
        Strength: <span className={cn('font-semibold', textColor)}>{label}</span>
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SOCIAL LOGIN BUTTONS (Coming Soon)
// ═══════════════════════════════════════════════════════════════
function SocialButtons({ busy }: { busy: boolean }) {
  const providers = [
    {
      name: 'Google',
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      icon: <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-blue-600"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    },
    {
      name: 'Apple',
      icon: <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {providers.map((p) => (
        <Button
          key={p.name}
          type="button"
          variant="outline"
          className="w-full gap-1.5 text-xs text-muted-foreground cursor-not-allowed opacity-50"
          disabled
          title="Coming soon"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : p.icon}
          {p.name}
        </Button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  LOGIN FORM
// ═══════════════════════════════════════════════════════════════
function LoginForm({ onSwitch, onForgot }: { onSwitch: () => void; onForgot: () => void }) {
  const setPlayer = useAuthStore((s) => s.setPlayer);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe: remember }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      setPlayer(data.data);
      toast.success('Welcome back to the arena!');
    } catch { setError('Network error. Please try again.'); }
    finally { setBusy(false); }
  }

  async function handleGuest() {
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Guest play failed.'); return; }
      setPlayer(data.data);
      toast.success('Playing as guest. Register to keep your progress!');
    } catch { setError('Network error. Please try again.'); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input type="email" required autoComplete="email" placeholder="you@arena.gg"
            value={email} onChange={(e) => setEmail(e.target.value)} className="pl-8 text-sm" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input type={showPw ? 'text' : 'password'} required autoComplete="current-password"
            placeholder="........" value={password} onChange={(e) => setPassword(e.target.value)}
            className="pl-8 pr-9 text-sm" />
          <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
        <Label htmlFor="remember" className="text-[11px] text-muted-foreground">Remember me (30 days)</Label>
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <Shield className="h-3 w-3" /> {error}
        </p>
      )}

      <Button type="submit" className="w-full" size="sm" disabled={busy}>
        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Login
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-[11px] text-muted-foreground">
          <span className="bg-card px-3">or continue with</span>
        </div>
      </div>

      <SocialButtons busy={busy} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
        <div className="relative flex justify-center text-[11px] text-muted-foreground">
          <span className="bg-card px-3">or</span>
        </div>
      </div>

      <Button type="button" variant="secondary" className="w-full gap-2" size="sm" disabled={busy} onClick={handleGuest}>
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Ghost className="h-3.5 w-3.5" />}
        Play as Guest
      </Button>
      <p className="text-center text-[10px] text-muted-foreground">
        Guests get 150 starter chips. Register to keep your progress.
      </p>

      <div className="flex items-center justify-between text-[11px] pt-1">
        <button onClick={onSwitch} className="text-primary hover:underline">Register</button>
        <button onClick={onForgot} className="text-primary hover:underline">Forgot Password?</button>
      </div>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════
//  REGISTER FORM
// ═══════════════════════════════════════════════════════════════
function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const setPlayer = useAuthStore((s) => s.setPlayer);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [country, setCountry] = useState('');
  const [pin, setPin] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try {
      const body: Record<string, string> = { displayName: name, email, password, country };
      if (pin.length === 4) body.pin = pin;
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      setPlayer(data.data);
      toast.success('Account created! Welcome to Snakestar!');
    } catch { setError('Network error. Please try again.'); }
    finally { setBusy(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <div className="space-y-1">
        <Label className="text-xs">Display name (max 20 chars)</Label>
        <Input type="text" required maxLength={20} placeholder="ViperStrike" value={name}
          onChange={(e) => setName(e.target.value)} className="text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input type="email" required autoComplete="email" placeholder="you@arena.gg" value={email}
            onChange={(e) => setEmail(e.target.value)} className="pl-8 text-sm" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Password (min 6 chars)</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input type={showPw ? 'text' : 'password'} required minLength={6} autoComplete="new-password"
            placeholder="........" value={password} onChange={(e) => setPassword(e.target.value)}
            className="pl-8 pr-9 text-sm" />
          <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
        <PasswordStrength password={password} />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Confirm Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input type={showConfirm ? 'text' : 'password'} required minLength={6} autoComplete="new-password"
            placeholder="........" value={confirm}
            onChange={(e) => { setConfirm(e.target.value); if (error) setError(''); }}
            className="pl-8 pr-9 text-sm" />
          <button type="button" tabIndex={-1} onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Country</Label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="text-sm h-8">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>{c.flag} {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Security PIN (4 digits, optional)</Label>
        <Input type="text" inputMode="numeric" maxLength={4} pattern="[0-9]{0,4}"
          autoComplete="off" placeholder="e.g. 1234" value={pin}
          onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))} className="text-sm" />
        <p className="text-[10px] text-muted-foreground">Required for password recovery. Keep it safe!</p>
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <Shield className="h-3 w-3" /> {error}
        </p>
      )}
      <Button type="submit" className="w-full" size="sm" disabled={busy}>
        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Create Account
      </Button>
      <p className="text-center text-[11px]">
        Already have an account?{' '}
        <button onClick={onSwitch} className="text-primary hover:underline">Login</button>
      </p>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════
//  FORGOT PASSWORD FORM
// ═══════════════════════════════════════════════════════════════
function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (newPw !== confirmPw) { setError('Passwords do not match.'); return; }
    setBusy(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to reset password.'); return; }
      setSuccess(true);
    } catch { setError('Network error. Please try again.'); }
    finally { setBusy(false); }
  }

  if (success) {
    return (
      <div className="text-center py-4 space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm font-semibold">Password Reset!</p>
        <p className="text-xs text-muted-foreground">Your password has been changed. You can now log in with your new password.</p>
        <Button size="sm" className="mt-2" onClick={onBack}>Back to Login</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <div className="space-y-1">
        <Label className="text-xs">Email</Label>
        <Input type="email" required placeholder="you@arena.gg" value={email}
          onChange={(e) => setEmail(e.target.value)} className="text-sm" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">4-Digit Security PIN</Label>
        <Input type="text" inputMode="numeric" required maxLength={4} pattern="[0-9]{4}"
          autoComplete="off" placeholder="1234" value={pin}
          onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))} className="text-sm" />
        <p className="text-[10px] text-muted-foreground">This is the PIN you set during registration.</p>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">New Password (min 6 chars)</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input type={showPw ? 'text' : 'password'} required minLength={6} placeholder="........"
            value={newPw} onChange={(e) => setNewPw(e.target.value)} className="pl-8 pr-9 text-sm" />
          <button type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Confirm New Password</Label>
        <Input type="password" required minLength={6} placeholder="........" value={confirmPw}
          onChange={(e) => { setConfirmPw(e.target.value); if (error) setError(''); }} className="text-sm" />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <Shield className="h-3 w-3" /> {error}
        </p>
      )}
      <Button type="submit" className="w-full" size="sm" disabled={busy}>
        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Reset Password
      </Button>
      <p className="text-center text-[11px]">
        <button onClick={onBack} className="text-primary hover:underline">Back to Login</button>
      </p>
    </form>
  );
}

// ═══════════════════════════════════════════════════════════════
//  AUTH SCREEN
// ═══════════════════════════════════════════════════════════════
function AuthScreen() {
  const [view, setView] = useState<AuthView>('login');

  return (
    <div className="auth-outer min-h-screen flex items-center justify-center bg-background p-4">
      <div className="auth-inner w-full max-w-sm flex flex-col items-center gap-4">
        {/* Brand Section */}
        <div className="auth-brand text-center hidden">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-3">
            <Skull className="w-9 h-9 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
            {APP_NAME}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hunt. Harvest. Extract.{' '}
            <span className="text-primary font-semibold">Don&apos;t get caught.</span>
          </p>
        </div>

        {/* Card */}
        <div className="auth-card-wrapper w-full max-w-sm">
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2 pt-4 px-4">
              {/* Mobile brand - shown only when auth-brand is hidden */}
              <div className="md:hidden text-center mb-1">
                <div className="mx-auto w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-2">
                  <Skull className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  {APP_NAME}
                </h1>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Hunt. Harvest. Extract.{' '}
                  <span className="text-primary font-semibold">Don&apos;t get caught.</span>
                </p>
              </div>
              <CardTitle className="text-base">Enter the arena</CardTitle>
              <CardDescription className="text-xs">Sign in or create an account to play.</CardDescription>
            </CardHeader>
            <CardContent className="auth-card-content px-4 pb-4">
              {view === 'forgot' ? (
                <ForgotPasswordForm onBack={() => setView('login')} />
              ) : (
                <Tabs value={view} onValueChange={(v) => setView(v as AuthView)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="gap-1.5 text-xs">
                      <LogIn className="h-3.5 w-3.5" /> Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="gap-1.5 text-xs">
                      <UserPlus className="h-3.5 w-3.5" /> Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="mt-3">
                    <LoginForm onSwitch={() => setView('register')} onForgot={() => setView('forgot')} />
                  </TabsContent>
                  <TabsContent value="register" className="mt-3">
                    <RegisterForm onSwitch={() => setView('login')} />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════
function Dashboard({ player }: { player: FullPlayer }) {
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('home');

  const xpForNextLevel = 100 * player.level;
  const xpProgress = Math.min((player.xp / xpForNextLevel) * 100, 100);
  const badge = MILESTONE_BADGES.find((b) => player.walletChips >= b.minWalletChips) || MILESTONE_BADGES[0];

  async function handleLogout() {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    logout();
    toast.success('Logged out');
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border/50 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-sm">
              {player.avatarPreset || '🐍'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{player.displayName}</p>
              <p className="text-[10px] text-muted-foreground">{player.userTag} &middot; Lv.{player.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-secondary rounded-md px-2 py-1">
              <Coins className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">{player.walletChips.toLocaleString()}</span>
            </div>
            <Button variant="ghost" size="icon-xs" onClick={handleLogout}>
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        {/* XP Bar */}
        <div className="mt-1.5 space-y-0.5">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Level {player.level}</span>
            <span>{player.xp} / {xpForNextLevel} XP</span>
          </div>
          <Progress value={xpProgress} className="h-1.5" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-3 pb-20 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-3">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Current Rank</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: badge.color }}>{badge.badge}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total Matches</p>
                  <p className="text-lg font-bold">{player.totalMatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Quick Play - spans 2 cols */}
            <Card className="col-span-2 bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">Quick Play</p>
                    <p className="text-[11px] text-muted-foreground">Jump into the arena now</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>

            {/* Daily Challenges */}
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="text-xs font-semibold">Daily Challenges</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">3 kills</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">+50 XP</Badge>
                  </div>
                  <Progress value={33} className="h-1" />
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <p className="text-xs font-semibold">Weekly Challenge</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Extract 5x</span>
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5">+500 XP</Badge>
                  </div>
                  <Progress value={60} className="h-1" />
                </div>
              </CardContent>
            </Card>

            {/* Stats - Kills */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Swords className="h-4 w-4 text-red-400" />
                  <p className="text-[11px] text-muted-foreground">Total Kills</p>
                </div>
                <p className="text-xl font-bold">{player.totalKills}</p>
              </CardContent>
            </Card>

            {/* Stats - Extracts */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <p className="text-[11px] text-muted-foreground">Extractions</p>
                </div>
                <p className="text-xl font-bold">{player.totalExtracts}</p>
              </CardContent>
            </Card>

            {/* Best Score */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-amber-400" />
                  <p className="text-[11px] text-muted-foreground">Best Score</p>
                </div>
                <p className="text-xl font-bold">{player.bestScore.toLocaleString()}</p>
              </CardContent>
            </Card>

            {/* Chips Earned */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <p className="text-[11px] text-muted-foreground">Chips Earned</p>
                </div>
                <p className="text-xl font-bold">{player.totalChipsEarned.toLocaleString()}</p>
              </CardContent>
            </Card>

            {/* Guest Upgrade Banner */}
            {player.isGuest && (
              <Card className="col-span-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-400" />
                    <p className="text-xs font-semibold">You&apos;re playing as a guest</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">Register to save your progress and unlock all features.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur border-t border-border/50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-1.5">
          {[
            { id: 'home', icon: HomeIcon, label: 'Home' },
            { id: 'play', icon: Gamepad2, label: 'Play' },
            { id: 'social', icon: Users, label: 'Social' },
            { id: 'store', icon: Store, label: 'Store' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-md transition-colors',
                activeTab === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════
export default function Home() {
  const { status, player, setPlayer, logout } = useAuthStore();

  // Show auth screen immediately (no loading state)
  // Session check happens in background via useEffect
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.success) {
          setPlayer(data.data);
        } else {
          logout();
        }
      })
      .catch(() => logout())
      .finally(() => setChecking(false));
  }, [setPlayer, logout]);

  if (status === 'authenticated' && player) {
    return <Dashboard player={player} />;
  }

  return <AuthScreen />;
}
