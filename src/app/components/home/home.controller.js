/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 12:52:37
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 13:21:43
*/
(function(){
	'use strict';

	angular
	.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$rootScope'];

	function HomeController($scope, $rootScope) {

		var vm = $scope;
		var rootVm = $rootScope;

		rootVm.pageTitle = 'Home';

	}

})();