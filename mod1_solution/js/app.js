//app.js
//the number of items less than or equal to 3 -> Enjoy!
// the number of items is greater than 3  -> Too much!
//empty-> Please enter data first

(function(){
'use strict';

angular.module('LunchCheck', [] )
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject =['$scope'];

function LunchCheckController($scope) {
	$scope.menulist="";

	$scope.itemNumber=function(){ //get the number of items
		var i=splitString().length;
		if (i==3 || i<3){
			$scope.message = "Enjoy!";
		}

		else if (i>3){
			$scope.message = "Too much!";
		}
		else {
			$scope.message ='Please enter data first';
		}
		return;

	};

	function splitString(menulist,comma) {
		var comma=","
		var arrayOfStrings = menulist.split(comma)
		
	}
	return splitString(menulist, comma)

}

})();