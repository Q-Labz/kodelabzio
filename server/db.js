import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.NEON_DATABASE_URL);

// Database schema initialization
const initializeDatabase = async () => {
  try {
    // Create leads table
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        company VARCHAR(255),
        phone VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create project_inquiries table
    await sql`
      CREATE TABLE IF NOT EXISTS project_inquiries (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        industry VARCHAR(255),
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(50),
        preferred_contact VARCHAR(50),
        project_description TEXT,
        budget_min INTEGER,
        budget_max INTEGER,
        target_date DATE,
        tech_stack TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create onboarding_data table
    await sql`
      CREATE TABLE IF NOT EXISTS onboarding_data (
        id SERIAL PRIMARY KEY,
        client_info JSONB NOT NULL,
        project_scope JSONB NOT NULL,
        business_requirements JSONB,
        technical_specs JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export { sql, initializeDatabase };
