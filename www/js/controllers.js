angular.module('ofmeds_app.controllers', [])


    .controller('IntroCtrl', function ($scope) {

    })

    .controller('AppCtrl', function ($scope, $ionicPlatform, Cates, Products, Carts) {

        $scope.cates = Cates.all();
        $scope.productData = {};

        $scope.carts = Carts.all();

        $scope.goBack = function () {
            window.history.back();
        };
    })
    .controller('ScanCtrl', function ($scope, $ionicModal, $ionicPlatform, $cordovaBarcodeScanner, $state, $stateParams, Products ) {

      $ionicModal.fromTemplateUrl('templates/app/product_detail.html', {
        scope: $scope ,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      // Triggered in the product modal to close it
      $scope.closeModal = function () {
        $scope.modal.hide();
        $state.go('product_menu', {'cateId': 'Flower' });
      };

      $scope.scan = function () {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
          if(!imageData.cancelled){
            $scope.product = Products.getById(imageData.text);
            $scope.modal.show();
          }else {
            alert('Cancelled');
          }
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
          console.log("An error happened -> " + error);
        });
      }
    })
    .controller('ProductMenuCtrl', function ( $scope, $ionicModal, $timeout, $state, $stateParams, Cates, Products) {
        $scope.cate = Cates.get($stateParams.cateId);

        $scope.products = Products.all();
        $scope.productByCate = Products.getByCate($stateParams.cateId);

        $ionicModal.fromTemplateUrl('templates/app/product_detail.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
        // Triggered in the product modal to close it
        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.doOrder = function () {
            $state.go("app.shopping_cart");
            $timeout(function () {
                $scope.closeModal();
            }, 1000);
        };

        // Click like product
        $scope.doLike = function(){
            var btn_like = angular.element(document.querySelector('.product-like'));
            btn_like.find('i').toggleClass('active');
        }
        // Open the product modal
        $scope.productDetail = function ($id) {
            $scope.product = Products.getById($id);
            $scope.modal.show();
        };

        $scope.goBack = function () {
            window.history.back();
        };

    })

