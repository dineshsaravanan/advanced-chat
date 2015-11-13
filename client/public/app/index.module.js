(function() {
  'use strict';

  angular
    .module('Mipoz', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngAria',
      'ngRoute',
      'ui.bootstrap',
      'btford.socket-io',
      'MipozLibs',
      'MipozServices'
    ])
    .factory('MipozSocket', function(socketFactory) {
      return socketFactory({
        ioSocket: io.connect('/')
      });
    });
})();
