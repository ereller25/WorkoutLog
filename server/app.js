require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

// creates the table(s) in postgres
sequelize.sync(); // sequelize.sync({ force: true }); -- will drop the table and recreate it

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

// create user router
app.use('/api/user', require('./routes/user'));
//login route
app.use('/api/login', require('./routes/session'));
//definitions route
app.use('/api/definition', require('./routes/definition'));
// log route
app.use('/api/log', require('./routes/log'));

// Test route for api 
app.use('/api/test', function(req,res) {
	res.send("hello world");
});

app.listen(3000, function() {
	console.log("app is listening on port 3000");

});

// run it on the command line with:
// node app.js