const { tokenGenerator } = require('../securities/authorizations/jwt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

describe('JWTokenGenerator', () => {
  const mockJwtData = { userId: '123456', role: 'admin' };

  it('generates a valid JWT token with default expiration', async () => {
    const token = await tokenGenerator.generateToken(mockJwtData);
    expect(token).toHaveProperty('token');
    expect(token).toHaveProperty('cookieOptions');
    expect(typeof token.token).toBe('string');
    expect(typeof token.cookieOptions).toBe('object');

    // Verify the token using the same secret key and algorithm
    const decodedToken = jwt.verify(token.token, config.JWT_SECRET_KEY);
    expect(decodedToken).toMatchObject({
      userId: mockJwtData.userId,
      role: mockJwtData.role
    });
  });

  it('generates a valid JWT token with custom expiration', async () => {
    const expiresDelta = 3600000; // 1 hour
    const token = await tokenGenerator.generateToken(mockJwtData, expiresDelta);
    expect(token).toHaveProperty('token');
    expect(token).toHaveProperty('cookieOptions');
    expect(typeof token.token).toBe('string');
    expect(typeof token.cookieOptions).toBe('object');

    // Verify the token using the same secret key and algorithm
    const decodedToken = jwt.verify(token.token, config.JWT_SECRET_KEY);
    expect(decodedToken).toMatchObject({
      userId: mockJwtData.userId,
      role: mockJwtData.role
    });
  });

  it('handles errors gracefully', async () => {
    // Mocking jwt.sign function to throw an error
    jwt.sign = jest.fn((payload, secret, options, callback) => {
      callback(new Error('Mock sign error'));
    });

    await expect(tokenGenerator.generateToken(mockJwtData)).rejects.toThrow('Mock sign error');
  });
});
