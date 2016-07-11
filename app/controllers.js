myApp.controller("MainController", ['$scope', '$mdDialog', '$mdMedia', '$mdSidenav', 'categoryService', 'foodService', function($scope, $mdDialog, $mdMedia, $mdSidenav, categoryService, foodService){
    $scope.categoryList = categoryService.getCategoryList();

    $scope.foodItems = foodService.getFoodItems();

    $scope.toggleSidebar = function(){
		$mdSidenav('sidebarLeft').toggle();
    }


	$scope.showEdit = function(ev, item) {
		item = item || {};
		foodService.selectedItem = item;


		$mdDialog.show({
			controller: "DialogController",
			templateUrl: 'partials/edit.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $mdMedia('xs') || $mdMedia('sm')
		})
		.then(function(answer) {
			$scope.foodItems = foodService.getFoodItems();
		}, function() {

		});

	};	

	$scope.showDelete = function(ev, item) {
    var confirm = $mdDialog.confirm({
		onComplete: function afterShowAnimation() {
				var $dialog = angular.element(document.querySelector('md-dialog'));
				var $actionsSection = $dialog.find('md-dialog-actions');
				var $cancelButton = $actionsSection.children()[0];
				var $confirmButton = $actionsSection.children()[1];
				angular.element($confirmButton).addClass('md-raised md-warn');
				angular.element($cancelButton).addClass('md-raised');
			}
		})
		.title('Delete Item')
		.textContent('Would you like to delete this item?')
		.ariaLabel('Delete Item')
		.targetEvent(ev)
		.ok('Yes')
		.cancel('No');

    $mdDialog.show(confirm).then(function() {
    	foodService.deleteItem(item);
    	$scope.foodItems = foodService.getFoodItems();
    }, function() {
		
    });
  };




}]);

myApp.controller("DialogController", ['$scope', '$mdDialog', 'categoryService', 'foodService', function($scope, $mdDialog, categoryService, foodService){
	$scope.categoryList = categoryService.getCategoryList();
	$scope.item = angular.copy(foodService.selectedItem);

	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
	$scope.submit = function(){
		foodService.updateItem($scope.item);
		$mdDialog.hide();
	}
}]);