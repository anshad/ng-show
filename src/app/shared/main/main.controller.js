/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:57:10
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 13:16:25
*/
(function() {
	'use strict';

	angular
	.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ['$scope', '$rootScope', '$transitions'];

	function MainController($scope, $rootScope, $transitions) {
		var vm = $scope;
		var rootVm = $rootScope;
		rootVm.prevState = 'main.home';

		$transitions.onSuccess({}, function(trans) {
			rootVm.prevState = trans.$from().name;
			console.log(trans.$to(), trans.$from());
		});
	}
})();