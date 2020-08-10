 const express = require('express');
const mongoose = require('mongoose')

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
mongoose.connect(db, options).then(() => console.log('connected')).catch(err => console.log(err));

//Use Routes
app.use('/api/secrets', require('./routes/api/secrets'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
