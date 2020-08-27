var fs = require('fs');
const { isExternalModuleNameRelative } = require('typescript');
const loginResponse = require('../model/loginResponse');
const { debug } = require('console');
const User = require('../model/user').User;
const LoginResponse = require('../model/loginResponse').LoginResponse;

module.exports = function(req, res) {
    var user = new User();
    user = req.body;
    var loginResponse = new LoginResponse();

    console.log(JSON.stringify(user));
    fs.readFile('./data/users.json', 'utf8', function(err, data) {
        if(err) throw err;
        let userArray = JSON.parse(data);
        console.log(userArray);
        let i = userArray.findIndex(
            _user =>
            (_user.username == user.username) && (_user.password == user.password));
        if (i == -1){
            loginResponse.ok = false;
            console.log("debug: login rejection: " + user);
            res.send(JSON.stringify(loginResponse));
        }
        else {
            console.log(userArray[i]);
            loginResponse.ok = true;
            loginResponse.user = userArray[i];
            console.log("debug: login accepted: " + user);
            res.send(JSON.stringify(loginResponse));
        }
    });
}