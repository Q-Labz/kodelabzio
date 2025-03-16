import { Pool } from 'pg';

// Initialize the connection pool using the environment variable
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon.tech connections
  }
});

// Test the connection
pool.connect()
  .then(() => console.log('Successfully connected to Neon PostgreSQL database'))
  .catch(err => console.error('Error connecting to database:', err));

// Export a function to get a client from the pool
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Export a function to execute queries directly
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

// Export the pool for direct access if needed
export default pool;
