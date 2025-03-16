import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './db.js';
import leadsRouter from './api/leads.js';
import projectInquiriesRouter from './api/project-inquiries.js';
import onboardingRouter from './api/onboarding.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize routes
app.use('/api/leads', leadsRouter);
app.use('/api/project-inquiries', projectInquiriesRouter);
app.use('/api/onboarding', onboardingRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const port = process.env.PORT || 3001;

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
