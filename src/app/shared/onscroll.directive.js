/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-26 21:03:28
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-26 21:39:06
*/
(function() {
	'use strict';
	angular 
	.module('app')
	.directive('onScroll', OnScroll);

	OnScroll.$inject = ['$rootScope'];

	function OnScroll($rootScope) {

		return {
			restrict: 'A',
			scope: {
				'method': '&onScroll'
			},
			link: function (scope, element, attrs) { 
				
				var raw = element[0];

				element.bind('scroll', function(e) {
					var height = raw.scrollTop + raw.offsetHeight;

					height = Math.round(height);

					if (height >= raw.scrollHeight && !$rootScope.busy) { 
						var evt = window.event || e;      
						evt = evt.originalEvent ? evt.originalEvent : evt; 
						var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;
						
						if(delta < 0 || typeof delta === 'undefined') {
							scope.method()(true);
						}   
					} 
				});
			}
		};
	}
})();