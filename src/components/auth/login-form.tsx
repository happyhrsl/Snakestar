"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/auth-store";
import { SocialButtons } from "./social-buttons";
import { Shield, Mail, KeyRound, Eye, EyeOff, Loader2, Ghost, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function LoginForm({
  onSwitch,
  onForgot,
}: {
  onSwitch: () => void;
  onForgot: () => void;
}) {
  const router = useRouter();
  const setPlayer = useAuthStore((s) => s.setPlayer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe: remember }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setPlayer(data.data);
      router.refresh();
      toast.success("Welcome back to the arena!");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGuest() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/guest", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Guest play failed.");
        return;
      }
      setPlayer(data.data);
      router.refresh();
      toast.success("Playing as guest. Register to keep your progress!");
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
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <Label className="text-xs">Password</Label>
          <div className="relative">
            <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type={showPw ? "text" : "password"}
              required
              autoComplete="current-password"
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
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
          <Label htmlFor="remember" className="text-[11px] text-muted-foreground">
            Remember me (30 days)
          </Label>
        </div>

        {error && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <Shield className="h-3 w-3" /> {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={busy}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-[11px] text-muted-foreground">
          <span className="bg-card px-3">or continue with</span>
        </div>
      </div>

      <SocialButtons busy={busy} />

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-[11px] text-muted-foreground">
          <span className="bg-card px-3">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full gap-2"
        disabled={busy}
        onClick={handleGuest}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ghost className="h-4 w-4" />}
        Play as Guest
      </Button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        ⚡ Guests get 150 starter chips. Register to keep your progress.
      </p>

      <div className="mt-4 flex items-center justify-between text-[11px]">
        <button onClick={onSwitch} className="text-emerald-400 hover:underline">
          Don&apos;t have an account? Register
        </button>
        <button onClick={onForgot} className="text-emerald-400 hover:underline">
          Forgot Password?
        </button>
      </div>
    </motion.div>
  );
}
