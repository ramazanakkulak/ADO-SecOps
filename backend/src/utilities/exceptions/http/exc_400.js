const {
  http_400,
  http_400_email_details,
  http_400_sigin_credentials_details,
  http_400_signup_credentials_details,
  http_400_username_details,
} = require('../../messages/exceptions/http/exc_details');

function http_400_exc() {
  return http_400();
}

function http_exc_400_credentials_bad_signup_request() {
  return http_400_signup_credentials_details();
}

function http_exc_400_credentials_bad_signin_request() {
  return http_400_sigin_credentials_details();
}

function http_400_exc_bad_username_request(username) {
  return http_400_username_details(username);
}

function http_400_exc_bad_email_request(email) {
  return http_400_email_details(email);
}

module.exports = {
  http_400_exc,
  http_400_exc_bad_username_request,
  http_400_exc_bad_email_request,
  http_exc_400_credentials_bad_signin_request,
  http_exc_400_credentials_bad_signup_request,
};
