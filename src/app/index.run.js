(function() {
  'use strict';

  angular
    .module('formioApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, AppConfig,FormioAuth,Formio,$state,$stateParams) {
    $log.debug('runBlock end');
    FormioAuth.init();

    // Add the forms to the root scope.
    angular.forEach(AppConfig.forms, function(url, form) {
      $rootScope[form] = url;
    });
  }

})();
