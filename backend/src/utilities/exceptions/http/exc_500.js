const {
  http_500_internal_server_error_details,
} = require('../../messages/exceptions/http/exc_details');

function http_500_exc_label_not_found_request() {
  return http_500_internal_server_error_details();
}
module.exports = {
  http_500_exc_label_not_found_request,
};
