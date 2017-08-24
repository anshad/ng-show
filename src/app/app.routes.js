/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:50:48
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-25 01:22:27
*/
(function() {
	'use strict';

	angular
	.module('app')
	.config(Config);

	Config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function Config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home'); 

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'components/home/home.html',
			controller: 'HomeController'
		})
		.state('list', {
			url: '/list',
			templateUrl: 'components/list/list.html',
			controller: 'ListController'
		});
	}
})();