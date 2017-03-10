


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var passport = require('passport');


var User = require('./app/user');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');



app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));



var port = 8080;

mongoose.connect('mongodb://newfm-db:drower4@ds125060.mlab.com:25060/newfm');

//Router


var router = express.Router();


router.get('/', function(req, res) {

	res.json({message: "test home route" });

});


//inserting marketdata

router.route('/marketdata')

  .post(function(req, res){

  	var data = new MarketData;
  	data.productName = req.body.product;
  	data.price = req.body.price;
  	//data.time = req.body.time;

  		data.save(function(err){

  			if(err)
  				res.send(err);

  			res.json({ message: 'added'});
  		});

  });

router.route('/signup')
.post(function(req, res) {
  if(!req.body.name || !req.body.password){
    res.json({success: false, msg: 'Fill out form completely'});
  }else{
    var newUsesr = new User ({
      username: req.body.name,
      password: req.body.password
    });
    newUser.save(function(err){
      if(err){
        return res.json({success: false, msg:'error username exists'});

      } 
      res.json({succss: true, msg: 'created user'});
    });
  }
});



app.use('/api', router);

app.listen(port);
console.log("running on port " + port);

