(function() {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

//*** Derective ***//
function FoundItemsDirective(){
	var ddo = {
		templateUrl:'itemfound.html',
		scope:{
			items: '<',
			onRemove: '&'
		},
		controller:FoundItemsDirectiveController,
		controllerAs:'list',
		bindToController:true
	};

	return ddo;
}

function FoundItemsDirectiveController(){
	var list = this;

	list.checkFound = function(){
		return typeof list.items !== 'undefined' && list.items.length === 0
	};
}

//*** NarrowItDownController ***//
// NarrowItDownController.$inject = ['MenuSearchService'];
// function NarrowItDownController(MenuSearchService){
// 	var menu = this;

// 	var promise = MenuSearchService.getMatchedMenuItems();

// 	promise.then(function(response){
//     menu.menu_items = response.data.menu_items;
// 	})
// 	.catch(function (error){
// 		console.log("Something went wrong.");
// 	});
// }
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var menu = this;

	menu.narrowItDown = function(searchTerm){
		if (searchTerm){
			var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
			promise.then(function(response){
				menu.found = response;
			})
			.catch(function (error){
				console.log(error);
				
			});
		} else {
			menu.found = [];
		}
	};

	menu.removeItem = function (itemIndex){
		this.lastRemoved =  "Last item removed was " + menu.found[itemIndex].name;
		menu.found.splice(itemIndex, 1);
	}

}


// *** MenuSearchService *** //
// MenuSearchService.$inject = ['$http', 'ApiBasePath'];
// function MenuSearchService ($http, ApiBasePath) {
// 	var service = this;

// 	service.getMenuItems = function (searchTerm) {
// 		var response = $http({
// 			method: "GET",
// 			url: (ApiBasePath + "/menu_items.json")
// 		});

// 		return response;
// 	}
// }
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function (searchTerm) {
		var response = $http({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json")
		}).then(function(response){
			// process result and only keep items that match
			var foundItems = [];
			var menuItemsLength = response.data.menu_items.length;

			for (var i=0; i<menuItemLength; i++){
				var item = response.data.menu_items[i];
				if (item.description.indexOf(searchTerm) !== -1){
					foundItems.push(item);
				}
			}
			//return processed items
			return foundItems;
		});

		return response;
	};
}


})();
