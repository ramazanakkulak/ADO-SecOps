const { Forbidden } = require('http-errors');
const {
  http_403_forbidden_details,
} = require('../../messages/exceptions/http/exc_details');

function http_403_exc_forbidden_request() {
  return http_403_forbidden_details();
}

module.exports = {
  http_403_exc_forbidden_request,
};
