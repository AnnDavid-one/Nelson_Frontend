export interface SiteSettings {
  bankName: string | null;
  bankAccountName: string | null;
  bankAccountNumber: string | null;
  whatsappNumber: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
}

export interface SiteSettingsResponse {
  settings: SiteSettings | null;
}
