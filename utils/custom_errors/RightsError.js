class RightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RightsError';
    this.statusCode = 403;
  }
}

module.exports = { RightsError };
