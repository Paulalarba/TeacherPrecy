# 🦁 Teacher Precy - Professional Portfolio & FSL Academy

A sophisticated digital presence for **Teacher Precy Alarba**, specializing in Special Education (SPED) and Filipino Sign Language (FSL) interpretation. This platform serves as both a professional portfolio and an interactive learning hub for students to master FSL.

## 🌟 Overview

This project is designed to bridge the communication gap for the Deaf community and provide inclusive educational resources. It features a high-end "Editorial" design aesthetic that transitions into a "Studio" (Dark Mode) environment, reflecting the dual nature of academic teaching and professional artistic interpretation.

### Key Features
- **FSL Academy:** An interactive course platform with YouTube-integrated lessons, custom transcriptions, and knowledge-check quizzes.
- **Student Dashboard:** A private portal where students can track their course progress, view upcoming mentorship sessions, and access shared resources.
- **Booking System:** A seamless interface for scheduling one-on-one FSL coaching and SPED consulting.
- **Professional Portfolio:** A showcase of expertise in courtroom interpreting, inclusive pedagogy, and song interpretation.
- **Adaptive UI:** A fully responsive design that works across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React 18+**: Core UI framework.
- **TypeScript**: Strong typing for robust and maintainable code.
- **Vite**: Ultra-fast build tool and development server.
- **React Router DOM**: For seamless client-side navigation.
- **Lucide React**: For a consistent, clean iconography system.
- **CSS3 (Modern)**: Utilizing CSS Variables, `oklch` color spaces for high-fidelity themes, and `clamp()` for fluid typography.

### Backend & Infrastructure
- **Firebase Firestore**: Real-time NoSQL database for managing student bookings and course data.
- **Firebase Authentication**: Secure user onboarding and session management.
- **Vercel**: Continuous deployment and hosting for high performance and global availability.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd TeacherPrecy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   # ... add other required firebase keys
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure
- `src/components`: Reusable UI components (Navigation, Dashboard, CourseView, etc.)
- `src/data.ts`: Centralized content management for the Academy and Portfolio.
- `src/firebase.ts`: Firebase configuration and initialization.
- `public/`: Static assets and branding.
- `index.css`: Global design system and theme variables.

---
*Designed and developed to empower the Deaf community and promote inclusive education.*
