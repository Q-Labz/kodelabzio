export const steps = [
  {
    id: 1,
    title: 'Welcome',
    description: 'Choose your service'
  },
  {
    id: 2,
    title: 'Project Scope',
    description: 'Define requirements'
  },
  {
    id: 3,
    title: 'Budget & Timeline',
    description: 'Set expectations'
  },
  {
    id: 4,
    title: 'Business Goals',
    description: 'Define objectives'
  },
  {
    id: 5,
    title: 'Contact Info',
    description: 'Your details'
  }
];

export const serviceOptions = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications',
    features: [
      'Responsive Design',
      'Custom Features',
      'CMS Integration',
      'E-commerce Solutions'
    ]
  },
  {
    id: 'it-services',
    title: 'IT Services',
    description: 'Comprehensive IT solutions and support',
    features: [
      'Network Setup',
      'Cloud Solutions',
      'Security Services',
      'IT Consulting'
    ]
  }
];

export const budgetRanges = [
  { value: '10-25k', label: '$10,000 - $25,000' },
  { value: '25-50k', label: '$25,000 - $50,000' },
  { value: '50-100k', label: '$50,000 - $100,000' },
  { value: '100k+', label: '$100,000+' }
];

export const timelineOptions = [
  { value: '1-2', label: '1-2 months' },
  { value: '3-4', label: '3-4 months' },
  { value: '5-6', label: '5-6 months' },
  { value: '6+', label: '6+ months' }
];