-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  categories TEXT[] NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create business_goals table
CREATE TABLE IF NOT EXISTS business_goals (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  goals TEXT[] NOT NULL,
  target_audience TEXT NOT NULL,
  success_criteria TEXT NOT NULL,
  competitors TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create technical_specs table
CREATE TABLE IF NOT EXISTS technical_specs (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  platforms JSONB NOT NULL,
  integrations TEXT[] NOT NULL,
  security_compliance TEXT[],
  security_authentication TEXT[] NOT NULL,
  security_data_protection TEXT[] NOT NULL,
  scale_users INTEGER NOT NULL,
  scale_storage INTEGER NOT NULL,
  scale_bandwidth INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_business_goals_project_id ON business_goals(project_id);
CREATE INDEX IF NOT EXISTS idx_technical_specs_project_id ON technical_specs(project_id);
CREATE INDEX IF NOT EXISTS idx_contacts_project_id ON contacts(project_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
