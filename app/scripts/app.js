'use strict';

/**
 * @ngdoc overview
 * @name urlShortenerApp
 * @description
 * # urlShortenerApp
 *
 * Main module of the application.
 */
angular.module('urlShortenerApp', [])
    .constant("Config", {
        "FIREBASE_URL": "https://short-url-i21.firebaseio.com/",
        "DOMAIN_URL": "http://interstate21.com/s/"
    })
    .constant("Errors", {
        "INVALID_URL": "Invalid URL. Please check the URL you entered.",
        "SHORTNAME_TAKEN": "The short name you entered is already taken. Please try a different one."
    });
