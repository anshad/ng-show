/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 01:09:35
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 12:38:45
*/
(function() {
	'use strict';

	angular
	.module('app')
	.controller('ListController', ListController);

	ListController.$inject = ['$scope', '$rootScope'];

	function ListController($scope, $rootScope) {
		var vm = $scope;
		var rootVm = $rootScope;

		rootVm.pageTitle = 'Romantic Comedy';

		console.log('list controller')
	}
})();