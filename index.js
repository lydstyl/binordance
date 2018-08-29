let express = require('express');
let bodyParser = require('body-parser');
let fs = require("fs");
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let app = express();

app.use(express.static('public'))
.get('/', (req, res) =>{
    console.log('get1');
    if (global.ordersArray == undefined) {
        //console.log('ordersArray undefi');
        global.ordersArray = []; // will looks like [ { symbol: 'XRPBTC', side: 'BUY', price: 0.000054, quantity: 50 },
        global.show = false;
    }
    res.render('home.ejs', {
        orders: global.ordersArray, 
        show: global.show
    });
})
.post('/check-text-orders', urlencodedParser, (req, res) => {
    console.log('post1 check-text-orders');
    let orders = req.body.orders.split('\n'); // eg [ '0.0000540 50', '0.0000600 30' ]
    console.log(orders);
    global.ordersArray = [];
    orders.forEach(o => {
        let order = o.split(' ');
        let price = order[0];
        let qty = order[1];
        global.ordersArray.push({
            symbol: req.body.symbol,
            side: req.body.type,
            price: parseFloat(price),
            quantity: parseFloat(qty)
        });
    });
    if (global.ordersArray[0].price * 0 != 0) { // NaN
        global.show = false;
    }else{
        global.show = true;
    }
    res.redirect('/');
})
.post('/addInBinance', urlencodedParser, (req, res) =>{
    console.log('post2 addInBinance');
    let password = req.body.password;
    if (password == JSON.parse(fs.readFileSync("pass.json")).password) { /////////////////////// todo hacher le pass https://www.npmjs.com/package/bcrypt et mettre le pass en bdd ?
        const addOrders = require('./addorders');
        global.ordersArray.forEach(order => {
            console.log(
                `sending order to binance : 
                    ${order.symbol} 
                    ${order.side} 
                    ${order.price} 
                    ${order.quantity}`
            );
            addOrders(
                order.symbol, 
                order.side, 
                order.price, 
                order.quantity
            );
        });
    }
    global.ordersArray = undefined; // set it back to undefined
    res.redirect('/');
})
.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Désolé Boby, page non trouvée !');
})
.listen(2300); //http://localhost:2300/