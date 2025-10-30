# Authentication Flow Documentation

## Overview

The Silver Palm Resort website now has a complete authentication flow with Sign In and Sign Up modals that work seamlessly together.

---

## 🎯 Authentication Flow

### Primary Flow (User without account)

```
1. User clicks "Sign In" in navbar
   ↓
2. Sign In modal appears
   ↓
3. User clicks "Don't have an account? Sign Up"
   ↓
4. Sign In modal closes, Sign Up modal opens
   ↓
5. User creates account
   ↓
6. Success toast notification
```

### Secondary Flow (User with account)

```
1. User clicks "Sign In" in navbar
   ↓
2. Sign In modal appears
   ↓
3. User enters credentials
   ↓
4. Success toast "Welcome back!"
```

### Alternative Flow (From Homepage)

```
1. User clicks "Get Started" on homepage hero
   ↓
2. Sign Up modal appears directly
   ↓
3. User can switch to "Sign In" if needed
```

---

## 📱 Components

### 1. Sign In Modal (`components/ui/sign-in-modal.tsx`)

**Features:**

- ✅ Email and password fields
- ✅ Password visibility toggle
- ✅ "Forgot password?" link (ready for implementation)
- ✅ Social authentication (Google, Facebook, GitHub)
- ✅ Loading states during sign in
- ✅ Switch to Sign Up link
- ✅ Form validation
- ✅ Success toast notifications

**Props:**

```typescript
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}
```

**Usage:**

```tsx
import { SignInModal } from "@/components/ui/sign-in-modal";

const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

<SignInModal
  isOpen={isSignInModalOpen}
  onClose={() => setIsSignInModalOpen(false)}
  onSwitchToSignUp={() => setIsSignUpModalOpen(true)}
/>;
```

---

### 2. Sign Up Modal (`components/ui/sign-up-modal.tsx`)

**Features:**

- ✅ Name, email, and password fields
- ✅ Password visibility toggle
- ✅ Social authentication (Google, Facebook, GitHub)
- ✅ Loading states during sign up
- ✅ Switch to Sign In link
- ✅ Form validation
- ✅ Success toast notifications

**Props:**

```typescript
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn?: () => void;
}
```

**Usage:**

```tsx
import { SignUpModal } from "@/components/ui/sign-up-modal";

const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

<SignUpModal
  isOpen={isSignUpModalOpen}
  onClose={() => setIsSignUpModalOpen(false)}
  onSwitchToSignIn={() => setIsSignInModalOpen(true)}
/>;
```

---

## 🔄 Modal Switching Logic

Both modals work together to create a seamless authentication experience:

### In Navbar

```tsx
// State management
const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

// Button triggers Sign In first
<Button onClick={() => setIsSignInModalOpen(true)}>
  Sign In
</Button>

// Modals with switching capability
<SignInModal
  isOpen={isSignInModalOpen}
  onClose={() => setIsSignInModalOpen(false)}
  onSwitchToSignUp={() => setIsSignUpModalOpen(true)}
/>
<SignUpModal
  isOpen={isSignUpModalOpen}
  onClose={() => setIsSignUpModalOpen(false)}
  onSwitchToSignIn={() => setIsSignInModalOpen(true)}
/>
```

### Switching Mechanism

**From Sign In to Sign Up:**

```tsx
// In Sign In Modal
onClick={() => {
  onClose();              // Close Sign In modal
  onSwitchToSignUp();     // Open Sign Up modal
}}
```

**From Sign Up to Sign In:**

```tsx
// In Sign Up Modal
onClick={() => {
  onClose();              // Close Sign Up modal
  onSwitchToSignIn?.();   // Open Sign In modal
}}
```

---

## 🎨 UI/UX Design

### Consistent Design Language

Both modals share identical styling:

- Same input field styles
- Same social authentication button layout
- Same color scheme (primary cyan, dark/light mode support)
- Same animations and transitions
- Same loading states
- Same icon usage (Lucide React)

### Key Differences

| Sign In                          | Sign Up                            |
| -------------------------------- | ---------------------------------- |
| Email + Password                 | Name + Email + Password            |
| "Forgot password?" link          | No forgot password                 |
| "Don't have an account? Sign Up" | "Already have an account? Sign In" |
| "Welcome Back" title             | "Create Account" title             |
| "Signing In..." loading text     | "Creating Account..." loading text |

---

## 📍 Integration Points

### 1. Navbar (`components/layout/navbar.tsx`)

- Primary entry point for authentication
- "Sign In" button triggers Sign In modal
- Both modals available with switching

### 2. Homepage (`app/page.tsx`)

- "Get Started" button triggers Sign Up modal
- Room cards now clickable for details
- Payment flow integrated

### 3. Future Integration Points

- Booking confirmation (require sign in)
- User profile/dashboard
- Booking history
- Saved favorites
- Newsletter signup

---

## 🚀 Homepage Room Cards Enhancement

### New Features

The homepage room cards now have the same functionality as the accommodation page:

**Clickable Elements:**

- ✅ Room image → Opens Room Details Modal
- ✅ Room title → Opens Room Details Modal
- ✅ "Book Now" button → Opens Payment Modal

**Flow:**

```
Homepage Room Card
    ↓
Click image/title → Room Details Modal → Book Now → Payment Modal
    ↓                                                      ↓
Book Now directly                                   Success toast
    ↓
Payment Modal
```

**Implementation:**

```tsx
// Homepage state
const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

// Handlers
const handleRoomClick = (room: Room) => {
  setSelectedRoom(room);
  setIsDetailsModalOpen(true);
};

const handleBookNow = (room: Room) => {
  setSelectedRoom(room);
  setIsPaymentModalOpen(true);
};

const handleBookFromDetails = () => {
  setIsDetailsModalOpen(false);
  setIsPaymentModalOpen(true);
};

// Room Cards
<RoomCards
  image={room.imageUrl}
  roomType={room.name}
  pricePerNight={room.price}
  onImageClick={() => handleRoomClick(room as Room)}
  onTitleClick={() => handleRoomClick(room as Room)}
  onClick={() => handleBookNow(room as Room)}
/>;
```

---

## 🔐 Security Features

### Password Handling

- Password field with visibility toggle (Eye/EyeOff icons)
- Masked by default
- Toggle shows plain text
- Icons change based on state

### Form Validation

- All fields required
- Email format validation (HTML5)
- Minimum password length (can be customized)
- Real-time validation feedback

### Social Authentication

- Secure OAuth flow (ready for implementation)
- Three providers: Google, Facebook, GitHub
- Visual feedback during auth process
- Loading states prevent double submission

---

## 📊 User Experience Flow Chart

```
┌─────────────────────────────────────────────────────────┐
│                    User Arrives                          │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
    ┌─────▼─────┐            ┌─────▼──────┐
    │ Has Account│            │ New User   │
    └─────┬─────┘            └─────┬──────┘
          │                         │
    ┌─────▼─────────┐        ┌─────▼──────────┐
    │ Click Sign In │        │ Click Get      │
    │ (Navbar)      │        │ Started (Hero) │
    └─────┬─────────┘        └─────┬──────────┘
          │                         │
    ┌─────▼─────────┐        ┌─────▼──────────┐
    │ Sign In Modal │        │ Sign Up Modal  │
    └─────┬─────────┘        └─────┬──────────┘
          │                         │
          │                   ┌─────▼──────────┐
          │                   │ Switch to      │
          │                   │ Sign In?       │
          │                   └─────┬──────────┘
          │                         │
          └─────────┬───────────────┘
                    │
              ┌─────▼──────┐
              │ Logged In  │
              └─────┬──────┘
                    │
              ┌─────▼──────┐
              │ Browse &   │
              │ Book Rooms │
              └────────────┘
```

---

## 🎯 Toast Notifications

### Sign In Messages

```tsx
// Success
showToast("Welcome back! Signed in successfully! 🎉", "success");

// Social auth success
showToast(`Signed in with ${provider} successfully!`, "success");

// Error (for future implementation)
showToast("Invalid email or password", "error");
```

### Sign Up Messages

```tsx
// Success
showToast("Account created successfully! Welcome aboard! 🎉", "success");

// Social auth success
showToast(`Signed up with ${provider} successfully!`, "success");

// Error (for future implementation)
showToast("Email already exists", "error");
```

---

## 🛠️ Future Enhancements

### 1. Backend Integration

- [ ] Connect to authentication API
- [ ] Implement JWT token management
- [ ] Add refresh token logic
- [ ] Implement secure session storage

### 2. OAuth Implementation

- [ ] Set up Google OAuth 2.0
- [ ] Set up Facebook Login
- [ ] Set up GitHub OAuth
- [ ] Add OAuth callback handlers

### 3. Password Reset Flow

- [ ] Create forgot password modal
- [ ] Email verification system
- [ ] Reset password page
- [ ] Confirmation emails

### 4. Enhanced Security

- [ ] Two-factor authentication
- [ ] Email verification requirement
- [ ] Rate limiting on login attempts
- [ ] CAPTCHA for bot prevention

### 5. User Experience

- [ ] Remember me checkbox
- [ ] Auto-fill support
- [ ] Social profile picture import
- [ ] Welcome email after signup

---

## 📝 Code Examples

### Complete Integration Example

```tsx
"use client";

import { useState } from "react";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { SignUpModal } from "@/components/ui/sign-up-modal";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <div>
      {/* Trigger Buttons */}
      <Button onClick={() => setIsSignInModalOpen(true)}>Sign In</Button>
      <Button onClick={() => setIsSignUpModalOpen(true)}>Get Started</Button>

      {/* Auth Modals */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToSignUp={() => setIsSignUpModalOpen(true)}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToSignIn={() => setIsSignInModalOpen(true)}
      />
    </div>
  );
}
```

---

## 📂 File Structure

```
components/
├── ui/
│   ├── sign-in-modal.tsx       ← NEW
│   ├── sign-up-modal.tsx       ← UPDATED
│   ├── modal.tsx               (base modal)
│   ├── toast.tsx               (notifications)
│   ├── button.tsx
│   └── ...
├── layout/
│   └── navbar.tsx              ← UPDATED
└── ...

app/
└── page.tsx                    ← UPDATED (homepage)
```

---

## ✅ Testing Checklist

### Sign In Modal

- [ ] Opens when clicking "Sign In" in navbar
- [ ] Email field validation works
- [ ] Password field validation works
- [ ] Password visibility toggle works
- [ ] Social auth buttons show loading states
- [ ] "Forgot password?" link is visible
- [ ] "Sign Up" link switches to Sign Up modal
- [ ] Form submission shows success toast
- [ ] Modal closes after successful sign in
- [ ] ESC key closes modal
- [ ] Overlay click closes modal

### Sign Up Modal

- [ ] Opens when clicking "Get Started" on homepage
- [ ] Opens when switching from Sign In modal
- [ ] Name field validation works
- [ ] Email field validation works
- [ ] Password field validation works
- [ ] Password visibility toggle works
- [ ] Social auth buttons show loading states
- [ ] "Sign In" link switches to Sign In modal
- [ ] Form submission shows success toast
- [ ] Modal closes after successful sign up
- [ ] ESC key closes modal
- [ ] Overlay click closes modal

### Homepage Room Cards

- [ ] Room image click opens Room Details Modal
- [ ] Room title click opens Room Details Modal
- [ ] "Book Now" button opens Payment Modal
- [ ] Room details display correctly
- [ ] Payment modal pre-fills room info
- [ ] Successful booking shows toast

---

## 🎉 Summary

The Silver Palm Resort website now has:

1. ✅ **Complete authentication flow**

   - Sign In modal
   - Sign Up modal
   - Seamless switching between modals

2. ✅ **Consistent UI/UX**

   - Matching design for both modals
   - Same social auth options
   - Identical styling and animations

3. ✅ **Smart integration**

   - Navbar triggers Sign In (primary action)
   - Homepage hero triggers Sign Up (new user focus)
   - Easy switching between modals

4. ✅ **Enhanced homepage**
   - Clickable room cards
   - Room details modal
   - Payment modal
   - Complete booking flow

All components are production-ready with dummy authentication. Connect to your real auth API when ready! 🚀
