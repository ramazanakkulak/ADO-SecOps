exports.http_400 = () => {
  return `The request could not be processed due to invalid syntax or missing required information.`;
};

exports.http_400_username_details = (username) => {
  return `The username ${username} is taken! Be creative and choose another one!`;
};

exports.http_400_email_details = (email) => {
  return `The email ${email} is already registered! Be creative and choose another one!`;
};

exports.http_400_signup_credentials_details = () => {
  return 'Signup failed! Recheck all your credentials!';
};

exports.http_400_sigin_credentials_details = () => {
  return 'Signin failed! Recheck all your credentials!';
};

exports.http_401_unauthorized_details = () => {
  return 'Refused to complete request due to lack of valid authentication!';
};

exports.http_401_email_details = (email) => {
  return `Either the account with email \`${email}\` doesn't exist, has been deleted, or you are not authorized!`;
};

exports.http_401_incorrect_user_password = () => {
  return 'User password is incorrect. Please verify your password and try again.';
};

exports.http_401_cinema_file_fail_added = () => {
  return 'An internal server error occurred while attempting to add the Cinema file to the database. The operation failed.';
};

exports.http_401_cinema_buy_ticket = () => {
  return 'Purchase failed: Ticket not available.';
};

exports.http_403_forbidden_details = () => {
  return 'Refused access to the requested resource!';
};

exports.http_404_email_details = (email) => {
  return `The email ${email} could not be found!`;
};

exports.http_404_id_details = (id) => {
  return `The resource with ID ${id} could not be found!`;
};

exports.http_404_username_details = (username) => {
  return `The user with username '${username}' could not be found!`;
};

exports.http_500_internal_server_error_details = () => {
  return 'An internal server error occurred. Please try again later.';
};
