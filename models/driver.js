const Ticker = require('./ticker');

/**
 * @namespace Driver
 * @class
 */
class Driver {
  constructor(config) {
    this.requires = {
      secret: false,
    };

    if (config) {
      this.requires = {
        ...this.requires,
        ...config.requires,
      };
    }
  }

  /**
   * Drivers must include a fetchTickers method.
   *
   * @namespace Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    throw new Error('must be implemented by driver');
  }
}

module.exports = Driver;
