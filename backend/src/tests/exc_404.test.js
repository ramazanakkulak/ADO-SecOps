const {
  http_404_exc_email_not_found_request,
  http_404_exc_id_not_found_request,
  http_404_exc_username_not_found_request,
} = require('../utilities/exceptions/http/exc_404');

describe('HTTP 404 Exception its', () => {
  it('should return correct email not found message', () => {
    const email = 'example@example.com';
    expect(http_404_exc_email_not_found_request(email)).toBe(
      `The email ${email} could not be found!`
    );
  });

  it('should return correct ID not found message', () => {
    const id = '123';
    expect(http_404_exc_id_not_found_request(id)).toBe(
      `The resource with ID ${id} could not be found!`
    );
  });

  it('should return correct username not found message', () => {
    const username = 'example_user';
    expect(http_404_exc_username_not_found_request(username)).toBe(
      `The user with username '${username}' could not be found!`
    );
  });
});
