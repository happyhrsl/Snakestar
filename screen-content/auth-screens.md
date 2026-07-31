# Auth Screens — Screen Content Walkthrough

**File:** `src/components/auth/auth-gate.tsx` (746 lines)

---

## SCREEN 0: Loading Skeleton

*Rendered while `useAuth().loading` is true*

```
┌─────────────────────────────────────┐
│                                     │
│         [Loader2 spinner]           │
│         (w-8 h-8, animate-spin,     │
│          text-primary, centered)    │
│                                     │
│         Loading arena…              │
│         (text-sm, text-muted-       │
│          foreground, centered)      │
│                                     │
└─────────────────────────────────────┘
(min-h-screen, flex center)
```

---

## SCREEN 1: Auth Screen (Main Page)

*Rendered after loading completes and user is not authenticated*

### Header / Logo

```
┌──────────────────────────────────────────────┐
│                                              │
│          ┌──────────────────┐                 │
│          │    [Skull icon]  │                 │
│          │   (w-9 h-9,      │                 │
│          │   text-primary,  │                 │
│          │   va-neon-text)  │                 │
│          └──────────────────┘                 │
│          (w-16 h-16, rounded-2xl,             │
│           bg-primary/15,                      │
│           border-primary/30,                  │
│           va-neon-border)                     │
│                                              │
│          VENOM ARENA                         │
│          (text-4xl, font-black,               │
│           tracking-tight, va-neon-text)       │
│                                              │
│     Hunt. Harvest. Extract. Don't get caught. │
│     (text-sm, text-muted-foreground.          │
│      "Don't get caught." in text-primary,    │
│      font-semibold)                           │
│                                              │
└──────────────────────────────────────────────┘
(text-center)
```

### Card Shell

```
┌──────────────────────────────────────────────┐
│  Enter the arena                              │
│  (CardTitle: text-lg)                        │
│  Sign in or create an account to play.       │
│  (CardDescription: text-sm)                  │
│                                              │
│  ─── TAB BAR ──────────────────────────────  │
│  ┌─────────────────┬─────────────────┐       │
│  │ [LogIn icon]    │ [UserPlus icon] │       │
│  │ Login           │ Register        │       │
│  └─────────────────┴─────────────────┘       │
│  (grid 2 cols, TabsList)                     │
│  Default active tab: "login"                │
│                                              │
│  ─── TAB CONTENT (see below) ──────────────  │
│                                              │
│  ─── DIVIDER ─────────────────────────────  │
│              ───── or continue with ─────     │
│  (text-xs, text-muted-foreground, centered   │
│   on border-t)                               │
│                                              │
│  ─── SOCIAL LOGIN BUTTONS ────────────────  │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ [G logo]  │ │ [f logo]  │ │ [🍎 logo] │  │
│  │ Google    │ │ Facebook  │ │ Apple     │  │
│  └───────────┘ └───────────┘ └───────────┘  │
│  (grid 3 cols, variant="outline", text-xs,  │
│   disabled when busy. Each has an SVG icon +  │
│   label text)                                │
│  Busy state: Loader2 spinner replaces icon   │
│                                              │
│  ─── DIVIDER ─────────────────────────────  │
│                  ── or ──                    │
│  (text-xs, text-muted-foreground, centered   │
│   on border-t)                               │
│                                              │
│  ─── GUEST PLAY BUTTON ──────────────────  │
│  ┌────────────────────────────────────────┐  │
│  │ [Ghost icon] Play as Guest             │  │
│  └────────────────────────────────────────┘  │
│  (variant="secondary", full-width,           │
│   disabled when busy.                       │
│   Busy state: Loader2 spinner replaces icon) │
│                                              │
│  ⚡ Guests get 150 starter chips. Register   │
│     to keep your progress.                  │
│  (text-[11px], text-muted-foreground,        │
│   text-center, Zap icon inline)              │
│                                              │
│  View Rules & Guide                          │
│  (text-[11px], text-primary, underline on    │
│   hover, BookOpen icon. Opens GameRulesModal)│
│                                              │
└──────────────────────────────────────────────┘
(Card: border-primary/20, bg-card/80, backdrop-blur,
 max-w-md)
```

### Error Display (shared by Login & Register tabs)

```
[Shield icon] [error message text]
(text-xs, text-destructive, flex, gap-1)

Error sources:
- API returns !res.ok → shows data.error || "Something went wrong."
- Network catch → shows "Network error. Please try again."
- Cleared when switching tabs
```

---

## SCREEN 2: Login Tab

```
  ─── TAB CONTENT: LOGIN ─────────────────────

  Email
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │[Mail icon] you@arena.gg              │
  └──────────────────────────────────────┘
  (type=email, required, autoComplete=email,
   pl-8, text-sm, placeholder: "you@arena.gg")

  Password
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │[KeyRound icon] ••••••••      [Eye]  │
  └──────────────────────────────────────┘
  (type=password → toggles to text, required,
   autoComplete=current-password, pl-8, pr-9,
   text-sm, placeholder: "••••••••")
  Eye/EyeOff toggle button: absolute right,
   text-muted-foreground, hover:text-foreground,
   tabIndex=-1

  ☐ Remember me (30 days)
  (checkbox + Label: text-[11px], text-muted-foreground)

  [ERROR LINE — see above, conditional]

  ┌──────────────────────────────────────┐
  │              Login                   │
  └──────────────────────────────────────┘
  (Button, full-width, primary variant.
   Busy state: Loader2 spinner + "Login")

  Don't have an account? Register     Forgot Password?
  (text-[11px], text-primary, underline on hover.
   Left link switches to Register tab.
   Right link opens Forgot Password modal.)
```

---

## SCREEN 3: Register Tab

```
  ─── TAB CONTENT: REGISTER ───────────────────

  Display name (up to 20 chars)
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │ ViperStrike                          │
  └──────────────────────────────────────┘
  (type=text, required, maxLength=20, text-sm,
   placeholder: "ViperStrike")

  Email
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │[Mail icon] you@arena.gg              │
  └──────────────────────────────────────┘
  (type=email, required, autoComplete=email,
   pl-8, text-sm, placeholder: "you@arena.gg")

  Password (min 6 chars)
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │[KeyRound icon] ••••••••      [Eye]  │
  └──────────────────────────────────────┘
  (type=password → toggles to text, required,
   minLength=6, autoComplete=new-password,
   pl-8, pr-9, text-sm, placeholder: "••••••••")
  Eye/EyeOff toggle button (same as login)

  ┌─ PASSWORD STRENGTH INDICATOR ────────────┐
  │ [████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]    │
  │ Strength: [Weak/Fair/Good/Strong]       │
  └────────────────────────────────────────┘
  (VISIBLE ONLY when password.length > 0)

  Strength bar: h-1.5, w-full, bg-muted, rounded-full
  Fill bar: transitions width & color over 300ms

  ┌─────────┬───────────┬───────────┬───────────┐
  │ Weak    │ Fair      │ Good      │ Strong   │
  │ score 0-1│ score 2   │ score 3   │ score 4-5│
  │ w-1/4   │ w-2/4     │ w-3/4     │ w-full   │
  │ bg-red  │ bg-orange │ bg-yellow │bg-emerald │
  │ text-   │ text-     │ text-     │ text-    │
  │ red-500 │ yellow-500│ yellow-500│emerald-500│
  └─────────┴───────────┴───────────┴───────────┘

  Strength scoring rules:
    +1 for length >= 6
    +1 for length >= 10
    +1 for uppercase letter [A-Z]
    +1 for digit [0-9]
    +1 for special char [^A-Za-z0-9]

  Label: "Strength: " (text-[10px], text-muted-foreground)
  Value color: red-500 if score<2, yellow-500 if score<3,
    emerald-500 if score>=3

  Confirm Password
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │[KeyRound icon] ••••••••      [Eye]  │
  └──────────────────────────────────────┘
  (type=password → toggles to text, required,
   minLength=6, autoComplete=new-password,
   pl-8, pr-9, text-sm, placeholder: "••••••••")
  Eye/EyeOff toggle button (same as login)
  Typing matching password clears any match error.

  Security PIN (4 digits, optional)
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │ e.g. 1234                           │
  └──────────────────────────────────────┘
  (type=text, inputMode=numeric, maxLength=4,
   pattern="[0-9]{0,4}", autoComplete=off,
   text-sm, placeholder: "e.g. 1234")
  Non-numeric chars are stripped on input.

  Required for password recovery. Keep it safe!
  (text-[10px], text-muted-foreground)

  [ERROR LINE — conditional]
  - API error: [Shield icon] + error text (text-xs, text-destructive)
  - Password mismatch: "Passwords do not match." (set via DOM
    manipulation on [data-register-error] element)
  - Empty error element always rendered (hidden) for DOM targeting

  ┌──────────────────────────────────────┐
  │          Create Account              │
  └──────────────────────────────────────┘
  (Button, full-width, primary variant.
   Busy state: Loader2 spinner + "Create Account")

       Already have an account? Login
  (text-[11px], text-primary, underline on hover,
   centered. Switches to Login tab.)
```

---

## SCREEN 4: Forgot Password Modal (Dialog)

*Opened from Login tab's "Forgot Password?" link*

### Modal Shell

```
┌──────────────────────────────────────┐
│  [KeyRound icon] Reset Password      │
│  (DialogTitle: flex, gap-2.          │
│   KeyRound: w-4 h-4, text-primary)   │
│                                      │
│  Enter your email and 4-digit        │
│  Security PIN to set a new password. │
│  (DialogDescription: text-xs)        │
│                                      │
│  ─── FORM (see below) ────────────── │
│                                      │
└──────────────────────────────────────┘
(Dialog: bg-card, border-border, max-w-sm)
```

### Form State (before success)

```
  Email
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │ you@arena.gg                         │
  └──────────────────────────────────────┘
  (type=email, required, text-sm,
   placeholder: "you@arena.gg")

  4-Digit Security PIN
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │ 1234                                 │
  └──────────────────────────────────────┘
  (type=text, inputMode=numeric, required,
   maxLength=4, pattern="[0-9]{4}",
   autoComplete=off, text-sm,
   placeholder: "1234")
  Non-numeric chars are stripped on input.

  This is the PIN you set during registration.
  (text-[10px], text-muted-foreground)

  New Password (min 6 chars)
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │ ••••••••                      [Eye]  │
  └──────────────────────────────────────┘
  (type=password → toggles to text, required,
   minLength=6, pr-9, text-sm,
   placeholder: "••••••••")
  Eye/EyeOff toggle button (same pattern)

  Confirm New Password
  (Label: text-xs)
  ┌──────────────────────────────────────┐
  │ ••••••••                             │
  └──────────────────────────────────────┘
  (type=password, required, minLength=6,
   text-sm, placeholder: "••••••••")
  Typing matching password clears localError.

  [ERROR LINE — conditional]
  - Password mismatch: "Passwords do not match."
  - API error: [data.error] || "Failed to reset password."
  - Network error: "Network error. Please try again."
  (text-xs, text-destructive)

  ┌──────────────────────────────────────┐
  │          Reset Password             │
  └──────────────────────────────────────┘
  (Button, full-width, primary variant.
   Disabled when localBusy || busy.
   Busy state: Loader2 spinner + "Reset Password")
```

### Success State (after successful reset)

```
┌──────────────────────────────────────┐
│                                      │
│         ┌──────────────┐             │
│         │ [Shield icon]│             │
│         │ (w-6 h-6,     │             │
│         │  text-       │             │
│         │  emerald-400)│             │
│         └──────────────┘             │
│         (w-12 h-12, rounded-full,     │
│          bg-emerald-500/10,            │
│          border-emerald-500/20,        │
│          centered)                     │
│                                      │
│         Password Reset!              │
│         (text-sm, font-semibold,      │
│          text-foreground)             │
│                                      │
│  Your password has been changed.     │
│  You can now log in with your new   │
│  password.                           │
│  (text-xs, text-muted-foreground)    │
│                                      │
│         [Back to Login]              │
│         (Button, size=sm, mt-2)       │
│                                      │
└──────────────────────────────────────┘
(text-center, py-4, space-y-2)
```

---

## Complete Error Message Reference

| Context | Trigger | Message | Display Element |
|---------|---------|---------|----------------|
| Login/Register (shared) | API !res.ok | `data.error` or "Something went wrong." | Inline paragraph with Shield icon (text-xs, text-destructive) |
| Login/Register (shared) | Network catch | "Network error. Please try again." | Same as above |
| Register | Password mismatch | "Passwords do not match." | `data-register-error` element (text-xs, text-destructive) |
| Forgot Password | Password mismatch | "Passwords do not match." | Inline paragraph (text-xs, text-destructive) |
| Forgot Password | API !res.ok | `data.error` or "Failed to reset password." | Same as above |
| Forgot Password | Network catch | "Network error. Please try again." | Same as above |

## Complete Placeholder Reference

| Field | Placeholder |
|-------|-----------|
| Login Email | `you@arena.gg` |
| Login Password | `••••••••` |
| Register Display Name | `ViperStrike` |
| Register Email | `you@arena.gg` |
| Register Password | `••••••••` |
| Register Confirm Password | `••••••••` |
| Register Security PIN | `e.g. 1234` |
| Forgot Password Email | `you@arena.gg` |
| Forgot Password Security PIN | `1234` |
| Forgot Password New Password | `••••••••` |
| Forgot Password Confirm New Password | `••••••••` |

## Complete Label Reference

| Label Text | For Field | Screen |
|-----------|-----------|--------|
| Email | Login email | Login |
| Password | Login password | Login |
| Remember me (30 days) | Checkbox | Login |
| Display name (up to 20 chars) | Name input | Register |
| Email | Register email | Register |
| Password (min 6 chars) | Register password | Register |
| Confirm Password | Register confirm | Register |
| Security PIN (4 digits, optional) | PIN input | Register |
| Email | Forgot email | Forgot Password |
| 4-Digit Security PIN | Forgot PIN | Forgot Password |
| New Password (min 6 chars) | New password | Forgot Password |
| Confirm New Password | Confirm new | Forgot Password |

## Complete Button Reference

| Button Text | Screen | Variant | Behavior |
|-------------|--------|---------|----------|
| Login | Login tab | primary (default) | Submit form to `/api/auth/login` |
| Create Account | Register tab | primary (default) | Submit form to `/api/auth/register` |
| Google | Social row | outline | Redirect to `/api/auth/social-login?provider=google` |
| Facebook | Social row | outline | Redirect to `/api/auth/social-login?provider=facebook` |
| Apple | Social row | outline | Redirect to `/api/auth/social-login?provider=apple` |
| Play as Guest | Below social | secondary | POST to `/api/auth/guest` |
| Reset Password | Forgot modal | primary (default) | Submit form to `/api/auth/forgot-password` |
| Back to Login | Forgot success | primary (default), size=sm | Closes modal |

## Link Text Reference

| Link Text | Location | Action |
|-----------|----------|--------|
| Don't have an account? **Register** | Login tab, bottom-left | Switches to Register tab |
| Forgot Password? | Login tab, bottom-right | Opens Forgot Password modal |
| Already have an account? **Login** | Register tab, bottom-center | Switches to Login tab |
| View Rules & Guide | Below card, bottom | Opens GameRulesModal |

## Divider Text Reference

| Divider Text | Location |
|-------------|----------|
| or continue with | Between tab content and social buttons |
| or | Between social buttons and Guest Play button |
