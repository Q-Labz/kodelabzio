import { z } from 'zod';

export const formSchemas = {
  clientInfo: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().min(2, 'Company name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    industry: z.string().min(2, 'Industry is required'),
    projectName: z.string().min(2, 'Project name is required')
  }),

  designPreferences: z.object({
    style: z.string().min(2, 'Style preference is required'),
    colorScheme: z.string().min(2, 'Color scheme is required'),
    inspiration: z.array(z.string()).min(1, 'At least one inspiration is required'),
    brandGuidelines: z.any().optional()
  }),

  technicalRequirements: z.object({
    platform: z.array(z.string()).min(1, 'At least one platform is required'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    integrations: z.array(z.string()).optional(),
    security: z.array(z.string()).optional()
  }),

  projectScope: z.object({
    timeline: z.string().min(2, 'Timeline is required'),
    budget: z.string().min(2, 'Budget is required'),
    team: z.string().min(2, 'Team size is required'),
    milestones: z.array(z.string()).min(1, 'At least one milestone is required')
  })
};