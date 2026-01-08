# IKYKIK - Advanced Task Management & App Blocker System 🚀

**IKYKIK** ( "I Know You Know I Know" ) is a comprehensive productivity ecosystem designed to help users manage tasks and eliminate distractions. It combines a robust task management app with a native Android app blocker that enforces focus during work sessions.

---

## 🏗️ Project Architecture

This project is structured as a **monorepo** containing three main components:

### 1. `ikykik-expo` (The Active Mobile App)
*   **Tech Stack:** React Native (Expo), JavaScript.
*   **Key Features:**
    *   **Focus-First Task Manager:** Create tasks with priorities, deadlines, and tags.
    *   **Native App Blocking:** Uses `Kotlin` native modules to lock distracting apps (Instagram, YouTube, etc.) while a task is active.
    *   **30-Minute Check:** Enforces a dedicated blocking overlay after 30 minutes of usage on restricted apps.
    *   **Calendar View:** Visual month-grid to see tasks by date.
    *   **Analytics:** Visual charts for task completion and app usage.
    *   **Gamification:** Profile levels, badges, and streaks.

### 2. `backend` (Microservices)
*   **Tech Stack:** Node.js, NestJS/Express, MongoDB, Docker.
*   **Services:**
    *   `auth-service`: JWT authentication & user management.
    *   `task-service`: CRUD operations for tasks (synced with mobile).
    *   `analytics-service`: Process usage data.
    *   `reward-service`: Manage gamification logic.
    *   `notification-service`: Push notification handling.

### 3. `mobile-app` (TypeScript Backup)
*   An alternative/backup version of the mobile application written in **TypeScript**.
*   Contains reusable UI components like `GlassCard`, `GlassButton` (Glassmorphism design system).

---

## 🌟 Key Features

### 📅 Calendar View (New!)
*   Toggle between **List** and **Calendar** views.
*   Interactive month navigation.
*   Visual indicators (dots) for days with tasks.
*   Select a date to see its specific agenda.

### 🔒 Native App Blocking (Android)
*   **How it works:** We built a custom Native Module (`AppBlockerModule.kt`) that bridges JavaScript to Android's `UsageStatsManager`.
*   **Overlay Service:** A native Foreground Service (`BlockingOverlayService.kt`) runs continuously to monitor app usage. If you open a blocked app (e.g., Instagram) during a focus session, a system-level overlay blocks the screen.

### 🎨 Glassmorphism UI
*   The entire app follows a premium "Dark Glass" aesthetic.
*   Components use blur effects, gradients, and translucency.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Docker Desktop (for Backend)
*   Android Studio (for Native Modules)

### 1. Run the Mobile App (ikykik-expo)
```bash
cd ikykik-expo
npm install
npx expo prebuild   # Generates android/ folder
npx expo run:android
```

### 2. Run the Backend
```bash
cd backend
docker-compose up --build
```

---

## 📁 Repository Structure

```
├── ikykik-expo/           # MAIN React Native App (JS + Native Modules)
│   ├── android/           # Native Android code (Kotlin)
│   ├── src/
│   │   ├── native/        # JS Bridge to Native Modules
│   │   ├── screens/       # UI Screens (Tasks, Calendar, Rewards)
│   │   ├── components/    # Reusable UI (GlassView, TaskCard)
│   │   └── services/      # API & Auth logic
│
├── mobile-app/            # TypeScript version (Backup/Reference)
│   ├── src/
│       ├── components/ui  # Glass UI System (TSX)
│
└── backend/               # Microservices (Dockerized)
    ├── auth-service
    ├── task-service
    └── docker-compose.yml
```

---
**Developed by Yadhu Gowda**
