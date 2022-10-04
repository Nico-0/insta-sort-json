const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2');
const myConnection = require('express-myconnection');

//https://github.com/FaztWeb/crud-nodejs-mysql
const app = express();


//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: 3306,
	database: 'ig'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// routes
const userRoutes = require('./routes');
app.use('/', userRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, '../thumbs')));

// server
app.listen(app.get('port'), () => {
	console.log(`server on port ${app.get('port')}`);
});