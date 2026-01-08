# How to Run IKYKIK Mobile App

## Prerequisites
1. Android Studio installed with an emulator OR physical Android device connected via USB
2. Node.js installed

## Steps to Run:

### 1. Start Metro Bundler (React Native development server)
```bash
cd c:\Users\Yadhu Gowda\OneDrive\Desktop\todolist\mobile-app
npm start
```
This will open Metro Bundler in your terminal.

### 2. Run on Android (in a NEW terminal window)
```bash
cd c:\Users\Yadhu Gowda\OneDrive\Desktop\todolist\mobile-app
npm run android
```

This will:
- Build the Android app
- Install it on your emulator/device
- Open the IKYKIK app

## What You'll See:

The app will open and show the **LoginScreen** with:
- "IKYKIK" branding at the top
- Glass-effect email input field
- Glass-effect password input field
- Blue login button
- "Don't have an account? Sign up" text at bottom

The design will use:
- Light gray background (if your phone is in light mode)
- Dark gray background (if your phone is in dark mode)
- Translucent glass effects on all UI elements

## Note:
The login functionality won't work yet because we need to:
1. Connect the mobile app to the backend API
2. Add Redux state management
3. Add navigation to other screens

Right now you can only SEE the login screen design!
