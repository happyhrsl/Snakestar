"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Eye, EyeOff, Loader2, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPw !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pin, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-4 space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="text-sm font-semibold">Password Reset!</p>
        <p className="text-xs text-muted-foreground">
          Your password has been changed. You can now log in with your new password.
        </p>
        <Button size="sm" className="mt-2" onClick={onBack}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Email</Label>
          <Input type="email" required placeholder="you@arena.gg" value={email} onChange={(e) => setEmail(e.target.value)} className="text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">4-Digit Security PIN</Label>
          <Input
            type="text" inputMode="numeric" required maxLength={4} pattern="[0-9]{4}"
            autoComplete="off" placeholder="1234"
            value={pin} onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
            className="text-sm"
          />
          <p className="text-[10px] text-muted-foreground">This is the PIN you set during registration.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">New Password (min 6 chars)</Label>
          <div className="relative">
            <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type={showPw ? "text" : "password"} required minLength={6}
              placeholder="••••••••" value={newPw} onChange={(e) => setNewPw(e.target.value)}
              className="pl-8 pr-9 text-sm"
            />
            <button
              type="button" tabIndex={-1} onClick={() => setShowPw(!showPw)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Confirm New Password</Label>
          <Input
            type="password" required minLength={6}
            placeholder="••••••••" value={confirmPw}
            onChange={(e) => { setConfirmPw(e.target.value); if (error) setError(""); }}
            className="text-sm"
          />
        </div>
        {error && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <Shield className="h-3 w-3" /> {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Reset Password
        </Button>
      </form>
      <p className="mt-4 text-center text-[11px]">
        <button onClick={onBack} className="text-emerald-400 hover:underline">← Back to Login</button>
      </p>
    </motion.div>
  );
}
