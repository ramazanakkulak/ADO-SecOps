const {
  http_400_exc,
  http_400_exc_bad_username_request,
  http_400_exc_bad_email_request,
  http_exc_400_credentials_bad_signin_request,
  http_exc_400_credentials_bad_signup_request,
} = require('../utilities/exceptions/http/exc_400');

describe('HTTP 400 Exception its', () => {
  it('http_400_exc should return correct message', () => {
    expect(http_400_exc()).toBe(
      'The request could not be processed due to invalid syntax or missing required information.'
    );
  });

  it('http_400_exc_bad_username_request should return correct message with username', () => {
    const username = 'ituser';
    expect(http_400_exc_bad_username_request(username)).toBe(
      `The username ${username} is taken! Be creative and choose another one!`
    );
  });

  it('http_400_exc_bad_email_request should return correct message with email', () => {
    const email = 'it@example.com';
    expect(http_400_exc_bad_email_request(email)).toBe(
      `The email ${email} is already registered! Be creative and choose another one!`
    );
  });

  it('http_exc_400_credentials_bad_signin_request should return correct message', () => {
    expect(http_exc_400_credentials_bad_signin_request()).toBe(
      'Signin failed! Recheck all your credentials!'
    );
  });

  it('http_exc_400_credentials_bad_signup_request should return correct message', () => {
    expect(http_exc_400_credentials_bad_signup_request()).toBe(
      'Signup failed! Recheck all your credentials!'
    );
  });
});
