/*
* @Author: Anshad Vattapoyil
* @Date:   2017-08-27 00:35:20
* @Last Modified by:   Anshad Vattapoyil
* @Last Modified time: 2017-08-27 14:29:22
*/
describe('Testing Controller', function() {
	var scope,controller;

	beforeEach(function(){
		module('app');
	});

	describe('home controller', function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			controller = $controller('HomeController', {
				'$scope': scope
			});
		}));
		it('page title', function() {
			expect(scope.pageTitle).toEqual('Home');
		});
	});

	describe('main controller', function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			controller = $controller('MainController', {
				'$scope': scope
			});
		}));
		it('prev state', function() {
			expect(scope.prevState).toEqual('main.home');
		});
	});

	describe('list controller', function () {
		beforeEach(inject(function ($rootScope, $controller) {
			scope = $rootScope.$new();
			controller = $controller('ListController', {
				'$scope': scope
			});
		}));

		it('page num', function() {
			expect(scope.pageNum).toEqual(1);
		});
	});
});