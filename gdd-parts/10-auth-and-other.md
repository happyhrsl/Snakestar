# 10 — Auth Gate, Lib Files & Hooks

> Exhaustive catalog of every text string, label, heading, placeholder, validation message, button, constant, function, and UI element across the Venom Arena auth screen, utility libraries, and custom hooks.

---

## TABLE OF CONTENTS

1. [Auth Gate Component (`auth-gate.tsx` — 746 lines)](#1-auth-gate-component-auth-gatetsx)
2. [Auth Library (`lib/auth.ts` — 82 lines)](#2-auth-library-libauthts)
3. [Constants (`lib/constants.ts` — 2 lines)](#3-constants-libconstantsts)
4. [OAuth Library (`lib/oauth.ts` — 210 lines)](#4-oauth-library-liboauthts)
5. [API Helpers (`lib/api-helpers.ts` — 22 lines)](#5-api-helpers-libapi-helpersts)
6. [Game Config DB (`lib/game-config-db.ts` — 461 lines)](#6-game-config-db-libgame-config-dbts)
7. [Player Helpers (`lib/player-helpers.ts` — 56 lines)](#7-player-helpers-libplayer-helpersts)
8. [Date Utilities (`lib/date-utils.ts` — 40 lines)](#8-date-utilities-libdate-utilsts)
9. [Database Client (`lib/db.ts` — 18 lines)](#9-database-client-libdbts)
10. [Utility (`lib/utils.ts` — 6 lines)](#10-utility-libutilsts)
11. [useMobile Hook (`hooks/use-mobile.ts` — 19 lines)](#11-usemobile-hook-hooksuse-mobilets)
12. [useToast Hook (`hooks/use-toast.ts` — 193 lines)](#12-usetoast-hook-hooksuse-toastts)

---

## 1. AUTH GATE COMPONENT (`auth-gate.tsx`)

**File:** `src/components/auth/auth-gate.tsx` (746 lines)
**Directive:** `'use client'`

### 1.1 Imports & Icons

**UI Component imports:** `Button`, `Input`, `Label`, `Tabs`/`TabsContent`/`TabsList`/`TabsTrigger`, `Card`/`CardContent`/`CardDescription`/`CardHeader`/`CardTitle`, `Skeleton`, `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogDescription`

**Internal imports:** `useAuth` from `@/components/providers/auth-provider`, `GameRulesModal` from `@/components/modals/game-rules-modal`

**Lucide-react icons used (12):**

| Icon | Usage Location |
|------|---------------|
| `Skull` | Logo area (w-9 h-9, neon text) |
| `Zap` | Guest info text inline icon (w-3 h-3) |
| `LogIn` | Login tab icon (w-4 h-4, mr-2) |
| `UserPlus` | Register tab icon (w-4 h-4, mr-2) |
| `Ghost` | "Play as Guest" button icon (w-4 h-4, mr-2) |
| `Loader2` | Loading spinner (w-8 h-8 in loading state; w-3.5 h-3.5 in social buttons; w-4 h-4 in submit buttons) |
| `Eye` | Password visibility toggle (show state, w-3.5 h-3.5) |
| `EyeOff` | Password visibility toggle (hidden state, w-3.5 h-3.5) |
| `BookOpen` | "View Rules & Guide" link icon (w-3 h-3) |
| `KeyRound` | Password fields left icon (w-3.5 h-3.5); Forgot Password dialog title icon (w-4 h-4) |
| `Mail` | Email fields left icon (w-3.5 h-3.5) |
| `Shield` | Error message icon (w-3 h-3); Password Reset success icon (w-6 h-6) |

### 1.2 Password Strength Calculator (internal function — not exported)

**Function:** `getPasswordStrength(pw: string)` returns `{ label: string; color: string; width: string; score: number }`

**Scoring rules (each met condition adds +1):**

| Criterion | Regex / Condition |
|-----------|-------------------|
| Length >= 6 | `pw.length >= 6` |
| Length >= 10 | `pw.length >= 10` |
| Uppercase letter | `/[A-Z]/.test(pw)` |
| Digit | `/[0-9]/.test(pw)` |
| Special character | `/[^A-Za-z0-9]/.test(pw)` |

| Score | Label | Color Class | Width Class |
|-------|-------|-------------|-------------|
| 0–1 | `Weak` | `bg-red-500` | `w-1/4` |
| 2 | `Fair` | `bg-orange-500` | `w-2/4` |
| 3 | `Good` | `bg-yellow-500` | `w-3/4` |
| 4–5 | `Strong` | `bg-emerald-500` | `w-full` |

### 1.3 AuthGate — Loading State

**Exported function:** `AuthGate` (default export)

**Component renders when `loading` is true from `useAuth()`:**

| Element | Text / Value |
|---------|-------------|
| Layout | `min-h-screen flex items-center justify-center` (centered full screen) |
| Spinner | `Loader2` icon, class `w-8 h-8 animate-spin text-primary` |
| Loading text (p) | `Loading arena…` (class: `text-sm text-muted-foreground`) |

When `loading` is false, renders `<AuthScreen />`.

### 1.4 AuthGateSkeleton (exported)

**Exported function:** `AuthGateSkeleton`

| Element | Value |
|---------|-------|
| Render | `<Skeleton className="w-full h-screen" />` |

### 1.5 AuthScreen — Main Auth Page

**Function:** `AuthScreen` (internal, not exported)

**State variables:**

| State | Type | Default |
|-------|------|---------|
| `busy` | `boolean` | `false` |
| `error` | `string \| null` | `null` |
| `forgotOpen` | `boolean` | `false` |
| `rulesOpen` | `boolean` | `false` |

**Internal helper — `callApi(path, body)`:**

| Error Message | Trigger |
|--------------|---------|
| `data?.error \|\| 'Something went wrong.'` | API response not `ok` |
| `'Network error. Please try again.'` | `catch` block (fetch failure) |

**Social login handler — `handleSocialLogin(provider)`:**
- Redirects to: `` `/api/auth/social-login?provider=${provider}` ``

#### 1.5.1 Logo / Title Section

| Element | Text / Value | Notes |
|---------|-------------|-------|
| Container | `text-center space-y-2` | — |
| Logo container | `w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 va-neon-border` | Rounded box around Skull icon |
| Logo icon | `Skull` (w-9 h-9, `text-primary va-neon-text`) | — |
| Main heading (h1) | `VENOM ARENA` | `text-4xl font-black tracking-tight va-neon-text` |
| Tagline part 1 (p) | `Hunt. Harvest. Extract. ` | `text-sm text-muted-foreground` |
| Tagline part 2 (span) | `Don't get caught.` | `text-primary font-semibold` |

#### 1.5.2 Card Wrapper

| Element | Value |
|---------|-------|
| Card class | `border-primary/20 bg-card/80 backdrop-blur` |

#### 1.5.3 Card Header

| Element | Text / Value |
|---------|-------------|
| CardTitle | `Enter the arena` (class: `text-lg`) |
| CardDescription | `Sign in or create an account to play.` |

#### 1.5.4 Tab Navigation

| Tab | `value` | Text | Icon |
|-----|---------|------|------|
| Tab 1 | `login` | `Login` | `LogIn` (w-4 h-4, mr-2) |
| Tab 2 | `register` | `Register` | `UserPlus` (w-4 h-4, mr-2) |

- Default tab: `login`
- Layout: `grid w-full grid-cols-2`
- `onValueChange` handler: clears error state (`setError(null)`)

#### 1.5.5 Social Login Divider

| Element | Text / Value |
|---------|-------------|
| Divider text | `or continue with` |
| Text class | `text-xs text-muted-foreground` with `bg-card px-2` |

- Rendered as centered text over a horizontal `border-t border-border` line

#### 1.5.6 Social Login Buttons (3 buttons in `grid grid-cols-3 gap-2`)

| Button | Label | Provider | Icon |
|--------|-------|----------|------|
| Button 1 | `Google` | `google` | Inline SVG (Google "G" logo with 4 color paths: #4285F4, #34A853, #FBBC05, #EA4335) |
| Button 2 | `Facebook` | `facebook` | Inline SVG (Facebook "f" logo, fill `#1877F2`) |
| Button 3 | `Apple` | `apple` | Inline SVG (Apple logo, fill `currentColor`) |

- All buttons: `variant="outline"`, class `w-full text-xs`, disabled when `busy`
- When `busy`: icon replaced with `Loader2` spinner (w-3.5 h-3.5, mr-1, animate-spin)
- When not busy: icon is inline SVG (w-4 h-4, mr-1)

#### 1.5.7 Guest Divider

| Element | Text / Value |
|---------|-------------|
| Divider text | `or` |
| Text class | `text-xs text-muted-foreground` with `bg-card px-2` |

- Same centered-over-line pattern as social divider

#### 1.5.8 Guest Play Button

| Element | Text / Value |
|---------|-------------|
| Button variant | `secondary` |
| Button text (idle) | `Play as Guest` |
| Icon (idle) | `Ghost` (w-4 h-4, mr-2) |
| Icon (busy) | `Loader2` (w-4 h-4, mr-2, animate-spin) |
| API endpoint | `POST /api/auth/guest` with body `{}` |

#### 1.5.9 Bottom Info Section

| Element | Text / Value |
|---------|-------------|
| Guest info text | ⚡ `Guests get 150 starter chips. Register to keep your progress.` |
| Info text class | `text-[11px] text-muted-foreground text-center` |
| Zap icon | `w-3 h-3 inline mr-1` |

#### 1.5.10 View Rules & Guide Link

| Element | Text / Value |
|---------|-------------|
| Link text | `View Rules & Guide` |
| Icon | `BookOpen` (w-3 h-3) |
| Action | Opens `GameRulesModal` dialog (`setRulesOpen(true)`) |
| Link class | `text-[11px] text-primary hover:text-primary/80 underline-offset-2 hover:underline cursor-pointer` |

#### 1.5.11 Game Rules Modal

| Element | Value |
|---------|-------|
| Component | `<GameRulesModal>` |
| Props | `isOpen={rulesOpen}`, `onClose={() => setRulesOpen(false)}` |

#### 1.5.12 Forgot Password Dialog (Modal)

| Element | Text / Value |
|---------|-------------|
| Dialog class | `bg-card border-border max-w-sm` |
| DialogTitle | `Reset Password` (with `KeyRound` icon, w-4 h-4, text-primary, gap-2) |
| DialogDescription | `Enter your email and 4-digit Security PIN to set a new password.` (class: `text-xs`) |
| Content | Renders `<ForgotPasswordForm>` |
| `onOpenChange` handler | Sets `forgotOpen`, clears error |

---

### 1.6 LoginForm Component

**Function:** `LoginForm` (internal, not exported)

**Props:**

| Prop | Type | Usage |
|------|------|-------|
| `busy` | `boolean` | Disables submit button |
| `error` | `string \| null` | Displays error message |
| `onSubmit` | `(path: string, body: unknown) => Promise<boolean>` | API call handler |
| `onForgotPassword` | `() => void` | Opens forgot password dialog |

**Local state:**

| State | Type | Default |
|-------|------|---------|
| `email` | `string` | `''` |
| `password` | `string` | `''` |
| `showPassword` | `boolean` | `false` |
| `remember` | `boolean` | `false` |

**Form submits to:** `POST /api/auth/login` with body `{ email, password, remember }`

#### 1.6.1 Email Field

| Element | Value |
|---------|-------|
| Label | `Email` (class: `text-xs`) |
| `htmlFor` | `l-email` |
| Input `id` | `l-email` |
| Input `type` | `email` |
| Input `required` | yes |
| Input `autoComplete` | `email` |
| Placeholder | `you@arena.gg` |
| Input class | `pl-8 text-sm` |
| Left icon | `Mail` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |

#### 1.6.2 Password Field

| Element | Value |
|---------|-------|
| Label | `Password` (class: `text-xs`) |
| `htmlFor` | `l-pass` |
| Input `id` | `l-pass` |
| Input `type` | Dynamic: `text` when `showPassword`, else `password` |
| Input `required` | yes |
| Input `autoComplete` | `current-password` |
| Placeholder | `••••••••` |
| Input class | `pl-8 pr-9 text-sm` |
| Left icon | `KeyRound` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |
| Visibility toggle button | Right side (absolute, right-2.5) |
| Toggle icon (password hidden) | `Eye` (w-3.5 h-3.5) |
| Toggle icon (password visible) | `EyeOff` (w-3.5 h-3.5) |
| Toggle button `tabIndex` | `-1` (not keyboard focusable) |

#### 1.6.3 Remember Me Checkbox

| Element | Value |
|---------|-------|
| Input `id` | `l-remember` |
| Input `type` | `checkbox` |
| Label | `Remember me (30 days)` (class: `text-[11px] text-muted-foreground cursor-pointer`) |

#### 1.6.4 Error Display

| Element | Value |
|---------|-------|
| Condition | Shown when `error` is truthy |
| Icon | `Shield` (w-3 h-3) |
| Text class | `text-xs text-destructive flex items-center gap-1` |
| Text content | The `error` string value |

#### 1.6.5 Submit Button

| Element | Value |
|---------|-------|
| Button text | `Login` |
| Button class | `w-full` |
| Disabled when | `busy` is true |
| Busy icon | `Loader2` (w-4 h-4, mr-2, animate-spin), shown when `busy &&` |

#### 1.6.6 Cross-links (below submit button)

| Element | Text / Value | Action |
|---------|-------------|--------|
| Left link | `Don't have an account? Register` ("Register" is `font-semibold`) | Programmatically clicks tab `[1]` (Register tab via DOM) |
| Right link | `Forgot Password?` | Calls `onForgotPassword()` |
| Link class (both) | `text-[11px] text-primary hover:text-primary/80 underline-offset-2 hover:underline cursor-pointer` |

---

### 1.7 RegisterForm Component

**Function:** `RegisterForm` (internal, not exported)

**Props:**

| Prop | Type | Usage |
|------|------|-------|
| `busy` | `boolean` | Disables submit button |
| `error` | `string \| null` | Displays error message |
| `onSubmit` | `(path: string, body: unknown) => Promise<boolean>` | API call handler |

**Local state:**

| State | Type | Default |
|-------|------|---------|
| `name` | `string` | `''` |
| `email` | `string` | `''` |
| `password` | `string` | `''` |
| `confirmPassword` | `string` | `''` |
| `showPassword` | `boolean` | `false` |
| `showConfirm` | `boolean` | `false` |
| `pin` | `string` | `''` |

**Form submits to:** `POST /api/auth/register` with body `{ name, email, password, pin }`

**Client-side validation (before submit):**

| Condition | Error Message | Implementation |
|-----------|--------------|----------------|
| `password !== confirmPassword` | `Passwords do not match.` | Set via `document.querySelector('[data-register-error]').textContent` |

#### 1.7.1 Display Name Field

| Element | Value |
|---------|-------|
| Label | `Display name (up to 20 chars)` (class: `text-xs`) |
| `htmlFor` | `r-name` |
| Input `id` | `r-name` |
| Input `type` | text (default) |
| Input `required` | yes |
| Input `maxLength` | `20` |
| Placeholder | `ViperStrike` |
| Input class | `text-sm` |

#### 1.7.2 Email Field

| Element | Value |
|---------|-------|
| Label | `Email` (class: `text-xs`) |
| `htmlFor` | `r-email` |
| Input `id` | `r-email` |
| Input `type` | `email` |
| Input `required` | yes |
| Input `autoComplete` | `email` |
| Placeholder | `you@arena.gg` |
| Input class | `pl-8 text-sm` |
| Left icon | `Mail` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |

#### 1.7.3 Password Field

| Element | Value |
|---------|-------|
| Label | `Password (min 6 chars)` (class: `text-xs`) |
| `htmlFor` | `r-pass` |
| Input `id` | `r-pass` |
| Input `type` | Dynamic: `text` when `showPassword`, else `password` |
| Input `required` | yes |
| Input `minLength` | `6` |
| Input `autoComplete` | `new-password` |
| Placeholder | `••••••••` |
| Input class | `pl-8 pr-9 text-sm` |
| Left icon | `KeyRound` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |
| Visibility toggle | `Eye` / `EyeOff` (w-3.5 h-3.5), right side, `tabIndex={-1}` |

#### 1.7.4 Password Strength Indicator

| Element | Value |
|---------|-------|
| Condition | Shown when `password.length > 0` |
| Strength label prefix | `Strength: ` (class: `text-[10px] text-muted-foreground`) |
| Strength label color | `text-emerald-500` if score >= 3; `text-yellow-500` if score >= 2; `text-red-500` otherwise |
| Progress bar container | `h-1.5 w-full bg-muted rounded-full overflow-hidden` |
| Progress bar fill | Dynamic color + width from `getPasswordStrength()`, `rounded-full transition-all duration-300` |

#### 1.7.5 Confirm Password Field

| Element | Value |
|---------|-------|
| Label | `Confirm Password` (class: `text-xs`) |
| `htmlFor` | `r-confirm` |
| Input `id` | `r-confirm` |
| Input `type` | Dynamic: `text` when `showConfirm`, else `password` |
| Input `required` | yes |
| Input `minLength` | `6` |
| Input `autoComplete` | `new-password` |
| Placeholder | `••••••••` |
| Input class | `pl-8 pr-9 text-sm` |
| Left icon | `KeyRound` (absolute, left-2.5, w-3.5 h-3.5, text-muted-foreground) |
| Visibility toggle | `Eye` / `EyeOff` (w-3.5 h-3.5), right side, `tabIndex={-1}` |
| `onChange` extra | Clears match error if `e.target.value === password` (via `[data-register-error]` DOM query) |

#### 1.7.6 Security PIN Field

| Element | Value |
|---------|-------|
| Label | `Security PIN (4 digits, optional)` (class: `text-xs`) |
| `htmlFor` | `r-pin` |
| Input `id` | `r-pin` |
| Input `type` | `text` |
| Input `inputMode` | `numeric` (mobile numeric keyboard) |
| Input `maxLength` | `4` |
| Input `pattern` | `[0-9]{0,4}` |
| Input `autoComplete` | `off` |
| Placeholder | `e.g. 1234` |
| Input class | `text-sm` |
| `onChange` filter | `e.target.value.replace(/\D/g, '')` (strips non-digits) |
| Helper text | `Required for password recovery. Keep it safe!` (class: `text-[10px] text-muted-foreground`) |

#### 1.7.7 Error Display

| Element | Value |
|---------|-------|
| Error element | `data-register-error` attribute (used by DOM manipulation) |
| Icon | `Shield` (w-3 h-3, shrink-0) |
| Text class | `text-xs text-destructive flex items-center gap-1` |
| Hidden error slot | Always rendered as empty `<p data-register-error />` when no error (for DOM target) |

#### 1.7.8 Submit Button

| Element | Value |
|---------|-------|
| Button text | `Create Account` |
| Button class | `w-full` |
| Disabled when | `busy` is true |
| Busy icon | `Loader2` (w-4 h-4, mr-2, animate-spin) |

#### 1.7.9 Cross-link to Login

| Element | Text / Value | Action |
|---------|-------------|--------|
| Link text | `Already have an account? Login` ("Login" is `font-semibold`) | Programmatically clicks tab `[0]` (Login tab via DOM) |
| Link class | `text-[11px] text-primary hover:text-primary/80 underline-offset-2 hover:underline cursor-pointer` |

---

### 1.8 ForgotPasswordForm Component

**Function:** `ForgotPasswordForm` (internal, not exported)

**Props:**

| Prop | Type | Usage |
|------|------|-------|
| `busy` | `boolean` | Parent busy state |
| `error` | `string \| null` | Parent error state |
| `onSuccess` | `() => void` | Called on successful reset |

**Local state:**

| State | Type | Default |
|-------|------|---------|
| `email` | `string` | `''` |
| `securityPin` | `string` | `''` |
| `newPassword` | `string` | `''` |
| `confirmNew` | `string` | `''` |
| `localError` | `string \| null` | `null` |
| `localBusy` | `boolean` | `false` |
| `success` | `boolean` | `false` |
| `showNewPassword` | `boolean` | `false` |

**Form submits to:** `POST /api/auth/forgot-password` with body `{ email, securityPin, newPassword }`

**Client-side validation:**

| Condition | Error Message |
|-----------|--------------|
| `newPassword !== confirmNew` | `Passwords do not match.` |

**API error fallback messages:**

| Message | Trigger |
|---------|---------|
| `data?.error \|\| 'Failed to reset password.'` | API response not `ok` |
| `'Network error. Please try again.'` | `catch` block (fetch failure) |

#### 1.8.1 Success State

Shown when `success === true`:

| Element | Text / Value |
|---------|-------------|
| Success icon container | `w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto` |
| Success icon | `Shield` (w-6 h-6, `text-emerald-400`) |
| Heading | `Password Reset!` (class: `text-sm font-semibold text-foreground`) |
| Description | `Your password has been changed. You can now log in with your new password.` (class: `text-xs text-muted-foreground`) |
| Action button | `Back to Login` (size `sm`, class `mt-2`) — calls `onSuccess()` |

#### 1.8.2 Email Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `Email` (class: `text-xs`) |
| `htmlFor` | `fp-email` |
| Input `id` | `fp-email` |
| Input `type` | `email` |
| Input `required` | yes |
| Placeholder | `you@arena.gg` |
| Input class | `text-sm` |
| Note | No left Mail icon in this variant |

#### 1.8.3 Security PIN Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `4-Digit Security PIN` (class: `text-xs`) |
| `htmlFor` | `fp-pin` |
| Input `id` | `fp-pin` |
| Input `type` | `text` |
| Input `inputMode` | `numeric` |
| Input `required` | yes |
| Input `maxLength` | `4` |
| Input `pattern` | `[0-9]{4}` |
| Input `autoComplete` | `off` |
| Placeholder | `1234` |
| Input class | `text-sm` |
| `onChange` filter | `e.target.value.replace(/\D/g, '')` (strips non-digits) |
| Helper text | `This is the PIN you set during registration.` (class: `text-[10px] text-muted-foreground`) |

#### 1.8.4 New Password Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `New Password (min 6 chars)` (class: `text-xs`) |
| `htmlFor` | `fp-new` |
| Input `id` | `fp-new` |
| Input `type` | Dynamic: `text` when `showNewPassword`, else `password` |
| Input `required` | yes |
| Input `minLength` | `6` |
| Placeholder | `••••••••` |
| Input class | `pr-9 text-sm` |
| Visibility toggle | `Eye` / `EyeOff` (w-3.5 h-3.5), right side, `tabIndex={-1}` |
| Note | No left KeyRound icon in this variant |

#### 1.8.5 Confirm New Password Field (Forgot Password)

| Element | Value |
|---------|-------|
| Label | `Confirm New Password` (class: `text-xs`) |
| `htmlFor` | `fp-confirm` |
| Input `id` | `fp-confirm` |
| Input `type` | `password` (always hidden — no toggle) |
| Input `required` | yes |
| Input `minLength` | `6` |
| Placeholder | `••••••••` |
| Input class | `text-sm` |
| `onChange` extra | Clears `localError` if `e.target.value === newPassword` |

#### 1.8.6 Error Display (Forgot Password)

| Element | Value |
|---------|-------|
| Condition | Shown when `localError \|\| error` is truthy |
| Text class | `text-xs text-destructive` (no icon) |
| Text content | `localError \|\| error` |

#### 1.8.7 Submit Button (Forgot Password)

| Element | Value |
|---------|-------|
| Button text | `Reset Password` |
| Button class | `w-full` |
| Disabled when | `localBusy \|\| busy` |
| Busy icon | `Loader2` (w-4 h-4, mr-2, animate-spin) |

---

### 1.9 Complete API Endpoints Referenced in Auth Gate

| Endpoint | Method | Body Fields | Called From |
|----------|--------|-------------|-------------|
| `/api/auth/login` | POST | `{ email, password, remember }` | LoginForm |
| `/api/auth/register` | POST | `{ name, email, password, pin }` | RegisterForm |
| `/api/auth/guest` | POST | `{}` | AuthScreen (Guest button) |
| `/api/auth/forgot-password` | POST | `{ email, securityPin, newPassword }` | ForgotPasswordForm |
| `/api/auth/social-login?provider={provider}` | GET (redirect) | Query param only | Social login buttons |

---

### 1.10 Code Comments in auth-gate.tsx

| Line(s) | Comment |
|---------|---------|
| 34–36 | `// Password strength calculator` |
| 52 | `// AuthGate — loading skeleton → AuthScreen` |
| 70 | `// AuthScreen — main auth page with all tabs, social buttons, forgot password` |
| 79 | `// Per-tab error handling — clear error when switching tabs` |
| 109–110 | `// Redirect to the server-side OAuth initiation` |
| 117 | `{/* Logo / Title */}` |
| 155 | `{/* Divider */}` |
| 165 | `{/* Social Login Buttons */}` |
| 211 | `{/* Divider */}` |
| 221 | `{/* Guest Play */}` |
| 238 | `{/* Bottom info */}` |
| 245 | `{/* View Rules & Guide link */}` |
| 260 | `{/* Game Rules Modal */}` |
| 263 | `{/* Forgot Password Modal */}` |
| 290–292 | `// LoginForm` |
| 358 | `{/* Remember me */}` |
| 379 | `{/* Cross-links */}` |
| 385 | `// Switch to register tab` |
| 407–409 | `// RegisterForm` |
| 489 | `{/* Password strength indicator */}` |
| 564 | `{/* Cross-link to login */}` |
| 584–586 | `// ForgotPasswordForm (used inside the Dialog)` |
| 514 | `// Clear match error if they now match` |
| 432 | `// Manually set error through parent — we can't call setError from here / so we use a temporary approach` |
| 741–743 | `// Export skeleton` |

---

## 2. AUTH LIBRARY (`lib/auth.ts`)

**File:** `src/lib/auth.ts` (82 lines)

### 2.1 Imports

| Import | Source |
|--------|--------|
| `jwt` (default) | `jsonwebtoken` |
| `cookies` | `next/headers` |
| `db` | `./db` |
| `bcrypt` | `bcryptjs` |

### 2.2 Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `JWT_SECRET` | `process.env.JWT_SECRET \|\| 'venom-arena-dev-secret-change-in-prod'` | Fallback for development |
| `COOKIE_NAME` | `'va_session'` | Session cookie name |
| `SESSION_DAYS` | `30` | Default session expiry in days |

### 2.3 Exported Types

**Interface:** `SessionPayload`

| Field | Type | Notes |
|-------|------|-------|
| `playerId` | `string` | — |
| `userTag` | `string` | — |
| `role` | `'player' \| 'admin'` | Union literal |
| `iat?` | `number` | Optional, JWT issued-at |
| `exp?` | `number` | Optional, JWT expiry |

### 2.4 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `signSession` | `(payload: Omit<SessionPayload, 'iat' \| 'exp'>, expiresIn?: string) => Promise<string>` | JWT string | Signs a session token. Default expiry: `${SESSION_DAYS}d` (30 days) |
| `verifySession` | `(token: string) => SessionPayload \| null` | Payload or null | Verifies a JWT. Returns null on any error. |
| `getSession` | `() => Promise<SessionPayload \| null>` | Payload or null | Reads `va_session` cookie, verifies JWT. Returns null if banned player (`player.banned === true`). |
| `setSessionCookie` | `(token: string, maxAgeSeconds?: number) => Promise<void>` | void | Sets `va_session` cookie with `httpOnly: true`, `sameSite: 'lax'`, `secure` in production. Default maxAge: `SESSION_DAYS * 24 * 60 * 60` (30 days in seconds). Path: `/`. |
| `clearSessionCookie` | `() => Promise<void>` | void | Deletes `va_session` cookie. |
| `hashPassword` | `(plain: string) => Promise<string>` | bcrypt hash | Uses bcrypt with salt rounds `10`. |
| `verifyPassword` | `(plain: string, hash: string) => Promise<boolean>` | boolean | Uses `bcrypt.compare`. |
| `generateUserTag` | `() => string` | string | Generates tag like `VENOM-{NNNN}` where NNNN is random 1000–9999. |
| `generateUniqueUserTag` | `() => Promise<string>` | string | Tries up to 20 times to find a non-colliding tag via DB check. Fallback: `VENOM-{random 0-9999999}`. |

### 2.5 Code Comments

| Line(s) | Comment |
|---------|---------|
| 37 | `// Invalidate session for banned players` |
| 67 | `// Generate a unique user tag like VENOM-8291` |
| 74 | `// Try up to 20 times to find a non-colliding tag` |
| 80 | `// Fallback: use a longer random` |

---

## 3. CONSTANTS (`lib/constants.ts`)

**File:** `src/lib/constants.ts` (2 lines)

### 3.1 Code Comment

| Line | Comment |
|------|---------|
| 1 | `// Small shared constants — keep here to avoid circular imports` |

### 3.2 Exported Constants

| Constant | Value | Type |
|----------|-------|------|
| `DEFAULT_UNLOCKED_SKINS` | `['skin-default', 'trail-none', 'death-default']` | `string[]` |

Contains 3 skin identifiers: the default snake skin, the no-trail option, and the default death burst effect.

---

## 4. OAUTH LIBRARY (`lib/oauth.ts`)

**File:** `src/lib/oauth.ts` (210 lines)

### 4.1 Exported Types

**Constant:** `OAUTH_PROVIDERS` — `['google', 'facebook', 'apple'] as const`

**Type alias:** `OAuthProvider` — union of `'google' | 'facebook' | 'apple'`

**Interface:** `OAuthUserInfo`

| Field | Type | Notes |
|-------|------|-------|
| `provider` | `OAuthProvider` | — |
| `providerId` | `string` | Unique ID from the provider |
| `email` | `string` | — |
| `name` | `string` | — |
| `avatar?` | `string` | Optional |

**Interface:** `OAuthConfig`

| Field | Type |
|-------|------|
| `clientId` | `string` |
| `clientSecret` | `string` |
| `authUrl` | `string` |
| `tokenUrl` | `string` |
| `userInfoUrl` | `string` |
| `scopes` | `string[]` |

### 4.2 Internal Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `getBaseUrl` | `() => string` | string | Returns `process.env.NEXTAUTH_URL \|\| process.env.NEXT_PUBLIC_BASE_URL \|\| 'http://localhost:3000'` |

### 4.3 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `getRedirectUri` | `() => string` | string | Returns `${getBaseUrl()}/api/auth/social-callback` |
| `getProviderConfig` | `(provider: OAuthProvider) => OAuthConfig \| null` | Config or null | Returns null if env vars `{PROVIDER}_CLIENT_ID` or `{PROVIDER}_CLIENT_SECRET` missing |
| `getAuthorizationUrl` | `(provider: OAuthProvider, state: string) => string \| null` | URL or null | Builds full OAuth authorization URL with redirect URI, scopes, and state param |
| `exchangeCodeForTokens` | `(provider: OAuthProvider, code: string) => Promise<{ accessToken, idToken?, refreshToken? } \| null>` | Token set or null | POSTs to provider token URL with `application/x-www-form-urlencoded` |
| `getUserInfo` | `(provider: OAuthProvider, accessToken: string, idToken?: string) => Promise<OAuthUserInfo \| null>` | User info or null | Fetches user profile from provider. Apple decodes JWT payload from `idToken`. Default name: `'Player'`. |
| `getSetupGuide` | `(provider: OAuthProvider) => string` | string | Returns setup instructions for each provider (URLs to Google Console, Facebook Developers, Apple Developer) |
| `isProviderConfigured` | `(provider: OAuthProvider) => boolean` | boolean | Checks if `getProviderConfig` returns non-null |

### 4.4 Provider Configurations

**Google:**

| Field | Value |
|-------|-------|
| `authUrl` | `https://accounts.google.com/o/oauth2/v2/auth` |
| `tokenUrl` | `https://oauth2.googleapis.com/token` |
| `userInfoUrl` | `https://www.googleapis.com/oauth2/v2/userinfo` |
| `scopes` | `['openid', 'email', 'profile']` |
| Extra params | `access_type=offline`, `prompt=select_account` |

**Facebook:**

| Field | Value |
|-------|-------|
| `authUrl` | `https://www.facebook.com/v18.0/dialog/oauth` |
| `tokenUrl` | `https://graph.facebook.com/v18.0/oauth/access_token` |
| `userInfoUrl` | `https://graph.facebook.com/v18.0/me?fields=id,name,email,picture` |
| `scopes` | `['email', 'public_profile']` |

**Apple:**

| Field | Value |
|-------|-------|
| `authUrl` | `https://appleid.apple.com/auth/authorize` |
| `tokenUrl` | `https://appleid.apple.com/auth/token` |
| `userInfoUrl` | `''` (empty — Apple returns user info in token response + ID token) |
| `scopes` | `['name', 'email']` |
| Extra params | `response_type=code%20id_token`, `response_mode=form_post` |

### 4.5 Apple-Specific Name Fallback

When Apple doesn't provide a name (subsequent logins): `email.split('@')[0]` or `'Player'` if no email.

### 4.6 Console Error Messages (from oauth.ts)

| Message | Trigger |
|---------|---------|
| `` `[oauth/${provider}] token exchange failed:` `` | Token response not `ok` |
| `` `[oauth/${provider}] token exchange error:` `` | Fetch/parse error in `exchangeCodeForTokens` |
| `` `[oauth/${provider}] getUserInfo error:` `` | Fetch/parse error in `getUserInfo` |

### 4.7 Setup Guide Text (verbatim)

| Provider | Guide Text |
|----------|-----------|
| Google | `Go to https://console.cloud.google.com → APIs & Services → Credentials → Create OAuth 2.0 Client ID. Add redirect URI: {redirectUri}` |
| Facebook | `Go to https://developers.facebook.com → My Apps → Create App → Add Facebook Login. Set redirect URI: {redirectUri}` |
| Apple | `Go to https://developer.apple.com → Certificates → Register an App ID with Sign in with Apple. Set redirect URI: {redirectUri}` |

### 4.8 Code Comments

| Line(s) | Comment |
|---------|---------|
| 1–3 | `// OAuth Utility Library — Google, Facebook, Apple` |
| 174 | `// Apple returns user info in the ID token (JWT)` |
| 176 | `// Decode the JWT payload without verification (Apple verifies server-side)` |
| 181 | `// Apple only sends name on FIRST authorization via POST body, not in ID token` |
| 182 | `// For subsequent logins, we need to use the email/sub to find the existing account` |

---

## 5. API HELPERS (`lib/api-helpers.ts`)

**File:** `src/lib/api-helpers.ts` (22 lines)

### 5.1 Code Comments

| Line(s) | Comment |
|---------|---------|
| 1–3 | `// Shared API route helpers — reduce boilerplate across 20+ routes.` |

### 5.2 Imports

| Import | Source |
|--------|--------|
| `NextResponse` | `next/server` |
| `getSession` | `@/lib/auth` |

### 5.3 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `requireAuth` | `() => Promise<{ session: SessionPayload \| null, error: NextResponse \| null }>` | Session+error tuple | Calls `getSession()`. If null, returns `{ error: NextResponse.json({ error: 'Not authenticated.' }, { status: 401 }) }`. |

**JSDoc usage example:**
```
const { session, error } = await requireAuth();
if (error) return error;
```

### 5.4 Error Messages

| Message | HTTP Status | Trigger |
|---------|-------------|---------|
| `'Not authenticated.'` | 401 | `getSession()` returns null |

---

## 6. GAME CONFIG DB (`lib/game-config-db.ts`)

**File:** `src/lib/game-config-db.ts` (461 lines)

### 6.1 Internal Interface

**Interface:** `GameConfigEntry`

| Field | Type |
|-------|------|
| `key` | `string` |
| `value` | `string` (JSON-encoded) |
| `label` | `string` |
| `category` | `string` |
| `order` | `number` |
| `type` | `string` |

### 6.2 Exported Constants

**Constant:** `DEFAULT_GAME_CONFIG` — `GameConfigEntry[]` (40 entries across 9 categories)

#### Category: `snake_physics` (10 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `snake.collisionRadius` | `6` | `Collision radius (px)` | 0 |
| `snake.visualRadius` | `8` | `Visual radius (px)` | 1 |
| `snake.segmentSpacing` | `16` | `Segment spacing (px)` | 2 |
| `snake.baseSpeed` | `4.5` | `Base move speed` | 3 |
| `snake.boostSpeed` | `8.0` | `Boost speed` | 4 |
| `snake.turnBase` | `0.35` | `Base turn rate (rad/tick)` | 5 |
| `snake.turnMin` | `0.08` | `Min turn rate (rad/tick)` | 6 |
| `snake.turnScoreFactor` | `0.0003` | `Turn rate score penalty` | 7 |
| `snake.initialBodyLength` | `20` | `Initial body segments at spawn` | 8 |
| `snake.initialSpawnScore` | `20` | `Starting score` | 9 |

#### Category: `snake_growth` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `growth.maxSegments` | `200` | `Max body segments (hard cap)` | 0 |
| `growth.lengthLogFactor` | `20` | `Length growth: log factor` | 1 |
| `growth.maxExtraRadius` | `3` | `Max extra thickness (px) beyond base` | 2 |
| `growth.thicknessLogFactor` | `0.5` | `Thickness growth: log factor` | 3 |

#### Category: `boost_system` (2 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `boost.minLength` | `8` | `Min segments to boost` | 0 |
| `boost.dropInterval` | `10` | `Frames between tail drops during boost` | 1 |

#### Category: `collision` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `collision.hitFactor` | `0.75` | `Body collision hit factor` | 0 |
| `collision.headOnHitFactor` | `0.8` | `Head-on collision hit factor` | 1 |
| `collision.neckAngleThreshold` | `60` | `Neck protection angle threshold (degrees)` | 2 |
| `collision.neckSegmentCount` | `5` | `Neck protection segment count` | 3 |

#### Category: `food_system` (11 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `food.smallValue` | `1` | `Small food value` | 0 |
| `food.smallRadius` | `3` | `Small food radius` | 1 |
| `food.smallWeight` | `0.93` | `Small food spawn weight` | 2 |
| `food.mediumValue` | `3` | `Medium food value` | 3 |
| `food.mediumRadius` | `5` | `Medium food radius` | 4 |
| `food.mediumWeight` | `0.04` | `Medium food spawn weight` | 5 |
| `food.largeValue` | `5` | `Large food value` | 6 |
| `food.largeRadius` | `8` | `Large food radius` | 7 |
| `food.largeWeight` | `0.03` | `Large food spawn weight` | 8 |
| `food.countTarget` | `1200` | `Target food count per arena` | 9 |
| `food.starDropCount` | `10` | `Star chips dropped on player death` | 10 |

#### Category: `extraction` (2 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `extraction.durationMs` | `3000` | `Extraction duration (ms)` | 0 |
| `extraction.glideSpeed` | `3.2` | `Speed while extracting` | 1 |

#### Category: `spawning` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `spawning.safeDistance` | `500` | `Min distance from other snakes` | 0 |
| `spawning.safeBoundaryMargin` | `500` | `Min distance inside boundary` | 1 |
| `spawning.safeAttempts` | `30` | `Max spawn attempts` | 2 |
| `spawning.protectionMs` | `4000` | `Spawn protection duration (ms)` | 3 |

#### Category: `map_settings` (4 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `map.minRadius` | `3000` | `Min map radius (1 player)` | 0 |
| `map.maxRadius` | `16000` | `Max map radius (1000 players)` | 1 |
| `map.breathAmplitude` | `40` | `Breathing amplitude (px)` | 2 |
| `map.breathCycleMs` | `10000` | `Breathing cycle duration (ms)` | 3 |

#### Category: `bot_settings` (3 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `bot.selfDestructThreshold` | `100` | `Bot self-destruct score (online)` | 0 |
| `bot.evadeRadius` | `300` | `Bot evade radius` | 1 |
| `bot.foodScanRadius` | `300` | `Bot food scan radius` | 2 |

#### Category: `economy` (3 entries)

| Key | Value | Label | Order |
|-----|-------|-------|-------|
| `economy.commissionThreshold` | `4` | `Min real players for commission` | 0 |
| `economy.commissionRate` | `0.35` | `Commission rate (0-1)` | 1 |
| `economy.guestStarterChips` | `150` | `Guest starter chips` | 2 |

### 6.3 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `seedGameConfig` | `() => Promise<void>` | void | Upserts all 40 default config entries into `GameConfig` table. Existing rows left untouched. |
| `getGameConfig` | `() => Promise<Record<string, any>>` | Flat key-value map | Loads ALL configs from DB, parses JSON values. Ordered by `order asc`. |
| `getGameConfigValue` | `(key: string) => Promise<any>` | any or `undefined` | Gets single config value by key. Returns `undefined` if not found. |

### 6.4 Code Comments

| Line(s) | Comment |
|---------|---------|
| 12 | `/** Ordered list of every default game-config entry, grouped by category. */` |
| 411–414 | `/** Upsert every default config entry into the GameConfig table. Safe to call repeatedly — existing rows are left untouched. */` |
| 432–435 | `/** Load ALL configs from DB and return as a flat Record<string, any>. Each stored JSON string is parsed back to its native type. */` |
| 449–452 | `/** Get a single config value by key. Returns \`undefined\` if the key does not exist in the database. */` |

---

## 7. PLAYER HELPERS (`lib/player-helpers.ts`)

**File:** `src/lib/player-helpers.ts` (56 lines)

### 7.1 Imports

| Import | Source |
|--------|--------|
| `db` | `./db` |
| `Player` (type) | `@prisma/client` |
| `PlayerProfile` (type) | `./types` |

### 7.2 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `toProfile` | `(p: Player) => PlayerProfile` | `PlayerProfile` | Converts Prisma Player to public PlayerProfile. Parses `unlockedSkins` JSON. Sets `securityPin: !!p.securityPin` (boolean). Converts dates to ISO strings. |
| `encodeSkins` | `(skins: string[]) => string` | string | JSON-stringifies array, deduplicating with `new Set()`. |
| `getFirstAdmin` | `() => Promise<Player \| null>` | Player or null | Finds first player with `role: 'admin'`. |

### 7.3 toProfile Field Mapping

All fields mapped from Prisma Player to PlayerProfile:

| Profile Field | Source |
|---------------|--------|
| `id` | `p.id` |
| `userTag` | `p.userTag` |
| `name` | `p.name` |
| `email` | `p.email` |
| `country` | `p.country` |
| `avatar` | `p.avatar` |
| `role` | `p.role as 'player' \| 'admin'` |
| `bankedChips` | `p.bankedChips` |
| `totalEarned` | `p.totalEarned` |
| `totalLost` | `p.totalLost` |
| `level` | `p.level` |
| `xp` | `p.xp` |
| `lifetimeKills` | `p.lifetimeKills` |
| `lifetimeDeaths` | `p.lifetimeDeaths` |
| `lifetimeExtracts` | `p.lifetimeExtracts` |
| `bestStreak` | `p.bestStreak` |
| `biggestExtract` | `p.biggestExtract` |
| `dailyStreak` | `p.dailyStreak` |
| `lastDailyClaim` | `p.lastDailyClaim` |
| `unlockedSkins` | Parsed from `p.unlockedSkins` (JSON array, fallback `[]`) |
| `currentSkin` | `p.currentSkin` |
| `currentTrail` | `p.currentTrail` |
| `currentDeath` | `p.currentDeath` |
| `currentFlag` | `p.currentFlag` |
| `currentBanner` | `p.currentBanner` |
| `clanTag` | `p.clanTag` |
| `clanRank` | `p.clanRank` |
| `securityPin` | `!!p.securityPin` (converted to boolean) |
| `oauthProvider` | `p.oauthProvider` |
| `createdAt` | `p.createdAt.toISOString()` |
| `lastSeenAt` | `p.lastSeenAt.toISOString()` |

### 7.4 Code Comments

| Line(s) | Comment |
|---------|---------|
| 48 | `// Serialized JSON helper for unlockedSkins` |

---

## 8. DATE UTILITIES (`lib/date-utils.ts`)

**File:** `src/lib/date-utils.ts` (40 lines)

### 8.1 Internal Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `fmt` | `(date: Date) => string` | `YYYY-MM-DD` | Formats a Date to UTC date string. Uses `getUTCFullYear`, `getUTCMonth`, `getUTCDate` with zero-padding. |

### 8.2 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `utcToday` | `() => string` | `YYYY-MM-DD` | Today's date in UTC |
| `utcMonday` | `() => string` | `YYYY-MM-DD` | Most recent Monday in UTC. Sunday (day 0) treated as 6 days back. |
| `utcYesterday` | `() => string` | `YYYY-MM-DD` | Yesterday's date in UTC |
| `utcLastMonday` | `() => string` | `YYYY-MM-DD` | Previous week's Monday in UTC (7 days before current Monday) |

### 8.3 Code Comments

| Line(s) | Comment |
|---------|---------|
| 1–4 | `// Shared date utility functions. Used by challenges, match/result, and challenges/progress routes.` |
| 6 | `/** Format a Date to YYYY-MM-DD in UTC */` |
| 11 | `/** Get today's date in UTC as YYYY-MM-DD */` |
| 16 | `/** Get the most recent Monday in UTC as YYYY-MM-DD */` |
| 19 | `// 0=Sun … 6=Sat` |
| 20 | `// shift so Monday=0` |
| 25 | `/** Get yesterday's date in UTC as YYYY-MM-DD */` |
| 32 | `/** Get the previous week's Monday in UTC as YYYY-MM-DD */` |

---

## 9. DATABASE CLIENT (`lib/db.ts`)

**File:** `src/lib/db.ts` (18 lines)

### 9.1 Imports

| Import | Source |
|--------|--------|
| `PrismaClient` | `@prisma/client` |

### 9.2 Exported Constants

| Constant | Value | Type | Notes |
|----------|-------|------|-------|
| `db` | Singleton `PrismaClient` | `PrismaClient` | Global singleton to prevent multiple instances in development. Logs `['query']` in development mode only. |

### 9.3 Singleton Pattern

- Uses `globalThis` casting to hold the PrismaClient instance across hot reloads in dev
- Only persists to global in non-production (`process.env.NODE_ENV !== 'production'`)
- Development logging: `log: process.env.NODE_ENV === 'development' ? ['query'] : []`

---

## 10. UTILITY (`lib/utils.ts`)

**File:** `src/lib/utils.ts` (6 lines)

### 10.1 Imports

| Import | Source |
|--------|--------|
| `clsx`, `ClassValue` (type) | `clsx` |
| `twMerge` | `tailwind-merge` |

### 10.2 Exported Functions

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `cn` | `(...inputs: ClassValue[]) => string` | string | Merges Tailwind CSS classes using `twMerge(clsx(inputs))` — deduplicates and resolves conflicting utility classes. |

---

## 11. useMobile Hook (`hooks/use-mobile.ts`)

**File:** `src/hooks/use-mobile.ts` (19 lines)

### 11.1 Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `MOBILE_BREAKPOINT` | `768` | Pixel width threshold for mobile detection |

### 11.2 Exported Functions

| Hook | Signature | Returns | Description |
|------|-----------|---------|-------------|
| `useIsMobile` | `() => boolean` | `boolean` | Returns `true` if `window.innerWidth < 768`. Uses `matchMedia("(max-width: 767px)")` with change event listener. Initial state: `undefined` (becomes boolean after first effect). Final return coerces to `!!isMobile` (false when undefined). |

---

## 12. useToast Hook (`hooks/use-toast.ts`)

**File:** `src/hooks/use-toast.ts` (193 lines)

### 12.1 Code Comments

| Line(s) | Comment |
|---------|---------|
| 3 | `// Inspired by react-hot-toast library` |

### 12.2 Internal Constants

| Constant | Value | Notes |
|----------|-------|-------|
| `TOAST_LIMIT` | `1` | Maximum visible toasts at once |
| `TOAST_REMOVE_DELAY` | `1000000` | ms delay before removing dismissed toast (~16.7 minutes) |

### 12.3 Internal Types

| Type | Fields |
|------|--------|
| `ToasterToast` | Extends `ToastProps` + `id: string`, `title?: ReactNode`, `description?: ReactNode`, `action?: ToastActionElement` |
| `actionTypes` | Object with 4 string constants: `ADD_TOAST`, `UPDATE_TOAST`, `DISMISS_TOAST`, `REMOVE_TOAST` |
| `Action` | Discriminated union on `actionTypes` — 4 variants for add/update/dismiss/remove |
| `State` | `{ toasts: ToasterToast[] }` |
| `Toast` | `Omit<ToasterToast, 'id'>` |

### 12.4 Internal Functions

| Function | Signature | Description |
|----------|-----------|---------|
| `genId` | `() => string` | Auto-incrementing counter mod `Number.MAX_SAFE_INTEGER` |
| `addToRemoveQueue` | `(toastId: string) => void` | Schedules `REMOVE_TOAST` dispatch after `TOAST_REMOVE_DELAY` ms. Deduplicates via Map. |
| `dispatch` | `(action: Action) => void` | Updates `memoryState` via reducer, notifies all listeners. |
| `toast` | `(props: Toast) => { id, dismiss, update }` | Creates toast, dispatches `ADD_TOAST`, returns controls. |

### 12.5 Exported Items

| Export | Type | Description |
|--------|------|-------------|
| `reducer` | `(state: State, action: Action) => State` | Handles 4 action types: ADD (prepend, slice to `TOAST_LIMIT`), UPDATE (merge by id), DISMISS (set `open: false`, schedule remove), REMOVE (filter by id or clear all) |
| `useToast` | `() => { ...state, toast, dismiss }` | React hook. Returns current state (toasts array), `toast()` function, and `dismiss(toastId?)` function. Subscribes to state changes via listener pattern. |
| `toast` | `(props: Toast) => { id, dismiss, update }` | Standalone function to create a toast. Returns `{ id, dismiss, update }` controls. |

---

## MASTER TEXT INVENTORY — ALL USER-FACING STRINGS

Below is every user-facing text string found in the auth gate component, organized alphabetically:

| String | Location |
|--------|----------|
| `150` (in "Guests get 150 starter chips...") | AuthScreen bottom info |
| `4-digit Security PIN` (forgot password label) | ForgotPasswordForm |
| `Already have an account? Login` | RegisterForm cross-link |
| `Apple` | Social login button |
| `Back to Login` | ForgotPasswordForm success button |
| `Confirm New Password` | ForgotPasswordForm label |
| `Confirm Password` | RegisterForm label |
| `Create Account` | RegisterForm submit button |
| `Display name (up to 20 chars)` | RegisterForm label |
| `Don't get caught.` | AuthScreen tagline (emphasized) |
| `Email` | LoginForm, RegisterForm, ForgotPasswordForm labels |
| `Enter the arena` | Card title |
| `Enter your email and 4-digit Security PIN to set a new password.` | Forgot Password dialog description |
| `Facebook` | Social login button |
| `Forgot Password?` | LoginForm cross-link |
| `Good` | Password strength label |
| `Google` | Social login button |
| `Guests get 150 starter chips. Register to keep your progress.` | AuthScreen bottom info |
| `Hunt. Harvest. Extract. ` | AuthScreen tagline (part 1) |
| `Loading arena…` | AuthGate loading state |
| `Login` | Tab label, LoginForm submit button |
| `Network error. Please try again.` | callApi catch, ForgotPasswordForm catch |
| `New Password (min 6 chars)` | ForgotPasswordForm label |
| `Passwords do not match.` | RegisterForm validation, ForgotPasswordForm validation |
| `Password` | LoginForm label |
| `Password (min 6 chars)` | RegisterForm label |
| `Password Reset!` | ForgotPasswordForm success heading |
| `Play as Guest` | Guest button |
| `Register` | Tab label |
| `Remember me (30 days)` | LoginForm checkbox label |
| `Required for password recovery. Keep it safe!` | RegisterForm PIN helper text |
| `Reset Password` | Forgot Password dialog title, submit button |
| `Security PIN (4 digits, optional)` | RegisterForm label |
| `Sign in or create an account to play.` | Card description |
| `Something went wrong.` | callApi fallback error |
| `Strength:` | RegisterForm password strength prefix |
| `Strong` | Password strength label |
| `VENOM ARENA` | Main heading |
| `View Rules & Guide` | AuthScreen bottom link |
| `Weak` | Password strength label |
| `Your password has been changed. You can now log in with your new password.` | ForgotPasswordForm success description |
| `or` | Guest divider |
| `or continue with` | Social login divider |

**Placeholders:**

| Placeholder | Location |
|-------------|----------|
| `you@arena.gg` | All email fields |
| `••••••••` | All password fields |
| `e.g. 1234` | RegisterForm Security PIN |
| `1234` | ForgotPasswordForm PIN |
| `ViperStrike` | RegisterForm Display name |

**Password strength labels:** `Weak`, `Fair`, `Good`, `Strong`

**Non-user-facing error strings:**

| String | Location |
|--------|----------|
| `'Not authenticated.'` | api-helpers.ts (HTTP 401 JSON) |
| `Failed to reset password.` | ForgotPasswordForm API fallback |
| `'Player'` | oauth.ts fallback name |
| `'venom-arena-dev-secret-change-in-prod'` | auth.ts JWT secret fallback |

---

*End of Task 10 catalog.*
