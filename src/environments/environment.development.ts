const API_BASE_URL_USER = 'api/v1/user';
const API_BASE_URL_MAIN = 'api/v1/main';
const API_BASE_URL_DASHBOARD = 'api/v1/dashboard';
export const environment = {
  ENVIRONMENT: 'DEV',
  YEAR_VERSION: '2024',
  VERSION: '1.0.0',
  TAG_VERSION: 'ITE-2024-1.0.0',
  production: false,

  AUTENTICATION_URL: {
    LOGIN: `${API_BASE_URL_USER}/login`,
    LOGOUT: `${API_BASE_URL_USER}/logout`,
    IS_TOKEN_VALID: `${API_BASE_URL_USER}/isValidToken`,
  },
  REGISTRATION_URL: {
    REGISTER: `${API_BASE_URL_USER}/register`,
    GET_ALL: `${API_BASE_URL_USER}/getAllUser`,
    USER_STATUS: `${API_BASE_URL_USER}/userStatusChange`,
  },
  MAIN_URL: {
    COUNTRY: {
      GET_ALL: `${API_BASE_URL_MAIN}/getCountryList`,
      SAVE: `${API_BASE_URL_MAIN}/saveCountry`,
      CHEACK_COUNTRY_EXIST: `${API_BASE_URL_MAIN}/checkCountryIsPresent`,
      DELETE: `${API_BASE_URL_MAIN}/deleteCountry`,
    },
    MINISTRY: {
      GET_ALL: `${API_BASE_URL_MAIN}/getDomainMinistryList`,
      SAVE: `${API_BASE_URL_MAIN}/saveDomainMinistry`,
    },
    AGENCY: {
      GET_ALL: `${API_BASE_URL_MAIN}/getAgencyList`,
      SAVE: `${API_BASE_URL_MAIN}/saveAgency`,
    },
    EMPLOYEE: {
      GET_ALL: `${API_BASE_URL_MAIN}/getEmployeeList`,
      SAVE: `${API_BASE_URL_MAIN}/saveEmployee`,
      GENERATE_EMP_ID: `${API_BASE_URL_MAIN}/generateEmployeeId`,
    }
  },
  DASHBOARD_URL: {
    GET_ALL_INCIDENT_DATA: `${API_BASE_URL_DASHBOARD}/getIncidentData`,
  }

};
