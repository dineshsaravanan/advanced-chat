(function() {
  'use strict';
  angular
    .module('Mipoz')
    .config(routerConfig);

  function routerConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/home/home.html',
        controller: 'HomeController',
        title: 'Mipoz'
      })
      .when('/session/:userName', {
        templateUrl: 'app/components/session/session.html',
        controller: 'SessionController',
        reloadOnSearch: true,
        title: 'Mipoz'
      })
      .otherwise({
        redirectTo: '/',
        title: 'Mipoz'
      });
  }
})();
