var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorhandler());
app.use(bodyParser.json());

app.use(require('./routes'));



if (process.env.ENVIRONMENT == "production") {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/news', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongoose.set('debug', true);
}

port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
    console.log("Listening on " + port)
})
