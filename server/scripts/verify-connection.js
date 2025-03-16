import { sql, initializeDatabase } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

async function verifyConnection() {
  try {
    // Test the connection
    const result = await sql`SELECT version()`;
    console.log('✅ Successfully connected to Neon database');
    console.log('PostgreSQL version:', result[0].version);

    // Initialize database tables
    await initializeDatabase();
    console.log('✅ Database tables initialized successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

verifyConnection();
