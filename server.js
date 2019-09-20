const express = require('express');
const app = express();
// var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const session = require('express-session');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', (req, res) =>{
    //if first time visiting, set session to 1, if session doesnt have count, initilize count to 1
    if(!req.session.count){
        req.session.count =1;
    }
    //if isnt first time, increase count by 1
    else{
        req.session.count++;
    }
    res.render('index', {count: req.session.count})
})

//adding two to sess count when button clicked, add 1 here, 1 when redirect to root
app.post('/addTwo', (req, res) =>{
    req.session.count += 1;
    res.redirect('/');
})

//resets counter, destorys session, when redirect to root count =1
app.post('/reset', (req, res) =>{
    // req.session.count =0;
    req.session.destroy();
    res.redirect('/');
})

app.listen(8000);