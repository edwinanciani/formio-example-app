var APP_URL = 'https://example.form.io'; // Change this URL for you project URL
var API_URL = 'https://api.form.io';

angular.module('formioApp').constant('AppConfig', {
  appUrl: APP_URL,
  apiUrl: API_URL,
  forms: {
    userForm: APP_URL + '/user',
    userLoginForm: APP_URL + '/user/login',
    userRegisterForm: APP_URL + '/user/register',
    homeForm: APP_URL + '/homeForm'  // Change this for you form endpoint
  },
  resources: {
    user: {
      form: APP_URL + '/user',
      resource: 'UserResource'
    }
  }
});
