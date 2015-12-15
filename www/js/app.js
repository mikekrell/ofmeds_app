// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ofmeds_app', ['ionic','ngCordova','ionic.service.core', 'ofmeds_app.controllers', 'ofmeds_app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
    });

    initPushwoosh();
  });
})

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('intro', {
                url: "/intro",
                templateUrl: "templates/intro.html",
                controller: 'IntroCtrl'
            })

            .state('product_menu', {
                url: "/product/menu/:cateId",
                templateUrl: "templates/app/product_menu.html",
                controller: 'ProductMenuCtrl'
            })

            // MAIN APP
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/app/ion_nav_view.html",
                controller: 'AppCtrl'
            })
            .state('app.category', {
                url: "/category",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/category.html"
                    }
                }
            })
            .state('app.shopping_cart', {
                url: "/shopping_cart",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/shopping_cart.html"
                    }
                }
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/settings.html"
                    }
                }
            })
            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/profile.html"
                    }
                }
            })
            .state('app.scan', {
                url: "/scan",
                views: {
                  'menuAppContent': {
                    templateUrl: "templates/app/scan.html"
                  }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/category');
    });
