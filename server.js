// server.js

// set up ========================
var express  = require('express');
var app      = express(); // create our app w/ express

// configuration =================
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/')); // set the static files location /public/img will be /img for users

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// listen (start app with node server.js)

var router = express.Router();// get an instance of the express Router

// normally this data is stored in the database
var categories = [
	{ id: 1, name: 'Fruits' },
	{ id: 2, name: 'Berries' },
	{ id: 3, name: 'Vegetables' }
]

var foodItems = [
	{	
		id:1,
		title: "Apple" , 
		category: "Fruits",
		description: "The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.", 
	},
	{	
		id:2, 
		title: "Pear" ,
		category: "Fruits", 
		description: "The pear is any of several tree and shrub species of genus Pyrus /ˈpaɪrəs/, in the family Rosaceae. It is also the name of the pomaceous fruit of these trees."
	},
	{	
		id:3, 
		title: "Cherry" ,
		category: "Berries", 
		description: "A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe. The cherry fruits of commerce usually are obtained from a limited number of species such as cultivars of the sweet cherry, Prunus avium."
	},
	{	
		id:4, 
		title: "Blueberry" ,
		category: "Berries", 
		description: "Blueberries are perennial flowering plants with indigo-colored berries from the section Cyanococcus within the genus Vaccinium. Species in the section Cyanococcus are the most common fruits sold as 'blueberries' and are native to North America. "
	},
	{	
		id:5, 
		title: "Tomato" ,
		category: "Vegetables", 
		description: "The tomato is the edible, often red berry-type fruit of Solanum lycopersicum, commonly known as a tomato plant, which belongs to the nightshade family, Solanaceae. The species originated in Central and South America."
	},
	{	
		id:4, 
		title: "Cucumber" ,
		category: "Vegetables", 
		description: "Cucumber is a widely cultivated plant in the gourd family, Cucurbitaceae. It is a creeping vine that bears cylindrical fruits that are used as culinary vegetables. There are three main varieties of cucumber: slicing, pickling, and burpless."
	}

]


//simple request handlers

router.get('/category/get', function(req, res) {
    res.json(categories);   
});

router.get('/food/', function(req, res) {
    res.json(foodItems);   
});

router.get('/food/:id', function(req, res) {
    var id = req.params.id;
	if(id>0){
		for(var i=0; i<foodItems.length;  i++){
			if(id==foodItems[i].id){
				res.json(foodItems[i]);
				break;
			}
		}
	}
       
});

router.post('/food/:id', function(req, res) {
    var data = req.body;
	var id = req.params.id;
	if(id>0){
		for(var i=0; i<foodItems.length;  i++){
			if(id==foodItems[i].id){
				foodItems[i] = data;
				break;
			}
		}
	}
});

router.route('/food/:id').delete( function (req, res) {
	var id = req.params.id;
	if(id>0){
		for(var i=0; i<foodItems.length;  i++){
			if(id==foodItems[i].id){
				foodItems.splice(i, 1);
				break;
			}
		}
	}
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


app.listen(port);
console.log("App listening on port " + port);