(function(){
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService']; 
function ToBuyController(ShoppingListCheckOffService){
	var toBuyList = this;
	toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

	toBuyList.moveToBought = function(itemIndex){
		ShoppingListCheckOffService.moveToBoughtService(itemIndex);
	};
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var alreadyBoughtList = this;
	alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

//ShoppingListCheckOffService setting
function ShoppingListCheckOffService(){
	var service = this;

	var toBuyList=[
	{name: "Cookies", quantity: 10}, 
	{name: "Cakes", quantity: 2}, 
	{name: "Apples", quantity: 3}, 
	{name: "Oranges", quantity: 30}, 
	{name: "Strawberries)", quantity: 40}];

	var alreadyBoughtList = [];

	service.moveToBoughtService = function(itemIndex){
		alreadyBoughtList.push(toBuyList[itemIndex]);
		toBuyList.splice(itemIndex, 1)
	}

	service.getToBuyItems = function(){
		return toBuyList;
	};

	service.getAlreadyBoughtItems = function(){
		return alreadyBoughtList;
	};

	// service.boughtMessage = function(){
	// 	if (toBuyList)
	// };

}

})();