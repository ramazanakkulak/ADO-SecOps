const {
    http_500_exc_label_not_found_request,
  } = require('../utilities/exceptions/http/exc_500');

  describe('HTTP 500 Exception its', () => {
    it('should return correct internal server error details', () => {
      // Mocking http_500_internal_server_error_details function
      const message =
        'An internal server error occurred. Please try again later.';
      expect(http_500_exc_label_not_found_request()).toBe(
          message
      );
    });
  });
