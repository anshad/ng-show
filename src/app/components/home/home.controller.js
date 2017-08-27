/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 12:52:37
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 16:49:15
*/
(function(){
	'use strict';

	angular
	.module('app')
	.controller('HomeController', HomeController);

	// Inject dependencies
	HomeController.$inject = ['$scope', '$rootScope'];

	/**
	* Controller for /home page
	*/
	function HomeController($scope, $rootScope) {
		var vm = $scope;
		var rootVm = $rootScope;

		rootVm.pageTitle = 'Home';
	}

})();