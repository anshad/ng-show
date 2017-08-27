/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 21:03:28
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 16:43:40
*/
(function() {
	'use strict';
	angular 
	.module('app')
	.directive('onScroll', OnScroll);

	// Inject dependencies
	OnScroll.$inject = ['$rootScope'];

	/**
	* Scroll directive for handling lazy load function callback
	* Usage: Attribute ( on-scroll='callback' )
	*/
	function OnScroll($rootScope) {

		return {
			restrict: 'A',
			scope: {
				'method': '&onScroll'
			},
			link: function (scope, element, attrs) { 
				
				var raw = element[0];

				// bind scroll event
				element.bind('scroll', function(e) {
					var height = raw.scrollTop + raw.offsetHeight;

					height = Math.round(height);

					// check if user reached at the bottom and no service call pending
					if (height >= raw.scrollHeight && !$rootScope.busy) { 
						var evt = window.event || e;      
						evt = evt.originalEvent ? evt.originalEvent : evt; 
						var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;
						
						// scroll down only
						if(delta < 0 || typeof delta === 'undefined') {
							scope.method()(true);
						}   
					} 
				});
			}
		};
	}
})();