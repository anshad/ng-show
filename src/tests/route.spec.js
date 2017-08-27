/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-27 11:28:06
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 12:23:24
*/
describe('Testing Routes', function(){
	var $rootScope, $state, $injector, state;
	beforeEach(function(){
		module('app');

		inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
			$rootScope = _$rootScope_;
			$state = _$state_;
			$injector = _$injector_;

			state = $state.get('main.list');
		});
	});

	it('should respond to URL', function() {
		expect($state.href('main.home')).toEqual('#!/home');
		expect($state.href('main.list')).toEqual('#!/list');
	});

	it('uses the right controller', function () {
		expect(state.controller).toEqual('ListController');
	});

	it('uses the right template', function () {
		expect(state.templateUrl).toEqual('components/list/list.html');
	});
});
