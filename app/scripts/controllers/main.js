'use strict';

/**
 * @ngdoc function
 * @name urlShortenerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urlShortenerApp
 */
angular.module('urlShortenerApp')
  .controller('MainCtrl', function ($scope, urlService) {

    $scope.shortenUrl = function(urlToShorten, shortName) {
      $scope.error =  null;
      urlService.shortenUrl(urlToShorten, shortName).then(
          function(shortUrl){
            $scope.shortUrl = shortUrl;
          },
          function(error){
            $scope.error = error;
          }
      )
    }

  });
