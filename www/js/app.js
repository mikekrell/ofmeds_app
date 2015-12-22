
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

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

    //var push = new Ionic.Push({
    //  "debug": true
    //});
    //
    //push.register(function(token) {
    //  console.log("Device token:",token.token);
    //});
    //
    //initPushwoosh();
  });
})

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        // MAIN APP
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/app/ion_nav_view.html",
                controller: 'AppCtrl'
            })
            .state('app.menu', {
                url: "/menu",
                views: {
                    'appContent': {
                        templateUrl: "templates/app/menu.html"
                    }
                }
            })
            .state('app.product_menu', {
              url: "/menu/:cateId",
              controller: 'MenuCtrl',
              views: {
                'appContent': {
                  templateUrl: "templates/app/product_menu.html"
                }
              }
            })
            .state('app.product_detail',{
              url: "/products/:productId",
              controller: "ProductDetailCtrl",
              views: {
                'appContent': {
                  templateUrl: "templates/app/product_detail.html"
                }
              }
            })
            .state('app.product_review',{
              url: "/reviews/:productId",
              controller: "ReviewCtrl",
              views: {
                'appContent': {
                  templateUrl: "templates/app/product_review.html"
                }
              }
            })
            .state('app.shopping_cart', {
                url: "/shopping_cart",
                views: {
                    'appContent': {
                        templateUrl: "templates/app/shopping_cart.html"
                    }
                }
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'appContent': {
                        templateUrl: "templates/app/settings.html"
                    }
                }
            })
            .state('app.profile', {
                url: "/profile",
                views: {
                    'appContent': {
                        templateUrl: "templates/app/profile.html"
                    }
                }
            })
            .state('app.scan', {
                url: "/scan",
                views: {
                  'appContent': {
                    templateUrl: "templates/app/scan.html"
                  }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/menu');
    });
