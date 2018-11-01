// Import and set express 
const express = require('express');
const path = require('path');

const app = express();

//Define a PORT
var PORT = process.env.PORT || 3000;

//Set up middlewares 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Set the server to use the public directory for static assets
app.use(express.static(path.join(__dirname, './app/public')));

//Routes
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

//Start server
app.listen(PORT, function() {
    console.log(`App is now listening on PORT: http://localhost:${PORT}`);
})

