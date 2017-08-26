/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:43:53
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 00:13:18
*/
(function() {
	'use strict';

	angular
	.module('app',['ui.bootstrap','ui.router'])
	.run(Run);

	Run.$inject = ['$rootScope', '$state', '$stateParams'];

	function Run($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}
})();