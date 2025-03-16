import { sql } from '../db.js';

async function verifyData() {
  try {
    console.log('\nQuerying leads table:');
    const leads = await sql`SELECT * FROM leads`;
    console.log(JSON.stringify(leads, null, 2));

    console.log('\nQuerying project_inquiries table:');
    const inquiries = await sql`SELECT * FROM project_inquiries`;
    console.log(JSON.stringify(inquiries, null, 2));

    console.log('\nQuerying onboarding_data table:');
    const onboarding = await sql`SELECT * FROM onboarding_data`;
    console.log(JSON.stringify(onboarding, null, 2));

  } catch (error) {
    console.error('Error querying database:', error);
  }
}

verifyData();
