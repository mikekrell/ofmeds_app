angular.module('ofmeds_app.controllers', [])



    .controller('AppCtrl', function ($scope, $ionicPlatform, Cates, Products, Carts) {
        $scope.cates = Cates.all();
        $scope.carts = Carts.all();

        $scope.goBack = function () {
          window.history.back();
        };
    })
    .controller('MenuCtrl', function ($scope, $ionicModal, $timeout, $state, $stateParams, Cates, Products){
      //load products by category for menu
      Products.getByCate($stateParams.cateId.capitalizeFirstLetter()).then(function(res){
        $scope.productByCate = res;
      })

    })
    .controller('ProductDetailCtrl', function($scope, $timeout, $state, $stateParams, Cates, Products){
      //load individual product for details
      $scope.loading = true;
      Products.getById($stateParams.productId).then(function(res){
        $scope.product = res;
        $scope.loading = false;
      });

    })
    .controller('ReviewCtrl', function ($scope, $timeout, $state, $stateParams, Cates, Products){
      Products.getById($stateParams.productId).then(function(res){
        $scope.product = res;
      });
    })
    .controller('ScanCtrl', function ($scope, $ionicModal, $ionicPlatform, $cordovaBarcodeScanner, $state, $stateParams, Products ) {

      $scope.scan = function () {

        $cordovaBarcodeScanner.scan().then(function(imageData) {
          //if scan is not cancelled
          if(!imageData.cancelled){
            //look for the product by scanned id
            var scanCode = JSON.parse(imageData.text);
            Products.getById(scanCode.productId).then(function(res){              //if successful, check which type of code, take app to product detail or review
              if (scanCode.scanType === "review"){
                $state.go('app.product_review', {productId : scanCode.productId})
              }else {
                $state.go('app.product_detail', {productId : scanCode.productId})
              }

            }), function (error){
              alert('an error occured');
            };
          }else {
            alert('Cancelled');
          }

        }, function(error) {

          console.log("An error happened -> " + error);

        });

      }

    })
    .controller('ProductMenuCtrl', function ( $scope, $ionicModal, $timeout, $state, $stateParams, Cates, Products) {

      $scope.cate = Cates.get($stateParams.cateId);
      $scope.goBack = function () {
          window.history.back();
      };

    })

