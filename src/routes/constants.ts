export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  SERVICES: '/services',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SERVICE_SPECS: '/service-specs'
} as const;

export const ROUTE_TITLES = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.PROJECTS]: 'Projects',
  [ROUTES.SERVICES]: 'Services',
  [ROUTES.ABOUT]: 'About',
  [ROUTES.CONTACT]: 'Contact',
  [ROUTES.PRIVACY]: 'Privacy Policy',
  [ROUTES.TERMS]: 'Terms of Service',
  [ROUTES.SERVICE_SPECS]: 'Service Specifications'
} as const;