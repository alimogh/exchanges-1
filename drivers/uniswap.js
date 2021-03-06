const Driver = require('../models/driver');
const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

/**
 * @memberof Driver
 * @augments Driver
 */
class Uniswap extends Driver {
  /**
   * @augments Driver.fetchTickers
   * @returns {Promise.Array<Ticker>} Returns a promise of an array with tickers.
   */
  async fetchTickers() {
    const pairs = await request('https://api.uniswap.info/v1/tickers');

    return Object.keys(pairs).map((pair) => {
      const ticker = pairs[pair];

      return new Ticker({
        base: ticker.base_symbol,
        baseName: ticker.base_name,
        quote: ticker.quote_symbol,
        quoteName: ticker.quote_name,
        quoteReference: ticker.quote_token_address,
        close: parseToFloat(ticker.last_price),
        baseVolume: parseToFloat(ticker.base_volume),
        quoteVolume: parseToFloat(ticker.quote_volume),
      });
    });
  }
}

module.exports = Uniswap;
