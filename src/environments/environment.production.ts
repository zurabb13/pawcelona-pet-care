import deployment from '../../deployment.config.json';

export const environment = {
  production: true,
  siteUrl: deployment.siteUrl.replace(/\/$/, ''),
  // Add the public Supabase project URL and anon key when you are ready to receive live bookings.
  // These values are public client credentials; never put the service-role key in frontend code.
  supabaseUrl: '',
  supabaseAnonKey: ''
};
