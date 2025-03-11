export const INDUSTRY_OPTIONS = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'nonprofit', label: 'Non-Profit' }
];

export const PROJECT_CATEGORIES = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'enterprise', label: 'Enterprise Solutions' },
  { value: 'ai', label: 'AI & Machine Learning' },
  { value: 'blockchain', label: 'Blockchain' },
  { value: 'iot', label: 'Internet of Things' },
  { value: 'ar_vr', label: 'AR/VR' }
];

export const TECH_STACK_OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'dotnet', label: '.NET' },
  { value: 'php', label: 'PHP' }
];

export const SECURITY_COMPLIANCE = [
  { value: 'gdpr', label: 'GDPR' },
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'pci', label: 'PCI DSS' },
  { value: 'sox', label: 'SOX' },
  { value: 'iso27001', label: 'ISO 27001' }
];

export const BUDGET_RANGES = [
  { min: 10000, max: 25000, label: '$10k - $25k' },
  { min: 25000, max: 50000, label: '$25k - $50k' },
  { min: 50000, max: 100000, label: '$50k - $100k' },
  { min: 100000, max: 250000, label: '$100k - $250k' },
  { min: 250000, max: 500000, label: '$250k - $500k' },
  { min: 500000, max: null, label: '$500k+' }
];

export const INITIAL_ONBOARDING_DATA: OnboardingData = {
  clientInfo: {
    companyName: '',
    industry: '',
    email: '',
    phone: '',
    preferredContact: 'email'
  },
  projectScope: {
    categories: [],
    description: '',
    targetDate: null,
    budget: {
      min: 10000,
      max: 25000
    },
    techStack: []
  },
  businessRequirements: {
    goals: [],
    targetAudience: {
      demographics: [],
      behaviors: [],
      needs: []
    },
    successMetrics: [],
    competitors: []
  },
  technicalSpecs: {
    platforms: {},
    integrations: [],
    security: {
      compliance: [],
      authentication: [],
      dataProtection: []
    },
    scale: {
      users: 0,
      storage: 0,
      bandwidth: 0
    }
  },
  progress: 0
};

export const STEPS: StepConfig[] = [
  {
    id: 1,
    title: 'Client Information',
    description: 'Basic company and contact details',
    isComplete: false
  },
  {
    id: 2,
    title: 'Project Scope',
    description: 'Project requirements and timeline',
    isComplete: false
  },
  {
    id: 3,
    title: 'Business Requirements',
    description: 'Goals and success metrics',
    isComplete: false
  },
  {
    id: 4,
    title: 'Technical Specifications',
    description: 'Platform and integration details',
    isComplete: false
  }
];