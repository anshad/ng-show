/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 01:09:35
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 18:00:40
*/
(function() {
	'use strict';

	angular
	.module('app')
	.controller('ListController', ListController);

	ListController.$inject = ['$scope', '$rootScope', 'ListService'];

	function ListController($scope, $rootScope, ListService) {
		var vm = $scope;
		var rootVm = $rootScope;

		if(angular.isUndefined(vm.movies)) {
			ListService.getMovieList().then(function(res) {
				var res = res.data.page;
				vm.movies = res['content-items'].content;
				rootVm.pageTitle = res.title;
				console.log(res)
			}, function(err) {
				console.log(err, 'err')
			})
		}
	}
})();