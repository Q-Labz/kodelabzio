import express from 'express';
import { sql } from '../db.js';

const router = express.Router();

// Create a new lead
router.post('/', async (req, res) => {
  try {
    const { email, name, company, phone, message } = req.body;
    
    const result = await sql`
      INSERT INTO leads (email, name, company, phone, message)
      VALUES (${email}, ${name}, ${company}, ${phone}, ${message})
      RETURNING id
    `;
    
    res.status(201).json({ id: result[0].id, message: 'Lead created successfully' });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

export default router;
