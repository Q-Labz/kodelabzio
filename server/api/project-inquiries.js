import express from 'express';
import { sql } from '../db.js';

const router = express.Router();

// Create a new project inquiry
router.post('/', async (req, res) => {
  try {
    const {
      companyName,
      industry,
      contactEmail,
      contactPhone,
      preferredContact,
      projectDescription,
      budgetMin,
      budgetMax,
      targetDate,
      techStack
    } = req.body;
    
    const result = await sql`
      INSERT INTO project_inquiries (
        company_name,
        industry,
        contact_email,
        contact_phone,
        preferred_contact,
        project_description,
        budget_min,
        budget_max,
        target_date,
        tech_stack
      )
      VALUES (
        ${companyName},
        ${industry},
        ${contactEmail},
        ${contactPhone},
        ${preferredContact},
        ${projectDescription},
        ${budgetMin},
        ${budgetMax},
        ${targetDate},
        ${techStack}
      )
      RETURNING id
    `;
    
    res.status(201).json({ id: result[0].id, message: 'Project inquiry created successfully' });
  } catch (error) {
    console.error('Error creating project inquiry:', error);
    res.status(500).json({ error: 'Failed to create project inquiry' });
  }
});

export default router;
