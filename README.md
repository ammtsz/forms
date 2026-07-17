![Static Badge](https://img.shields.io/badge/pnpm-v7.0.0-red)
![Static Badge](https://img.shields.io/badge/next.js-v13.4.12-green)
![Static Badge](https://img.shields.io/badge/typescript-v5.1.6-blue)
![Static Badge](https://img.shields.io/badge/lerna-v7.1.0-yellow)
---

# Form Platform

> 📌 **Portfolio Project (2023)** - A full-stack learning project demonstrating modern web development with Next.js, Firebase, and monorepo architecture. This project showcases form builder functionality with AI-assisted creation, real-time data management, and internationalization.

This platform provides an easy-to-use interface for creating and managing forms. Users can create forms with help of OpenAI, edit them, and view responses in a customizable table.

## Features
- **User Login:** Users can log in to access their forms and responses;
- **Form Creation:** Create forms with ease, with the option to use OpenAI for assistance;
- **Form Editing:** Make changes to your forms at any time, but with restrictions if the form has already been answered;
- **Response Viewing:** View form responses in a customizable table on a separate page;
- **Form Sharing:** Share a link to your form with others;
- **Language Support:** Switch between English and Portuguese (Brazil) languages on the admin page.

![admin-en](https://github.com/ammtsz/forms/assets/66788932/7d636c0b-9d0f-4a80-acb6-a7bd2fe959b9)

## Technical Highlights
- **Custom Drag-and-Drop Form Builder** using @dnd-kit for intuitive field reordering
- **Real-time Form Validation** with dependent field logic and conditional rendering
- **AI-Assisted Form Generation** integrated with OpenAI API for automated field creation
- **Internationalization (i18n)** with dynamic language switching between English and Portuguese
- **Zustand State Management** for lightweight and scalable application state
- **Monorepo Architecture** using Lerna powered by Nx for efficient multi-package management
- **Customizable Data Tables** using react-base-table for response visualization

## Tech Stack

- **Next.js 13** (App Router) - Server-side rendering and routing
- **TypeScript** - Type safety across the monorepo
- **Firebase/Firestore** - Real-time database and authentication
- **OpenAI API** - AI-assisted form generation
- **Chakra-UI + Tailwind CSS** - Component library and utility styling
- **Zustand** - Lightweight state management
- **i18next** - English/Portuguese internationalization
- **Lerna + Nx** - Monorepo orchestration
- **Next-Auth** - Google OAuth authentication

## Architecture

Monorepo structure with two Next.js applications and shared packages:

- **`packages/apps/admin`** - Form builder and management dashboard (port 3000)
  - Create/edit forms with drag-and-drop interface
  - AI-assisted field generation
  - View and manage form responses in customizable tables
  
- **`packages/apps/submission`** - Public form submission interface (port 3001)
  - Dynamic form rendering based on form ID
  - Real-time validation and conditional field logic
  
- **`packages/commons`** - Shared TypeScript types and utility functions
- **`packages/configs`** - Shared ESLint, TypeScript, and test configurations

## Demo

### AI-Assisted Form Creation

![ai_demo](https://github.com/ammtsz/forms/assets/66788932/c51a6103-a271-4031-b077-b7c273a501d2)

*Note: OpenAI API usage was limited to free tier (3 requests/minute, 10 second timeout)*

### Form Submission Interface

![response](https://github.com/ammtsz/forms/assets/66788932/724abd47-ea75-4c44-a4dc-8073813633ed)

## Getting Started

### Prerequisites
- Node.js (v16+)
- pnpm (v7.0.0)
- Firebase project
- Google OAuth credentials
- (Optional) OpenAI API key for AI features

### Environment Setup

1. Clone the repository to your local machine
2. Install the dependencies: `pnpm install`
3. Copy `.env.example` to `.env` in the root directory
4. Configure the following environment variables:

**Required:**
- `GOOGLE_ID` and `GOOGLE_CLIENT_SECRET` - Get from [Google Cloud Console](https://console.cloud.google.com/)
- `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID` - Get from [Firebase Console](https://console.firebase.google.com/)
- `NEXTAUTH_URL` - Your application URL (e.g., `http://localhost:3000` for local development)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXT_PUBLIC_FORMS_URL` - Submission app URL (e.g., `http://localhost:3001` for local development)

**Optional:**
- `OPENAI_API_KEY` - Get from [OpenAI Platform](https://platform.openai.com/) (AI features will be disabled if not provided)

### Running the Application

1. Run `pnpm dev` to start the development server for both applications
   - **Admin App** will run on `http://localhost:3000`
   - **Submission App** will run on `http://localhost:3001`
   
   Alternatively:
   - Run `pnpm dev:admin` to start only the Admin application on port `3000`
   - Run `pnpm dev:submission` to start only the Submission application on port `3001`

2. Run `pnpm commit` to commit changes (uses Commitizen for conventional commits)
3. To build the applications for production, run `pnpm build`

## License

MIT License - Feel free to use this for learning purposes.   
