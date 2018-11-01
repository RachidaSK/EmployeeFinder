let employeeList = require('../data/employees.js');
console.log(employeeList);
module.exports = function (app) {

    app.get('/api/employees', function (req, res) {
        res.json(employeeList);
    });

    app.post('/api/employees', function (req, res) {
        employeeList.push(req.body);
        res.json(req.body);
    });
}