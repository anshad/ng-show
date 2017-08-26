/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:50:48
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 13:32:18
*/
(function() {
	'use strict';

	angular
	.module('app')
	.config(Config);

	Config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function Config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/list'); 

		$stateProvider
		.state('main', {
			url: '',
			templateUrl: 'shared/main/main.html',
			controller: 'MainController',
			abstract:true
		})
		.state('main.home', {
			url: '/home',
			templateUrl: 'components/home/home.html',
			controller: 'HomeController'
		})
		.state('main.list', {
			url: '/list',
			templateUrl: 'components/list/list.html',
			controller: 'ListController'
		});
	}
})();