/**
 * PUBLIC BUSINESS SETTINGS
 * Update this file before launch. Everything here is safe to ship to the browser.
 * Never put private API keys or Supabase service-role keys in this file.
 */
export const BUSINESS_CONFIG = {
  workingBrand: 'Pawcelona',
  legalName: 'REPLACE WITH LEGAL BUSINESS NAME',
  taxId: 'REPLACE WITH NIF/CIF/NIE',
  city: 'Barcelona',
  region: 'Catalunya',
  country: 'Spain',
  countryCode: 'ES',
  publicAddress: '',
  email: 'hello@pawcelona.example',
  phoneDisplay: '+34 XXX XXX XXX',
  whatsappNumber: '34XXXXXXXXX',
  instagram: '@pawcelona',
  bookingMode: 'request' as const,
  heroImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1800&q=88',
  aboutImage: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1600&q=86',
  dataProtectionEmail: 'hello@pawcelona.example',
  privacyContactAddress: '',
  minimumBookingNotice: 'Subject to availability',
  cancellationPolicy: 'Cancellation conditions are communicated before a booking is confirmed.',
  insuranceConfirmed: false,
  sitterVerificationConfirmed: false
} as const;

export function hasRealContactDetails(): boolean {
  return !BUSINESS_CONFIG.email.endsWith('.example') && !BUSINESS_CONFIG.whatsappNumber.includes('X');
}
