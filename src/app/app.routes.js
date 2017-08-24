/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:50:48
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-25 00:54:52
*/
(function() {
	'use strict';

	angular
	.module('app.routes', ['ui.router'])
	.config(Config);

	Config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function Config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home'); 

		$stateProvider

        // Home
        .state('home', {
        	url: '/home',
        	templateUrl: 'components/home/home.html',
        	controller: 'HomeController'
        });
    }
})();