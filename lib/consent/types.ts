export type ConsentChoice = "accepted" | "rejected" | "custom";

export interface ConsentPreferences {
  version: number;
  choice: ConsentChoice;
  analytics: boolean;
  advertising: boolean;
  personalization: boolean;
  updatedAt: string;
}

export type ConsentSetting = "granted" | "denied";

export interface GoogleConsentState {
  analytics_storage: ConsentSetting;
  ad_storage: ConsentSetting;
  ad_user_data: ConsentSetting;
  ad_personalization: ConsentSetting;
  functionality_storage: ConsentSetting;
  personalization_storage: ConsentSetting;
  security_storage: ConsentSetting;
}
