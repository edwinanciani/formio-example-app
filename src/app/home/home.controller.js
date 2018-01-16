(function() {
  'use strict';

  angular
    .module('formioApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($rootScope,$state,$scope,Formio, FormioAlerts) {
    $rootScope.whenReady.then(function () {

      if (!$rootScope.authenticated) {
        $state.go('auth.login');
      }
    });
    $scope.form = new Formio('https://example.form.io/example');
    $scope.submission = {};

    $scope.$on('formSubmit',function (event) {
      event.preventDefault();
    })
    $scope.$on('buttonClick', function (event,sub,a) {
      var submission = angular.copy($scope.submission);
      (new Formio($scope.form.submissionsUrl)).
      saveSubmission(submission).then(function (sub) {
        console.log(sub);
        FormioAlerts.addAlert( 'success', 'Submission Created');
        $state.go('success');
      },function (err) {
        FormioAlerts.onError( err)
      });
    });
  }
})();
