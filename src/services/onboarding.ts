import { OnboardingData } from '../types/onboarding';
import { query } from '../lib/db';

export const saveOnboardingData = async (data: OnboardingData) => {
  const {
    projectScope,
    businessGoals,
    technicalSpecs,
    contactInfo
  } = data;

  try {
    // Start a transaction
    await query('BEGIN');

    // Insert project data
    const projectResult = await query(
      `INSERT INTO projects (
        categories,
        description,
        tech_stack,
        created_at
      ) VALUES ($1, $2, $3, NOW()) RETURNING id`,
      [
        projectScope.categories,
        projectScope.description,
        projectScope.techStack
      ]
    );

    const projectId = projectResult.rows[0].id;

    // Insert business goals
    await query(
      `INSERT INTO business_goals (
        project_id,
        goals,
        target_audience,
        success_criteria,
        competitors
      ) VALUES ($1, $2, $3, $4, $5)`,
      [
        projectId,
        businessGoals.goals,
        businessGoals.targetAudience,
        businessGoals.successCriteria,
        businessGoals.competitors
      ]
    );

    // Insert technical specs
    await query(
      `INSERT INTO technical_specs (
        project_id,
        platforms,
        integrations,
        security_compliance,
        security_authentication,
        security_data_protection,
        scale_users,
        scale_storage,
        scale_bandwidth
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        projectId,
        technicalSpecs.platforms,
        technicalSpecs.integrations,
        technicalSpecs.security.compliance,
        technicalSpecs.security.authentication,
        technicalSpecs.security.dataProtection,
        technicalSpecs.scale.users,
        technicalSpecs.scale.storage,
        technicalSpecs.scale.bandwidth
      ]
    );

    // Insert contact info
    await query(
      `INSERT INTO contacts (
        project_id,
        name,
        email,
        company,
        phone,
        preferred_contact
      ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        projectId,
        contactInfo.name,
        contactInfo.email,
        contactInfo.company,
        contactInfo.phone,
        contactInfo.preferredContact
      ]
    );

    // Commit transaction
    await query('COMMIT');

    return { success: true, projectId };
  } catch (error) {
    // Rollback transaction on error
    await query('ROLLBACK');
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};
