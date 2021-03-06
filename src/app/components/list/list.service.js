/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 17:37:39
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 16:46:25
*/
(function() {
	'use strict';

	angular
	.module('app')
	.service('ListService', ListService);

	// Inject dependencies
	ListService.$inject = ['UtilService'];

	/**
	* Service for handling list page logic
	*/
	function ListService(UtilService) {

		/**
		* Get paginated movie list from json file
		*/
		this.getMovieList = function(req){
			var url = UtilService.rawFilePath + UtilService.rawFileName + req.pageNum + '.json';
			return UtilService.requestGet(url);
		};
	}
})();