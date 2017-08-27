/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:43:53
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 16:41:02
*/
(function() {
	'use strict';

	angular
	.module('app',['ui.bootstrap','ui.router'])
	.run(Run);

	// Inject dependencies
	Run.$inject = ['$rootScope', '$state', '$stateParams'];

	/**
	* Bootrap configuration for the app
	*/
	function Run($rootScope, $state, $stateParams) {

		// Get the state for using in template files ($state.go in HTML)
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}
})();