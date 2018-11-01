// Require path  
const path = require('path');

//Routing
module.exports = function (app) {
    //Display home page 
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    //Display content
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    // //If no matching route is found default to home
    // app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, '../public/home.html'));
    // });
};