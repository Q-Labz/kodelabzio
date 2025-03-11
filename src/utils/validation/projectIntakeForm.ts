import { z } from 'zod';
import type { ProjectIntakeFormData } from '../../types/forms';

const basicInfoSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactRole: z.string().min(1, 'Contact role is required'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
  preferredContact: z.enum(['email', 'phone']),
  startDate: z.date().nullable(),
  endDate: z.date().nullable()
});

const projectOverviewSchema = z.object({
  objective: z.string().min(1, 'Project objective is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  deliverables: z.array(z.string()).min(1, 'At least one deliverable is required'),
  budgetRange: z.string().min(1, 'Budget range is required'),
  existingMaterials: z.array(z.string())
});

const technicalRequirementsSchema = z.object({
  platforms: z.array(z.string()).min(1, 'At least one platform is required'),
  integrations: z.array(z.string()),
  security: z.array(z.string()),
  performance: z.string().min(1, 'Performance requirements are required'),
  responsive: z.boolean()
});

const designPreferencesSchema = z.object({
  brandGuidelines: z.any(),
  colorPreferences: z.string(),
  designExamples: z.array(z.string()),
  keyFeatures: z.array(z.string()).min(1, 'At least one key feature is required'),
  userFlows: z.array(z.string())
});

const successMetricsSchema = z.object({
  criteria: z.array(z.string()).min(1, 'At least one success criterion is required'),
  kpis: z.array(z.string()).min(1, 'At least one KPI is required'),
  outcomes: z.array(z.string()).min(1, 'At least one expected outcome is required'),
  supportNeeds: z.string(),
  additionalNotes: z.string()
});

export const validateProjectIntakeForm = (
  data: ProjectIntakeFormData,
  step: number
): Record<string, string> => {
  try {
    switch (step) {
      case 1:
        basicInfoSchema.parse(data.basicInfo);
        break;
      case 2:
        projectOverviewSchema.parse(data.overview);
        break;
      case 3:
        technicalRequirementsSchema.parse(data.technical);
        break;
      case 4:
        designPreferencesSchema.parse(data.design);
        break;
      case 5:
        successMetricsSchema.parse(data.success);
        break;
    }
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        errors[err.path.join('.')] = err.message;
      });
      return errors;
    }
    return {};
  }
};