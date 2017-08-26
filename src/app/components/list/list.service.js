/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 17:37:39
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 17:45:44
*/
(function() {
	'use strict';

	angular
	.module('app')
	.service('ListService', ListService);

	ListService.$inject = ['UtilService'];

	function ListService(UtilService) {
		this.getMovieList = function(){
			return UtilService.requestGet('json/CONTENTLISTINGPAGE-PAGE1.json');
		}
	}
})();