console.log('ok baby');
// afficher une page esx avec input zone txt

// copier coller le fastOrder et boom

// bouton valider qui apparait

let express = require('express');
// let bodyParser = require('bodyParser');
// let urlencodedParser = bodyParser.urlencodedParser({extended: false});

let app = express();

app.get('/', (req, res) =>{
    res.render('home.ejs')
})
// .post('/addAToDo', urlencodedParser, function(req, res) {
//     console.log('post1');
//     req.session.todolist.push(req.body.myTodo);
//     res.redirect('/');
// })
.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Désolé Boby, page non trouvée !');
})
.listen(8080);