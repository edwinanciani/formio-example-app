(function() {
  'use strict';

  angular
    .module('formioApp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($rootScope,$state,$scope,Formio, FormioAlerts,AppConfig) {
    $rootScope.whenReady.then(function () {

      if (!$rootScope.authenticated) {
        $state.go('auth.login');
      }
    });
    $scope.formUrl = AppConfig.forms.homeForm;
    $scope.form = new Formio(AppConfig.forms.homeForm);
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
