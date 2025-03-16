import { readFileSync } from 'fs';
import { join } from 'path';
import { query } from '../lib/db';

const initializeDatabase = async () => {
  try {
    // Read the schema file
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    // Execute the schema
    await query(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    process.exit(1);
  }
};

// Run the initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}
