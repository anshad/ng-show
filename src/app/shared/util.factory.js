/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 17:22:27
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 16:43:57
*/
(function(){
	'use strict';

	angular
	.module('app')
	.factory('UtilService', UtilService);

	// Inject dependencies
	UtilService.$inject = ['$http', '$q'];

	/**
	* Common Utility factory for injecting across the app
	*/
	function UtilService($http, $q) {
		return {
			requestGet: requestGet,
			handleResponse: handleResponse,
			rawFilePath: 'json/',
			rawFileName: 'CONTENTLISTINGPAGE-PAGE'
		};

		/*
		* Generate HTTP Get request
		*/
		function requestGet(url, params) {
			return handleResponse($http.get(url, { params: params }));
		}

		/*
		* Handle HTTP service call promise
		*/
		function handleResponse(req) {
			var deferred = $q.defer();

			req.then(function(result) {
				if (result) {
					var status = result.status;

					if (angular.isDefined(status)) {
						if (status === 200) {
							deferred.resolve(result);
						} else {
							deferred.reject(result);
						}
					} else {
						deferred.resolve(result);
					}
				} else {
					deferred.resolve(null);
				}
			}, function(error) {
				deferred.reject({
					'status': error.status,
					'detail': error.statusText
				});
			});
			return deferred.promise;
		}
	}
})();