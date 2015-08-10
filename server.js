var express = require('express');
var http = require('http');

var dbconfig = require('./config/db');
var app = express();

var factory = require('./factories/db/dbFactory');

var Person = require('./models/entities/Person');
var Presentation = require('./models/entities/Presentation');

app.set('port', process.env.port || 3000);
app.use(express.static('public'));

app.get('/api', function (res, res) {
    factory.getDriver(dbconfig.driver, function (db) {
        db.connect(dbconfig.host, dbconfig.port, dbconfig.database, dbconfig.user, dbconfig.password);

        db.setEntity(Person);
        db.crud(db.ACTIONS.READ, {}, function (result) {
            console.log(1, result);
        });

        db.setEntity(Presentation);
        db.crud(db.ACTIONS.READ, {}, function (result) {
            console.log(2, result);
        });

        db.setEntity(Person);
        db.crud(db.ACTIONS.READ, {}, function (result) {
            console.log(3, result);
        });

        res.send('root');
    });
});

app.get('/', function (req, res) {
    res.write('okay').end();
});

var server = http.createServer(app);

var io = require('./io')(server);

server.listen(app.get('port'), function () {
    console.log('express running on port ' + app.get('port'));
});