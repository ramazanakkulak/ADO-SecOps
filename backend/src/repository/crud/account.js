const Account = require('../../models/accountModel');

class AccountRepository {
  async createAccount(userData) {
    return await Account.create(userData);
  }

  async findByUsername(username) {
    return await Account.findOne({ username: username });
  }

  async findByEmail(email) {
    return await Account.findOne({ email: email });
  }

  async findUserAndCheckPasswordByEmail(email) {
    return await Account.findOne({ email: email }).select('+password');
  }

  async deleteUser(userId) {
    return await Account.findByIdAndDelete(userId);
  }

  async getUser(userId) {
    return await Account.findById(userId);
  }

  // Diğer MongoDB işlemleri buraya eklenebilir
}

module.exports = new AccountRepository();
