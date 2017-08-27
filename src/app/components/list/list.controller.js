/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 01:09:35
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 15:06:43
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

		rootVm.busy = false;
		vm.pageNum = 1;
		vm.loadMovies = loadMovies;

		if(angular.isUndefined(vm.movies)) {
			vm.loadMovies();
		}

		/**
		* Load movies from service
		*/
		function loadMovies() {
			if (!rootVm.busy) {
				rootVm.busy = true;
				ListService.getMovieList({pageNum:vm.pageNum}).then(function(res) {
					res = res.data.page;
					rootVm.pageTitle = res.title;
					vm.totalMovies = res['total-content-items'];
					if(angular.isUndefined(vm.moviesListed)) {
						vm.movies = res['content-items'].content;
						vm.moviesListed = parseInt(res['page-size-returned']);
					} else {
						vm.movies = vm.movies.concat(res['content-items'].content);
						vm.moviesListed+= parseInt(res['page-size-returned']);
					}
					if (vm.moviesListed < vm.totalMovies) {
						rootVm.busy = false;
						vm.pageNum++;
					} else {
						rootVm.busy = true;
					}
				}, function(err) {
					console.log(err, 'err');
				});
			}
		}
	}
})();