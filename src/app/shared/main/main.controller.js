/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:57:10
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 16:45:24
*/
(function() {
	'use strict';

	angular
	.module('app')
	.controller('MainController', MainController);

	// Inject dependencies
	MainController.$inject = ['$scope', '$rootScope', '$transitions'];

	/**
	* Main/Shared controller (abstract)
	*/
	function MainController($scope, $rootScope, $transitions) {
		var vm = $scope;
		var rootVm = $rootScope;
		
		rootVm.prevState = 'main.home';

		// state/URL change
		$transitions.onSuccess({}, function(trans) {
			// keep prev state for back navigation
			rootVm.prevState = trans.$from().name;
		});
	}
})();