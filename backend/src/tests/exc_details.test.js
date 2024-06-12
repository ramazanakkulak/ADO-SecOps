const {
  http_400,
  http_400_username_details,
  http_400_email_details,
  http_400_signup_credentials_details,
  http_400_sigin_credentials_details,
  http_401_unauthorized_details,
  http_401_email_details,
  http_401_incorrect_user_password,
  http_401_cinema_file_fail_added,
  http_403_forbidden_details,
  http_500_internal_server_error_details,
  http_401_cinema_buy_ticket,
} = require('../utilities/messages/exceptions/http/exc_details');

describe('HTTP Error Messages', () => {
  it('HTTP 400 message', () => {
    expect(http_400()).toBe(
      'The request could not be processed due to invalid syntax or missing required information.'
    );
  });

  it('HTTP 400 username details', () => {
    expect(http_400_username_details('ituser')).toBe(
      'The username ituser is taken! Be creative and choose another one!'
    );
  });

  it('HTTP 400 email details', () => {
    expect(http_400_email_details('it@example.com')).toBe(
      'The email it@example.com is already registered! Be creative and choose another one!'
    );
  });

  it('HTTP 400 signup credentials details', () => {
    expect(http_400_signup_credentials_details()).toBe(
      'Signup failed! Recheck all your credentials!'
    );
  });

  it('HTTP 400 signin credentials details', () => {
    expect(http_400_sigin_credentials_details()).toBe(
      'Signin failed! Recheck all your credentials!'
    );
  });

  it('HTTP 401 unauthorized details', () => {
    expect(http_401_unauthorized_details()).toBe(
      'Refused to complete request due to lack of valid authentication!'
    );
  });

  it('HTTP 401 email details', () => {
    expect(http_401_email_details('it@example.com')).toBe(
      "Either the account with email `it@example.com` doesn't exist, has been deleted, or you are not authorized!"
    );
  });

  it('HTTP 401 incorrect user password', () => {
    expect(http_401_incorrect_user_password()).toBe(
      'User password is incorrect. Please verify your password and try again.'
    );
  });

  it('HTTP 401 cinema file fail added', () => {
    expect(http_401_cinema_file_fail_added()).toBe(
      'An internal server error occurred while attempting to add the Cinema file to the database. The operation failed.'
    );
  });

  it('HTTP 403 forbidden details', () => {
    expect(http_403_forbidden_details()).toBe(
      'Refused access to the requested resource!'
    );
  });

  it('HTTP 500 internal server error details', () => {
    expect(http_500_internal_server_error_details()).toBe(
      'An internal server error occurred. Please try again later.'
    );
  });

  it('HTTP 401 cinema buy ticket', () => {
    expect(http_401_cinema_buy_ticket()).toBe(
      'Purchase failed: Ticket not available.'
    );
  });
});
