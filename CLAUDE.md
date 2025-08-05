# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Temu-inspired e-commerce web application for Algeria built with React.js and Vite. The application serves three user roles: Admin, Seller, and Customer, with integrated advertisements for revenue generation.

## Development Commands

- `npm run dev` - Start development server with hot module replacement (runs on http://localhost:5173 or next available port)
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint code linting
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Frontend**: React.js 19.1.0 with Vite 7.0.4 for fast development and building
- **State Management**: Redux Toolkit with React-Redux for role-based state management
- **Routing**: React Router DOM v7 with protected routes and role-based navigation
- **UI Framework**: Material-UI (MUI) v7 with emotion for styling and theming
- **Build Tool**: Vite with React plugin for fast development and optimized builds

### Project Structure
```
src/
├── components/
│   ├── common/           # Reusable components (ProtectedRoute, LoadingSpinner, etc.)
│   └── layout/           # Layout components (Header, Sidebar, Footer, Layout)
├── pages/
│   ├── auth/            # Authentication pages (Login, Register)
│   ├── customer/        # Customer-specific pages (Shop, Cart, Profile)
│   ├── seller/          # Seller-specific pages (Dashboard, Products, Orders)
│   └── admin/           # Admin-specific pages (Dashboard, Users, Ads)
├── store/
│   └── slices/          # Redux slices (auth, ui)
├── hooks/               # Custom React hooks (useAuth)
├── constants/           # App constants (routes, user roles, navigation)
├── services/            # API services (planned)
└── utils/               # Utility functions (planned)
```

### Key Features Implemented
1. **Role-Based Authentication**: Mock authentication system with Admin, Seller, Customer roles
2. **Protected Routes**: Route protection based on user roles and authentication status
3. **Redux State Management**: Centralized state for auth, UI preferences, and app data
4. **Material-UI Integration**: Complete UI framework with theming and dark mode support
5. **Responsive Layout**: Adaptive sidebar, header, and main content areas
6. **Navigation System**: Role-specific navigation with Material-UI icons

### Authentication Flow
- Mock authentication system in `useAuth` hook
- Login with email, password, and role selection
- Protected routes redirect unauthenticated users to login
- Role-based redirects after successful authentication:
  - Admin → `/admin` (Admin Dashboard)
  - Seller → `/seller` (Seller Dashboard) 
  - Customer → `/shop` (Shop Page)

### State Management
- **Auth Slice**: User authentication, role management, loading states
- **UI Slice**: Sidebar state, dark mode, language preferences, notifications

### Component Architecture
- **Layout System**: Conditional rendering based on authentication status
- **Protected Routes**: HOC for route-level access control
- **Role-Based Components**: Conditional rendering based on user roles
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks

### Development Context
- Target market: Algerian urban youth (18-35)
- Bilingual support planned: Arabic/French UI with RTL layout
- Payment integration planned: Local gateways (CIB, Satim, EDAHABIA) + international options
- Current state: Fully functional scaffolding with navigation, authentication, and role-based access

## Testing the Application

1. Start dev server: `npm run dev`
2. Navigate to the application URL
3. Test authentication flow:
   - Try different roles (Customer, Seller, Admin)
   - Verify protected routes and role-based navigation
   - Test sidebar navigation and header functionality
4. All components are connected and functional with proper state management