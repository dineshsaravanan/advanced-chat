'use strict';

angular.module('MipozLibs')
.factory('WL', function() {
  return {
    log: function(scope, scopeHash) {
      if (scopeHash === undefined) {
        scopeHash = {};
      }

      if (!scope || scopeHash[scope.$id] !== undefined) {
        return 0;
      }

      var watchCount = 0;

      if (scope.$$watchers) {
        watchCount = scope.$$watchers.length;
      }

      scopeHash[scope.$id] = watchCount;

      watchCount += this.log(scope.$$childhead, scopeHash);
      watchCount += this.log(scope.$$nextSibling, scopeHash);

      return watchCount;
    }
  }
});
