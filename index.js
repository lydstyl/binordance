let express = require('express');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let app = express();

app.get('/', (req, res) =>{
    if (global.ordersArray == undefined) {
        console.log('ordersArray undefi');
        global.ordersArray = [];
    }
    res.render('home.ejs', {
        orders: global.ordersArray // [ { symbol: 'XRPBTC', side: 'BUY', price: 0.000054, quantity: 50 },
    });
})
.post('/check-text-orders', urlencodedParser, function(req, res) {
    //console.log('post1');
    let orders = req.body.orders.split('\r\n'); // [ '0.0000540 50', '0.0000600 30' ]
    //let ordersArray = []; // req.session.todolist.push(req.body.myTodo); // si besoin de session
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
    console.log(global.ordersArray);
    
    // ici il faut contacter Binance et ajouter l'ordre

    res.redirect('/');
})
.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Désolé Boby, page non trouvée !');
})
.listen(2300);