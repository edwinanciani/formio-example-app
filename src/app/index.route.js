(function() {
  'use strict';

  angular
    .module('formioApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $injector, FormioAuthProvider, FormioProvider, AppConfig, FormioResourceProvider) {
    FormioProvider.setAppUrl(AppConfig.appUrl);
    FormioProvider.setBaseUrl(AppConfig.apiUrl);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('success', {
        url: '/success',
        templateUrl: 'app/home/success.html'
      })
      .state('auth', {
        url: '/auth',
        abstract:true,
        templateUrl: 'views/user/auth.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'views/user/portal.html',   controller: ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {

          $rootScope.whenReady.then(function () {
            if ($rootScope.authenticated) {
              console.log($rootScope);
              $state.go('home');
            }
            else {
              /* eslint-disable angular/window-service */
              window.localStorage.clear();
            }
          })
          $scope.$on('formSubmission', function (err, submission) {
            if (!submission) {
              return;
            }
            $rootScope.setUser(submission, 'user');
            $state.go('home');
          });
        }]
      })


    // Register all of the resources.
    angular.forEach(AppConfig.resources, function(resource, name) {
      FormioResourceProvider.register(name, resource.form, $injector.get(resource.resource + 'Provider'));
    });

    $urlRouterProvider.otherwise('/');
  }

})();
