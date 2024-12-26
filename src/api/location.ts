export const LOCATION_API = {
  GET_COUNTRY: '/countries/',
  GET_COUNTRY_CITIES: (countryCode: string) => `/countries/${countryCode}/cities`,
  GET_COUNTRY_REGIONS: (countryCode: string) => `/countries/${countryCode}/regions`,
};
