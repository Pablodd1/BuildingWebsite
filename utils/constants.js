import { siteSettings } from './siteSettings';

export const BASE_URL = siteSettings.domain;
export const BRAND_NAME = siteSettings.brand_name;
export const MIAMI_OFFICE = {
  address: siteSettings.doral_address_street,
  city: siteSettings.doral_address_city,
  state: siteSettings.doral_address_state,
  zip: siteSettings.doral_address_zip,
  country: 'USA',
};
