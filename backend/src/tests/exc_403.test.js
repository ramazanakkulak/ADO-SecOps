const httpExceptions = require('../utilities/exceptions/http/exc_403');

describe('HTTP 403 Exception its', () => {
  it('http_403_exc_forbidden_request should throw Forbidden error with correct message', () => {
    const expectedMessage = 'Refused access to the requested resource!';
    expect(httpExceptions.http_403_exc_forbidden_request()).toBe(
      expectedMessage
    );
  });
});
