import express from 'express';
import { sql } from '../db.js';

const router = express.Router();

// Create new onboarding data
router.post('/', async (req, res) => {
  try {
    const { clientInfo, projectScope, businessRequirements, technicalSpecs } = req.body;
    
    const result = await sql`
      INSERT INTO onboarding_data (
        client_info,
        project_scope,
        business_requirements,
        technical_specs
      )
      VALUES (
        ${JSON.stringify(clientInfo)},
        ${JSON.stringify(projectScope)},
        ${JSON.stringify(businessRequirements)},
        ${JSON.stringify(technicalSpecs)}
      )
      RETURNING id
    `;
    
    res.status(201).json({ id: result[0].id, message: 'Onboarding data saved successfully' });
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    res.status(500).json({ error: 'Failed to save onboarding data' });
  }
});

// Update existing onboarding data
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { clientInfo, projectScope, businessRequirements, technicalSpecs } = req.body;
    
    await sql`
      UPDATE onboarding_data
      SET 
        client_info = ${JSON.stringify(clientInfo)},
        project_scope = ${JSON.stringify(projectScope)},
        business_requirements = ${JSON.stringify(businessRequirements)},
        technical_specs = ${JSON.stringify(technicalSpecs)},
        last_updated = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
    
    res.json({ message: 'Onboarding data updated successfully' });
  } catch (error) {
    console.error('Error updating onboarding data:', error);
    res.status(500).json({ error: 'Failed to update onboarding data' });
  }
});

export default router;
