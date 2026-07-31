"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogIn, UserPlus, Skull } from "lucide-react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { status } = useAuthStore();
  const [authView, setAuthView] = useState<"login" | "register" | "forgot">("login");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Loading arena…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
              <Skull className="w-9 h-9 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              {APP_NAME}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              Hunt. Harvest. Extract. <span className="text-emerald-400 font-semibold">Don&apos;t get caught.</span>
            </p>
          </div>

          <Card className="border-primary/20 bg-card/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Enter the arena</CardTitle>
              <CardDescription className="text-sm">
                Sign in or create an account to play.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {authView === "forgot" ? (
                <ForgotPasswordForm onBack={() => setAuthView("login")} />
              ) : (
                <Tabs
                  defaultValue="login"
                  value={authView}
                  onValueChange={(v) => setAuthView(v as "login" | "register")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="gap-1.5 text-xs">
                      <LogIn className="h-3.5 w-3.5" /> Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="gap-1.5 text-xs">
                      <UserPlus className="h-3.5 w-3.5" /> Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="mt-4">
                    <LoginForm onSwitch={() => setAuthView("register")} onForgot={() => setAuthView("forgot")} />
                  </TabsContent>
                  <TabsContent value="register" className="mt-4">
                    <RegisterForm onSwitch={() => setAuthView("login")} />
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
