const api = require('binance'); // https://www.npmjs.com/package/binance
const binanceRest = new api.BinanceRest({
    key: 'yourKey', // Get this from your account on binance.com
    secret: 'yourSecret', // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,

    //options: { 'adjustForTimeDifference': true }, 
    handleDrift: true,

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

// function sleep(milliseconds) {
//     var start = new Date().getTime();
//     for (var i = 0; i < 1e7; i++) {
//       if ((new Date().getTime() - start) > milliseconds){
//         break;
//       }
//     }
//   }

module.exports = function (symbol, side, price, quantity) {
    //binanceRest.startTimeSync();
    //console.log(calculateDrift());
    binanceRest.newOrder({
        type: 'LIMIT',
        symbol: symbol,  // Object is transformed into a query string, timestamp is automatically added
        side: side,
        timeInForce: 'GTC',
        price: price,
        quantity: quantity
    })
    .then((data) => {  
        console.log(`\n\norder sent to Binance ${symbol} ${side} ${price} ${quantity}`);
        console.log(data);
    })
    .catch((err) => {
        console.error(err);
    });
    //binanceRest.endTimeSync();
    //return `order sent to Binance ${symbol} ${side} ${price} ${quantity}`
    sleep(200);
}

// voir pkoi
// { code: -1021,
//     msg: 'Timestamp for this request was 1000ms ahead of the server\'s time.' }
// https://www.google.fr/search?rlz=1C1CHBD_frFR787FR787&ei=MvSEW9eVH4SWabDdh6AH&q=binance+Timestamp+for+this+request+was+1000ms+ahead+of+the+server&oq=binance+Timestamp+for+this+request+was+1000ms+ahead+of+the+server&gs_l=psy-ab.3..0i203k1j0i5i30k1j0i8i10i30k1.54880.54880.0.54975.1.1.0.0.0.0.59.59.1.1.0....0...1c.1.64.psy-ab..0.1.58....0.VHakofRMSmE