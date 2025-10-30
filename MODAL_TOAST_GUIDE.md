# Modal & Toast Components - Usage Guide

## 🎯 Components Added

### 1. Modal Component (`components/ui/modal.tsx`)

A reusable, accessible modal component with animations.

**Features:**

- ✅ Dismissable with overlay click
- ✅ Close with ESC key
- ✅ Close icon button
- ✅ Prevents body scroll when open
- ✅ Smooth animations with framer-motion
- ✅ Backdrop blur effect

**Usage:**

```tsx
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        showCloseButton={true}
      >
        <p>Your content here</p>
      </Modal>
    </>
  );
}
```

### 2. Toast Component (`components/ui/toast.tsx`)

A notification system with multiple types and auto-dismiss.

**Features:**

- ✅ 4 types: success, error, warning, info
- ✅ Auto-dismiss with custom duration
- ✅ Manual dismiss with X button
- ✅ Stacked notifications
- ✅ Smooth animations
- ✅ Accessible

**Usage:**

```tsx
"use client";
import { useToast } from "@/components/ui/toast";

function MyComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast("Success message!", "success", 5000);
    // showToast("Error message!", "error");
    // showToast("Warning message!", "warning");
    // showToast("Info message!", "info");
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

**Toast Provider Setup:**
Already added to `app/layout.tsx` - wraps the entire app.

### 3. Sign Up Modal (`components/ui/sign-up-modal.tsx`)

Complete sign-up modal with social authentication options.

**Features:**

- ✅ Email/password signup form
- ✅ Social auth buttons (Google, Facebook, GitHub)
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Loading states
- ✅ Toast notifications on success
- ✅ "Already have account?" link

**Usage:**

```tsx
import { SignUpModal } from "@/components/ui/sign-up-modal";
import { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Sign Up</button>

      <SignUpModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

## 🚀 Implementation

### Homepage "Get Started" Button

The main "Get Started" button on the homepage now opens the Sign Up modal.

### How to Add to Other Pages

```tsx
"use client";
import { useState } from "react";
import { SignUpModal } from "@/components/ui/sign-up-modal";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsSignUpModalOpen(true)}>Sign Up</Button>

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      />
    </>
  );
}
```

## 🎨 Styling

All components use your existing design system:

- CSS variables for colors (`--bg-shade`, `--major-text`, etc.)
- Consistent border radius and spacing
- Responsive design
- Dark/Light mode support
- Framer Motion animations

## 📝 Notes

- **Toast Provider** is already added to `app/layout.tsx`
- **Modal** handles ESC key and outside clicks automatically
- **Sign Up Modal** includes simulated API calls (replace with real auth)
- Social auth buttons are ready for integration with OAuth providers

## 🔧 Next Steps

To integrate real authentication:

1. Set up OAuth providers (Google, Facebook, GitHub)
2. Replace the simulated API calls in `sign-up-modal.tsx`
3. Add actual authentication logic
4. Connect to your backend API
