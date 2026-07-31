"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore } from "@/stores/auth-store";
import { COUNTRIES } from "@/lib/constants";
import { PasswordStrength } from "./password-strength";
import { Shield, Mail, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const setPlayer = useAuthStore((s) => s.setPlayer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const body: Record<string, string> = { displayName: name, email, password, country };
      if (pin.length === 4) body.pin = pin;
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setPlayer(data.data);
      router.refresh();
      toast.success("Account created! Welcome to Snakestar!");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Display name (up to 20 chars)</Label>
          <Input
            type="text"
            required
            maxLength={20}
            placeholder="ViperStrike"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Email</Label>
          <div className="relative">
            <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="email"
              required
              autoComplete="email"
              placeholder="you@arena.gg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-8 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Password (min 6 chars)</Label>
          <div className="relative">
            <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type={showPw ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-8 pr-9 text-sm"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPw(!showPw)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPw ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          <PasswordStrength password={password} />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Confirm Password</Label>
          <div className="relative">
            <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type={showConfirm ? "text" : "password"}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (error) setError("");
              }}
              className="pl-8 pr-9 text-sm"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Security PIN (4 digits, optional)</Label>
          <Input
            type="text"
            inputMode="numeric"
            maxLength={4}
            pattern="[0-9]{0,4}"
            autoComplete="off"
            placeholder="e.g. 1234"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
            className="text-sm"
          />
          <p className="text-[10px] text-muted-foreground">
            Required for password recovery. Keep it safe!
          </p>
        </div>

        {error && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <Shield className="h-3 w-3" /> {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>

      <p className="mt-4 text-center text-[11px]">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-emerald-400 hover:underline">
          Login
        </button>
      </p>
    </motion.div>
  );
}
