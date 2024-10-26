export const LOCATION_API = {
  GET_COUNTRY: "/api/countries/",
  GET_COUNTRY_CITIES: (countryCode: string) => `/api/countries/${countryCode}/cities`,
  GET_COUNTRY_REGIONS: (countryCode: string) => `/api/countries/${countryCode}/regions`,

};
