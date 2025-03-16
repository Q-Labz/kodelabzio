import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001/api';

// Test data
const contactFormData = {
  email: 'test@example.com',
  name: 'Test User',
  company: 'Test Company',
  phone: '+1 555-0123',
  message: 'This is a test contact form submission.'
};

const projectInquiryData = {
  companyName: 'Tech Solutions Inc',
  industry: 'Software Development',
  contactEmail: 'projects@techsolutions.com',
  contactPhone: '+1 555-0124',
  preferredContact: 'email',
  projectDescription: 'Building a new e-commerce platform',
  budgetMin: 50000,
  budgetMax: 100000,
  targetDate: '2025-06-01',
  techStack: ['React', 'Node.js', 'PostgreSQL']
};

const onboardingData = {
  clientInfo: {
    companyName: 'Digital Ventures',
    industry: 'Digital Marketing',
    email: 'info@digitalventures.com',
    phone: '+1 555-0125',
    preferredContact: 'email'
  },
  projectScope: {
    categories: ['Web Development', 'Digital Marketing'],
    description: 'Building a digital marketing platform',
    budget: {
      min: 75000,
      max: 150000
    },
    techStack: ['React', 'TypeScript', 'Node.js']
  },
  businessRequirements: {
    goals: ['Increase user engagement', 'Improve conversion rates'],
    targetAudience: 'Small to medium-sized businesses',
    successMetrics: ['User engagement', 'Conversion rate', 'ROI']
  },
  technicalSpecs: {
    platforms: 'Web and Mobile',
    integrations: ['CRM', 'Analytics', 'Payment Gateway'],
    security: 'Enterprise-grade security with 2FA',
    scale: 'Support for up to 100,000 concurrent users'
  }
};

async function testSubmissions() {
  try {
    // Test contact form submission
    console.log('\nTesting contact form submission...');
    const contactResponse = await fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactFormData)
    });
    console.log('Contact form response:', await contactResponse.json());

    // Test project inquiry submission
    console.log('\nTesting project inquiry submission...');
    const inquiryResponse = await fetch(`${API_URL}/project-inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectInquiryData)
    });
    console.log('Project inquiry response:', await inquiryResponse.json());

    // Test onboarding data submission
    console.log('\nTesting onboarding data submission...');
    const onboardingResponse = await fetch(`${API_URL}/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(onboardingData)
    });
    console.log('Onboarding response:', await onboardingResponse.json());

  } catch (error) {
    console.error('Error during test:', error);
  }
}

testSubmissions();
