myApp.service('categoryService', ['$resource', function($resource){
	this.getCategoryList = function(){
	    var categoryAPI = $resource("http://localhost:8080/api/category/get");

	    return categoryAPI.query();
	}
}]);

myApp.service('foodService', ['$resource', function($resource){
    self = this;
    
	var foodAPI = $resource("/api/food/:id",
    	{id: "@id" },
    	{
        "update": {method: "PUT"},
    	});


    this.getFoodItems = function(){
	    return foodAPI.query();
    }
	

	this.selectiveItem = {};

	this.updateItem = function(data){
		var item = foodAPI.get({},{'id': data.id});
		item.title = data.title;
		item.category = data.category;
		item.description = data.description;
		item.$save();
	}

	this.deleteItem = function(item){
		return foodAPI.delete({}, {'id': item.id}, function () {
		    return true;
		});
	}
}]);