var express = require('express');
var bodyParser = require('body-parser');
var less = require('less');
var fs = require('fs');
var port = 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

fs.readFile('styles.less', function(err,styles) {
    if(err) return console.error('Could not open file: %s',err);
    less.render(styles.toString(), function(er,css) {
        if(er) return console.error(er);
        fs.writeFile('./public/styles/styles.css', css, function(e) {
            if(e) return console.error(e);
            console.log('Compiled CSS');
        });
    });
});

app.listen(port, function() {
  console.log('port ' + port + ' is listening');
});
