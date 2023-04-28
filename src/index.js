const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

require('dotenv').config();

//Inicializaciones

const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))


//Variables Globales


//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/authentication.routes'));
app.use('/links', require('./routes/links.routes'));


//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server running in port ${app.get('port')}...`);
})