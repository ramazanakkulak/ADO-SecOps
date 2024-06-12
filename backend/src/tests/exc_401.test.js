const httpExceptions = require('../utilities/exceptions/http/exc_401');

describe('HTTP 401 Exception its', () => {
  it('http_exc_401_unauthorized_request should return correct message', () => {
    expect(httpExceptions.http_exc_401_unauthorized_request()).toBe(
      'Refused to complete request due to lack of valid authentication!'
    );
  });

  it('http_exc_401_user_not_found should return correct message with email', () => {
    const email = 'it@example.com';
    expect(httpExceptions.http_exc_401_user_not_found(email)).toBe(
      `Either the account with email \`${email}\` doesn't exist, has been deleted, or you are not authorized!`
    );
  });

  it('http_exc_401_incorrect_user_password should return correct message', () => {
    expect(httpExceptions.http_exc_401_incorrect_user_password()).toBe(
      'User password is incorrect. Please verify your password and try again.'
    );
  });

  it('http_exc_401_cinema_file_fail_added should return correct message', () => {
    expect(httpExceptions.http_exc_401_cinema_file_fail_added()).toBe(
      'An internal server error occurred while attempting to add the Cinema file to the database. The operation failed.'
    );
  });

  it('http_exc_401_cinema_ticket_not_found should return correct message', () => {
    expect(httpExceptions.http_exc_401_cinema_ticket_not_found()).toBe(
      'Purchase failed: Ticket not available.'
    );
  });
});
