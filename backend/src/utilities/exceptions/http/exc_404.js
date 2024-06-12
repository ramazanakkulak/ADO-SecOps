const {
  http_404_email_details,
  http_404_id_details,
  http_404_username_details,
} = require('../../messages/exceptions/http/exc_details');

function http_404_exc_email_not_found_request(email) {
  return http_404_email_details(email);
}

function http_404_exc_id_not_found_request(id) {
  return http_404_id_details(id);
}

function http_404_exc_username_not_found_request(username) {
  return http_404_username_details(username);
}

module.exports = {
  http_404_exc_username_not_found_request,
  http_404_exc_id_not_found_request,
  http_404_exc_email_not_found_request,
};
