import { z } from 'zod';

export const formSchemas = {
  clientInfo: z.object({
    companyName: z.string().min(2, 'Company name is required'),
    industry: z.string().min(2, 'Industry is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    preferredContact: z.enum(['email', 'phone', 'messaging'], {
      errorMap: () => ({ message: 'Please select a preferred contact method' })
    })
  }),

  projectScope: z.object({
    categories: z.array(z.string()).min(1, 'At least one category is required'),
    description: z.string().min(10, 'Please provide a detailed project description'),
    targetDate: z.date().nullable(),
    budget: z.object({
      min: z.number().min(0, 'Minimum budget must be positive'),
      max: z.number().min(0, 'Maximum budget must be positive')
    }).refine(data => data.max > data.min, {
      message: 'Maximum budget must be greater than minimum budget',
      path: ['max']
    }),
    techStack: z.array(z.string()).min(1, 'At least one technology is required')
  }),

  businessRequirements: z.object({
    goals: z.array(z.object({
      id: z.string(),
      text: z.string().min(5, 'Please provide a detailed goal'),
      priority: z.number().min(1).max(5)
    })).min(1, 'At least one goal is required'),
    targetAudience: z.object({
      demographics: z.array(z.string()).min(1, 'At least one demographic is required'),
      behaviors: z.array(z.string()).min(1, 'At least one behavior is required'),
      needs: z.array(z.string()).min(1, 'At least one need is required')
    }),
    successMetrics: z.array(z.string()).min(1, 'At least one success metric is required'),
    competitors: z.array(z.object({
      name: z.string().min(2, 'Competitor name is required'),
      strengths: z.array(z.string()).min(1, 'At least one strength is required'),
      weaknesses: z.array(z.string()).min(1, 'At least one weakness is required')
    }))
  }),

  technicalSpecs: z.object({
    platforms: z.object({
      web: z.boolean(),
      ios: z.boolean(),
      android: z.boolean(),
      desktop: z.boolean()
    }).refine(data => Object.values(data).some(v => v), {
      message: 'At least one platform must be selected'
    }),
    integrations: z.array(z.object({
      name: z.string().min(2, 'Integration name is required'),
      type: z.string().min(2, 'Integration type is required'),
      priority: z.enum(['high', 'medium', 'low'], {
        errorMap: () => ({ message: 'Please select a priority level' })
      })
    })),
    security: z.object({
      compliance: z.array(z.string()),
      authentication: z.array(z.string()).min(1, 'At least one authentication method is required'),
      dataProtection: z.array(z.string()).min(1, 'At least one data protection measure is required')
    }),
    scale: z.object({
      users: z.number().min(0, 'Expected users must be positive'),
      storage: z.number().min(0, 'Storage requirement must be positive'),
      bandwidth: z.number().min(0, 'Bandwidth requirement must be positive')
    })
  })
};