const api = require('binance'); // https://www.npmjs.com/package/binance
const binanceRest = new api.BinanceRest({
    key: 'yourKey', // Get this from your account on binance.com
    secret: 'yourSecret', // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,
    /*
    * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
    * default those keys will be replaced with more descriptive, longer ones.
    */
   handleDrift: false
   /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
   * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
   * binance's server time, calculating the difference with your own clock, and then reattempting
     * the request.
     */
});

module.exports = function (symbol, side, price, quantity) {
    // binanceRest.newOrder({
    //     type: 'LIMIT',
    //     symbol: symbol,  // Object is transformed into a query string, timestamp is automatically added
    //     side: side,
    //     timeInForce: 'GTC',
    //     price: price,
    //     quantity: quantity
    // })
    // .then((data) => {  
    //     console.log(data);
    // })
    // .catch((err) => {
    //     console.error(err);
    // });
    return `order sent to Binance ${symbol} ${side} ${price} ${quantity}`
}