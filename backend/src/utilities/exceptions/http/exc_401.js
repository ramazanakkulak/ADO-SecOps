const httpExceptions = require('../../messages/exceptions/http/exc_details');

function http_exc_401_unauthorized_request() {
  return httpExceptions.http_401_unauthorized_details();
}

function http_exc_401_user_not_found(email) {
  return httpExceptions.http_401_email_details(email);
}
function http_exc_401_incorrect_user_password() {
  return httpExceptions.http_401_incorrect_user_password();
}
function http_exc_401_cinema_file_fail_added() {
  return httpExceptions.http_401_cinema_file_fail_added();
}
function http_exc_401_cinema_ticket_not_found() {
  return httpExceptions.http_401_cinema_buy_ticket();
}
module.exports = {
  http_exc_401_unauthorized_request,
  http_exc_401_user_not_found,
  http_exc_401_incorrect_user_password,
  http_exc_401_cinema_file_fail_added,
  http_exc_401_cinema_ticket_not_found
};
