const API_BASE_URL_USER = 'api/v1/user';
const API_BASE_URL_MAIN = 'api/v1/main';
export const environment = {
  ENVIRONMENT: 'DEV',
  YEAR_VERSION: '2024',
  VERSION: '1.0.0',
  TAG_VERSION: 'ITE-2024-1.0.0',
  production: false,

  AUTENTICATION_URL: {
    CHEACK_EMAIL: {
      EMAIL: `${API_BASE_URL_USER}/checkEmailIsPresent/`,
    },
    CHEACK_USERNAME: {
      USERNAME: `${API_BASE_URL_USER}/checkUsernameIsPresent/`,
    },
    LOGIN: `${API_BASE_URL_USER}/login`,
    LOGOUT: `${API_BASE_URL_USER}/logout`,
  },

  MAIN_URL: {
    COUNTRY: {
      GET_ALL: `${API_BASE_URL_MAIN}/getCountryList`,
      SAVE: `${API_BASE_URL_MAIN}/saveCountry`,
      CHEACK_COUNTRY_EXIST: `${API_BASE_URL_MAIN}/checkCountryIsPresent`,
      DELETE: `${API_BASE_URL_MAIN}/deleteCountry`,
    },
  }

};
