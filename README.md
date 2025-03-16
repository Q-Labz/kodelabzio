# KodeLabz Website

A modern web application built with React, TypeScript, and Vite, featuring a beautiful UI and seamless user experience.

## Tech Stack

- Frontend:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Framer Motion
  - React Query

- Backend:
  - Node.js
  - Express
  - PostgreSQL (Neon)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and update with your values
   - Copy `server/.env.example` to `server/.env` and update with your values

4. Start the development servers:
   ```bash
   npm run start
   ```
   This will start both the frontend and backend servers concurrently.

## Deployment

### Frontend (Netlify)

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: Add all required variables from `.env`

### Backend (Your preferred hosting)

1. Set up your Node.js hosting environment
2. Configure environment variables from `server/.env`
3. Deploy the server directory
4. Update `VITE_API_URL` in your frontend environment to point to your deployed API

## Development

- Frontend runs on `http://localhost:5173` (or next available port)
- Backend API runs on `http://localhost:3001`
- Database uses Neon PostgreSQL

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
