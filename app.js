const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');
const ejs = require('ejs');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');


mongoose.connect(config.database,{
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB...');
}).catch((err) => {
    console.log(err);
});




// Init App
const app = express();

// Bring in Models
let Article = require('./models/article');


// Set View Engine
app.set('views',path.join(__dirname,'templates/views'));
app.set('view engine','ejs');


// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));


// Parse Application/JSON
app.use(express.json());


// Set Public Folder
app.use(express.static(path.join(__dirname,'public')));



// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));



// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req,res,next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
});



// Route Files
const articles = require('./routes/articles');
const users = require('./routes/users');
app.use('/articles',articles);
app.use('/users',users);




// Home Route
app.get('/',(req,res) => {
    Article.find({},(err,articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index',{
                title: 'Articles',
                articles: articles
            });
        }

    })
});





// Start Server
app.listen(3000,() => {
    console.log(`Server running on Port : 3000`);
});