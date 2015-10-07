//Run 'npm install connect' to install Connect middleware
var connect = require('connect');

//creates a new web server
var app = connect();

//about the 3 arguments:
//req: This is an object that holds the HTTP request information
//res: This is an object that holds the HTTP response information and allows you to set the response properties
//next: This is the next middleware function defined in the ordered set of Connect middleware

var logger = function(req, res, next) {

  console.log(req.method, req.url, '-> this is inside logger');

  //In this code, next() enables hellowWorld to execute. 
  //Without this, execution of middleware would stop at logger and request would hang because res.end is never called in the hellowWorld.
  next();
};

var helloWorld = function(req, res, next) {

  	console.log('-> this is inside helloWorld');

	res.setHeader('Content-Type', 'text/plain');

	res.end('Hello World');
};

var goodbyeWorld = function(req, res, next) {

  console.log('-> this is inside goodbyeWorld');
  
  res.setHeader('Content-Type', 'text/plain');
  
  res.end('Goodbye World');
};

//Method 'use' registers to the Connect application
//Register order is important as it determines the order in which middleware is executed
app.use(logger);

//Mounting which enables you to determine which request path is required for the middleware function to get executed
//Mounting is done by adding the path argument to the app.use() method
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);

//Determines which port the app listens to
app.listen(3000);

console.log('Server running at http://localhost:3000/');