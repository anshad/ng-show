/*
 * @Author: Anshad Vattapoyil
 * @Date:   2017-08-25 00:50:48
 * @Last Modified by:   Anshad Vattapoyil
 * @Last Modified time: 2017-08-27 16:43:03
 */
(function () {
  'use strict';

  angular.module('app').config(Config);

  // Inject dependencies
  Config.$inject = ['$stateProvider', '$urlRouterProvider'];

  /**
   * Configure the app (routing)
   */
  function Config($stateProvider, $urlRouterProvider) {
    // unknown/default routes handler
    $urlRouterProvider.otherwise('/list');

    $stateProvider
      .state('main', {
        // Layout/shared
        url: '',
        templateUrl: '/shared/main/main.html',
        controller: 'MainController',
        abstract: true,
      })
      .state('main.home', {
        // Home page
        url: '/home',
        templateUrl: '/components/home/home.html',
        controller: 'HomeController',
      })
      .state('main.list', {
        // List page
        url: '/list',
        templateUrl: '/components/list/list.html',
        controller: 'ListController',
      });
  }
})();
