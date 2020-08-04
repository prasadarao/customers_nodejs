const http = require('http');
const express = require('express');
//const app = require("./app");
const db = require("./models/db");

const app = express();
const port = process.env.PORT || 3001;


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/customers', (req, res) => {
	db.query('select * from customers', (error, results) => {
		if(error) {
			console.log(error.message);
		}
  		res.send(results);	
	});
});

app.get('/customer/:id', (req,res) => {
	db.query('select * from customers where id = ?', req.params.id, (error, result) => {
		if (error) throw error;
		res.send(result);
	});
});


app.get('/address/:cid', (req,res) => {
        db.query('select * from address where customer_id = ?', req.params.cid, (error, result) => {
                if (error) throw error;
                res.send(result);
        });
});

app.listen(port, () => console.log("Server listening on port " + port));
