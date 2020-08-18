const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const app = express();

// Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//DB config
const db = require('./config').mongoURI;

const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}
//Connect to Mongo
mongoose.connect(db, options).catch(err => err);

//Use Routes
app.use('/api/secrets', require('./routes/api/secrets'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//in Production

if(process.env.NODE_ENV === 'production'){
	//Use static react folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	}) 
}

const port = process.env.PORT || 5000;

app.listen(port);
