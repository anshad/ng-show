/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-25 00:43:53
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 13:15:16
*/
(function() {
	'use strict';

	angular
	.module('app',['app.templates','ui.bootstrap','ui.router'])
	.run(Run);

	Run.$inject = ['$rootScope', '$state', '$stateParams'];

	function Run($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}
})();