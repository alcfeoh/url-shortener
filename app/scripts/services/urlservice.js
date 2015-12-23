'use strict';

/**
 * @ngdoc Url Shortener service
 * @name urlShortenerApp.urlService
 * @description
 * # urlService
 * Service in the urlShortenerApp. Allow to generate short urls.
 */
angular.module('urlShortenerApp')
  .service('urlService', function ($q, $http, Config, Errors) {

      var vm = this;

      vm.shortenUrl = function(url, shortName){
        var deferred = $q.defer();
        if (! url.startsWith("http"))
          url = "http://"+ url;
        this.checkUrl(url).then(
            function(){
              if (! shortName)
                shortName = vm.generateShortName();
              vm.checkIfAvailable(shortName).then(function(){
                console.log("Persisting short name: "+ shortName +" with URL: "+ url);
                vm.saveUrl(url, shortName).then(function () {
                  deferred.resolve(Config.DOMAIN_URL + shortName);
                }, function(error){
                  deferred.reject("Could not persist");
                })

              }, function(){
                console.log("Trying again with a different short name");
                vm.shortenUrl(url);
              });
            }, function(){
              console.log("The URL entered is not valid: " +url);
              deferred.reject(Errors.INVALID_URL);
            }
        )
        return deferred.promise;
      }

      vm.saveUrl = function(url, shortName){
        return $http.put(Config.FIREBASE_URL + shortName + ".json", '"'+url+'"');
      }

      vm.checkUrl = function(url){
        var deferred = $q.defer();
         $http.get(Config.DOMAIN_URL + "tester.php?q="+url).then(
             function(result){
               if (result.data)
                  deferred.resolve();
               else
                  deferred.reject();
             },function(error){
               deferred.reject();
             });
        return deferred.promise;
      }

      vm.checkIfAvailable = function(shortName) {
        var deferred = $q.defer();
        console.log("Checking availability of short name: " + shortName);
        $http.get(Config.FIREBASE_URL + shortName + ".json").then(
            function(result){
              if (! result.data){
                console.log("Short name available: " + shortName);
                deferred.resolve();
              }
            }, function(){
              console.log("Short name NOT available: " + shortName);
              deferred.reject();
            }
        );
        return deferred.promise;
      }

      vm.generateShortName = function() {
        var text = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 7; i++ )
          text += chars.charAt(Math.floor(Math.random() * chars.length));
        return text;
      }

  });
