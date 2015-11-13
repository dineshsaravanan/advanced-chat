(function() {
  'use strict';

  angular
    .module('Mipoz')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider, $compileProvider) {
    // Enable log
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);
  }
})();
