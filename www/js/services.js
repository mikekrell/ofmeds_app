var app = angular.module('ofmeds_app.services', [])
app.factory('PushWoosh', function ($q, $rootScope, $window) {

  $window.addEventListener('push-notification', function (event) {

    var notification = {};

    if (ionic.Platform.isIOS()) {
      notification.title = event.notification.aps.alert;
      notification.meta = event.notification.userdata;
    }

    if (ionic.Platform.isAndroid()) {
      notification.title = event.notification.title;
      notification.meta = event.notification.userdata;
    }

    // Not tested
    if (ionic.Platform.isWindowsPhone()) {
      notification.title = event.notification.content;
      notification.meta = event.notification.userdata;
    }
    alert(event.notification.content);
    $rootScope.$broadcast('event:push-notification', notification);

  });

  return {

    init: function (pwAppId, googleProjectNumber) {

      var defer = $q.defer();

      if (!pwAppId) {
        defer.reject('Please provide your pushwoosh app id.');
      }

      else if (!window.plugins || !window.plugins.pushNotification) {
        defer.reject('Push Notification not enabled.');
      }

      else {

        var pushNotification = window.plugins.pushNotification;

        if (ionic.Platform.isIOS()) {
          pushNotification.onDeviceReady({pw_appid: pwAppId});
        }

        if (ionic.Platform.isAndroid()) {
          pushNotification.onDeviceReady({projectid: googleProjectNumber, appid: pwAppId});
        }

        // Not tested
        if (ionic.Platform.isWindowsPhone()) {
          pushNotification.onDeviceReady({appid: pwAppId, serviceName: ''});
        }

        defer.resolve();

      }

      return defer.promise;

    },

    registerDevice: function () {

      var defer = $q.defer();

      var pushNotification = window.plugins.pushNotification;

      pushNotification.registerDevice(
        function (status) {

          var deviceToken;

          if (ionic.Platform.isIOS()) {
            deviceToken = status.deviceToken;
          }

          if (ionic.Platform.isAndroid()) {
            deviceToken = status;
          }

          // Not tested
          if (ionic.Platform.isWindowsPhone()) {
            deviceToken = status;
          }

          defer.resolve(deviceToken);

        },
        function (status) {
          defer.reject(status);
        }
      );

      return defer.promise;

    }

  }

});
app.factory('Cates', function () {
  // Might use a resource here that returns a JSON array
  function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  // Some fake testing data
  var cates = [{
    id: 'flower',
    class: 'item-1',
    img: 'img/category/1.jpg',
    name: 'Flowers',
    lastText: 'The finest selection of flowers.'
  }, {
    id: 'concentrate',
    class: 'item-2',
    img: 'img/category/2.jpg',
    name: 'Concentrates',
    lastText: 'All the best concentrates.'
  }, {
    id: 'edible',
    class: 'item-3',
    img: 'img/category/3.jpg',
    name: 'Edibles',
    lastText: 'Delicious Edibles.'
  }, {
    id: 'other',
    class: 'item-4',
    img: 'img/category/4.jpg',
    name: 'Other',
    lastText: 'From creams to rubs, we\'ve got it all'
  }, {
    id: 'special',
    class: 'item-5',
    img: 'img/category/5.jpg',
    name: 'Specials',
    lastText: 'Our weekly specials.'
  }];

  return {
    all: function () {
      return cates;
    },
    get: function (cateId) {
      for (var i = 0; i < cates.length; i++) {
        if (cates[i].id === cateId) {
          return cates[i];
        }
      }
      return null;
    }
  };
});

app.service('Products', function ($q) {
  var leaflyProducts = [
    {
      "name": "Apothecanna Pain Creme ",
      "description": "THC: .015% / CBD: .01%\n8oz bottle: $48\nMoisturizing body cream w/anti-inflammatory plant extracts (arnica, peppermint, juniper & cannabis).",
      "addedOn": "/Date(1426096713580+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Apothecanna Pain Spray ",
      "description": "THC: .03% / CBD: .01%\n2 fl. oz bottle \nFast acting, pain relieving body spray w/organic essential oils & plant extracts (arnica, peppermint, juniper & cannabis). Cooling & invigorating. ",
      "addedOn": "/Date(1426097975119+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 32
        }
      ]
    },
    {
      "name": "BHO Sugar Wax - Golden Pineapple",
      "description": "Domo Productions | Sativa Dominant Hybrid | THC: 80.55%| CBD: 0.10%",
      "addedOn": "/Date(1446948772653+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/hybrid/golden-pineapple/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 30
        }
      ],
      "strainInfo": {
        "slug": "golden-pineapple",
        "name": "Golden Pineapple",
        "category": "Hybrid",
        "rating": 4.6,
        "ratingCount": 127,
        "symbol": "Gp",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/5/240?color=fcc91d"
      }
    },
    {
      "name": "BHO Sugar Wax - Gorilla Glue #4",
      "description": "Domo Productions | Indica Dominant Hybrid | THC: 79.31% | CBD: 0.14%",
      "addedOn": "/Date(1446948999602+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 30
        }
      ]
    },
    {
      "name": "BHO: Golden-White",
      "description": "Domo Productions | Sativa Dominant Hybrid | THC: 70.32% | CBD: 0.17%",
      "addedOn": "/Date(1446949528315+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 30
        }
      ]
    },
    {
      "name": "BHO: Holiday Sativa Medley",
      "description": "Ideal Farms | Dab Society | THC: 73.0% | CBD: 3.68% ",
      "addedOn": "/Date(1448744357780+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 30
        }
      ]
    },
    {
      "name": "BHO: Legend-Lime ",
      "description": "Domo Productions | Hybrid | THC: 71.05% | CBD: 0.19%",
      "addedOn": "/Date(1446949421207+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 30
        }
      ]
    },
    {
      "name": "BHO-Buddha's Grape Dream",
      "description": "By Franco's Finest\nTHC: 70.88%\nCBD: 0.21%",
      "addedOn": "/Date(1436832963150+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "HalfGram",
          "Price": 25
        }
      ]
    },
    {
      "name": "BHO-Critical Mass",
      "description": "Ideal Farms\nTHC: 32.5%\nCBD: 45.3%",
      "addedOn": "/Date(1435105267011+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/indica/critical-mass/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ],
      "strainInfo": {
        "slug": "critical-mass",
        "name": "Critical Mass",
        "category": "Indica",
        "rating": 4.1,
        "ratingCount": 332,
        "symbol": "Cm",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "BHO-Dutch Treat ",
      "description": "Sterling Gold Extracts|Hybrid|THC:73.64%|0.32%",
      "addedOn": "/Date(1442959914835+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "BHO-Emerald Jack",
      "description": "Dab Society | Ideal Farms | THC: 87.08% | CBD: 0.57%",
      "addedOn": "/Date(1446594009351+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/sativa/emerald-jack/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ],
      "strainInfo": {
        "slug": "emerald-jack",
        "name": "Emerald Jack",
        "category": "Sativa",
        "rating": 4.5,
        "ratingCount": 39,
        "symbol": "Ejk",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "BHO-Jammie Dodger",
      "description": "By Geek Farms\nTHC: 78.9%\nCBD: 0.26%",
      "addedOn": "/Date(1437427784918+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 45
        }
      ]
    },
    {
      "name": "BHO-Matanuska Thunderf*ck",
      "description": "Sativa-Dominant Hybrid|sofresh farms|Dab Society|THC: 72.4% CBD: <LOQ",
      "addedOn": "/Date(1445205713444+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "BHO-Nuken",
      "description": "Indica|sofresh farms|Dab Society|THC: 77.3% CBD: <LOQ",
      "addedOn": "/Date(1445205858844+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "BHO-Querkle",
      "description": "By Geek Farms\nTHC: 77.7%\nCBD: 0.36%",
      "addedOn": "/Date(1436833209465+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/indica/querkle/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 22
        }
      ],
      "strainInfo": {
        "slug": "querkle",
        "name": "Querkle",
        "category": "Indica",
        "rating": 4.3,
        "ratingCount": 159,
        "symbol": "Que",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "BHO-Rose City Cinex",
      "description": "Sativa-Dominant Hybrid|sofreshfarms|Dab Society|THC: 69.2% CBD: <LOQ",
      "addedOn": "/Date(1445205926526+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/sativa/cinex/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ],
      "strainInfo": {
        "slug": "cinex",
        "name": "Cinex",
        "category": "Sativa",
        "rating": 4.2,
        "ratingCount": 444,
        "symbol": "Cnx",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "BHO-Secret Agent 007",
      "description": "By Franco's Finest\nTHC: 74.28%\nCBD: 0.16%",
      "addedOn": "/Date(1436832992052+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 25
        }
      ]
    },
    {
      "name": "BHO-Secret Agent 008",
      "description": "By Franco's Finest\nTHC: 74.38%\nCBD: 0.11%",
      "addedOn": "/Date(1436833025723+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 25
        }
      ]
    },
    {
      "name": "BHO-Sour Diesel",
      "description": "Sofresh Farms|Sativa|THC: 70.0% CBD: <LOQ",
      "addedOn": "/Date(1445205987877+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "BHO-Sour Tsunami",
      "description": "Sterling Gold Extracts | Hybrid | THC: 4.6% | CBD: 72.2%",
      "addedOn": "/Date(1442959663303+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 60
        }
      ]
    },
    {
      "name": "BHO-Starcatcher",
      "description": "Phyre Gardens/Nug Run | Chem Dog X OG Kush | THC:  69.61% | CBD:  <0.00%",
      "addedOn": "/Date(1431565004517+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "Black Scale -G Pro Herbal Vaporizer",
      "description": "Grenco Science | Includes: 1 rechargeable G Pro Herbal Vaporizer, 1 G Pro Mouthpiece, 1 G Pro Filter, 5 G Pro Filter Screens, 1 G Pro Cleaning Brush, 2 G Pro Extended Mouthpiece Sleeves, 3 G Pro Mouthpiece Sleeves, 1 G Pro Wired USB Charger, 1 G Card & 1 BLVCK Tray.",
      "addedOn": "/Date(1446079164496+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 120
        }
      ]
    },
    {
      "name": "Blackberry",
      "description": "RA Industries | Indica Dominant Hybrid | THC: 19.2% | CBD: 0.05%",
      "addedOn": "/Date(1446657009963+0000)/",
      "imagePath": "img/product/CK5TYRABANKS.png",
      "images" : ["img/product/CK5TYRABANKS-macro.png", "img/product/CK5TYRABANKS-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 12
        },
        {
          "Unit": "Half",
          "Price": 115
        },
        {
          "Unit": "One",
          "Price": 220
        }
      ],
      "strainInfo": {
        "slug": "blackberry",
        "name": "Blackberry",
        "category": " Indica Dominant Hybrid ",
        "rating": 4.1,
        "ratingCount": 354,
        "symbol": "Bbr",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 22,
      "farm": "RA Industries ",
      "hasInfo": true,
      "thc": " 19.2% ",
      "cbd": " 0.05%"
    },
    {
      "name": "Blackwater OG",
      "description": "Ripped City Gardens | Indica | THC: 27.2% |CBD: 0.09%",
      "addedOn": "/Date(1442546115087+0000)/",
      "imagePath": "img/product/BLACKBETTY-SoFreshFarms.png",
      "images" : ["img/product/BLACKBETTY-SoFreshFarms-macro.png", "img/product/BLACKBETTY-SoFreshFarms-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 14
        },
        {
          "Unit": "Half",
          "Price": 125
        },
        {
          "Unit": "One",
          "Price": 240
        }
      ],
      "strainInfo": {
        "slug": "blackwater",
        "name": "Blackwater",
        "category": " Indica ",
        "rating": 4.5,
        "ratingCount": 213,
        "symbol": "Bwr",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 23,
      "farm": "Ripped City Gardens ",
      "hasInfo": true,
      "thc": " 27.2% ",
      "cbd": " 0.09%"
    },
    {
      "name": "Blood Orange Royal Jelly",
      "description": "By Elephant Extracts\nTHC: 90.90%\nCBD: 0.07%",
      "addedOn": "/Date(1438043306976+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 60
        }
      ]
    },
    {
      "name": "Blue Dream",
      "description": "House of Concentrates | Sativa Dominant Hybrid | THC: 20.5% | CBD: 0.01%",
      "addedOn": "/Date(1448162672071+0000)/",
      "imagePath": "img/product/GIRLSCOUTCOOKIES-SonsOfAgronomy.png",
      "images" : ["img/product/GIRLSCOUTCOOKIES-SonsOfAgronomy-macro.png", "img/product/GIRLSCOUTCOOKIES-SonsOfAgronomy-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 10
        },
        {
          "Unit": "Half",
          "Price": 95
        },
        {
          "Unit": "One",
          "Price": 180
        }
      ],
      "strainInfo": {
        "slug": "blue-dream",
        "name": "Blue Dream",
        "category": " Sativa Dominant Hybrid ",
        "rating": 4.3,
        "ratingCount": 7821,
        "symbol": "Bd",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 25,
      "farm": "House of Concentrates ",
      "hasInfo": true,
      "thc": " 20.5% ",
      "cbd": " 0.01%"
    },
    {
      "name": "Bud Rub ",
      "description": "Topical\nIngredients: Organic Shea Butter, Organic Cocoa Butter, Organic Cannabis, Natural Beeswax, Organic Menthol, Camphor\n\nTHC: 21.31 mg per 1/2oz\nCBD: 0.735mg per 1/2oz",
      "addedOn": "/Date(1437430170174+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Bud Tub Soaking Salts",
      "description": "1 oz of Soaking Salts\nLavender or Eucalyptus\n\nHigh CBD Blend and High THC Blends available\n",
      "addedOn": "/Date(1427489544839+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Cannabis Cure-All Earth Blend",
      "description": "-By Luminous Botanicals-\nA blend of cannabis, organic coconut and almond oils, and therapuetic grade essential oils\n18 mg CBD and 2 mg THC per 0.8ml\n30 ml of extract per bottle",
      "addedOn": "/Date(1441230688158+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 90
        }
      ]
    },
    {
      "name": "Cannabis Cure-All Meadow Blend",
      "description": "-By Luminous Botanicals-\nA blend of cannabis, organic coconut and almond oils, and therapuetic grade essential oils\n10 mg THC and CBD per 0.8ml\n30 ml of extract per bottle",
      "addedOn": "/Date(1417464175142+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 75
        }
      ]
    },
    {
      "name": "Cannabis Cure-All Sky Blend",
      "description": "-By Luminous Botanicals-\nA blend of cannabis, organic coconut and almond oils, and therapuetic grade essential oils\n10 mg THC per 0.4ml; 30 ml extract per bottle",
      "addedOn": "/Date(1415755267458+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 60
        }
      ]
    },
    {
      "name": "Cannabis Oil",
      "description": "Mountain Sun Botanicals\nClean Green Certified flowers extracted with Organic Alcohol\nTHC: 61.71%\nCBD: 0%",
      "addedOn": "/Date(1437427975882+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 25
        }
      ]
    },
    {
      "name": "CO2 Dripper",
      "description": "Co2 Dripper - Indica Black Ice \nTHC%: 58.79\nTotal %: 62.32\n",
      "addedOn": "/Date(1442351239159+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/hybrid/golden-xtrx-co2-dabbables-h/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 25
        }
      ],
      "strainInfo": {
        "slug": "golden-xtrx-co2-dabbables-h",
        "name": "Golden XTRX CO2 Dabbables",
        "category": "Hybrid",
        "rating": 4.5,
        "ratingCount": 2,
        "symbol": "Gdx",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "CO2 Live Resin- Cuvee",
      "description": "EVOLVD | THC: 86.77% | CBD: 0.28%",
      "addedOn": "/Date(1448245970800+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "HalfGram",
          "Price": 50
        }
      ]
    },
    {
      "name": "CO2 Live Resin- Sequioa Berry",
      "description": "EVOLVD | THC: 78.17% | CBD: 0.21%",
      "addedOn": "/Date(1448246081419+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 50
        }
      ]
    },
    {
      "name": "CO2 Shatter | Golden PIneapple",
      "description": "Extracted by Evolvd | THC: 85.50% | CBDA: 0.49% | CBN: 0.58% | CBG: 0.75% | CBC: 0.36% | Clean Green Certified \n",
      "addedOn": "/Date(1441852066544+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/hybrid/golden-pineapple/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "HalfGram",
          "Price": 36
        }
      ],
      "strainInfo": {
        "slug": "golden-pineapple",
        "name": "Golden Pineapple",
        "category": "Hybrid",
        "rating": 4.6,
        "ratingCount": 127,
        "symbol": "Gp",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/5/240?color=fcc91d"
      }
    },
    {
      "name": "CO2 Stabilized Resin | Mystery Haze",
      "description": "Extracted by Evolvd | THC: 66.13% | CBD: 0.27% | Clean Green Certified",
      "addedOn": "/Date(1448228974620+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 30
        }
      ]
    },
    {
      "name": "CO2 Stablilized Resin | Cannatonic",
      "description": "Extracted by Evolvd | THC: 24.24% | CBD: 42.51% | Clean Green Certified",
      "addedOn": "/Date(1448229220830+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Half Gram",
          "Price": 35
        }
      ]
    },
    {
      "name": "Danodan Grassworks Caramels ",
      "description": "From Danodan Grassworks, 180mg",
      "addedOn": "/Date(1401138781839+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "3PK",
          "Price": 18
        }
      ]
    },
    {
      "name": "Decarboxylated Full Extract Oil-Harlequin",
      "description": "Ideal Farms\nTHC: 27.1%\nCBD: 47.1%\n",
      "addedOn": "/Date(1425094785702+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/sativa/harlequin/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "3.0mL",
          "Price": 200
        }
      ],
      "strainInfo": {
        "slug": "harlequin",
        "name": "Harlequin",
        "category": "Sativa",
        "rating": 4.1,
        "ratingCount": 523,
        "symbol": "Har",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "Decarboxylated Full Extract Oil-Ideal THC:CBD Mix ",
      "description": "Decarboxylated Cannabis Oil\nBy Ideal Farms\nthc   46.2%\nCBD 33.9%",
      "addedOn": "/Date(1432675451025+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 55
        }
      ]
    },
    {
      "name": "Delta 9 Soda ",
      "description": "Pink Lemonade\nFruit Punch\nOrange\n134 mg THC",
      "addedOn": "/Date(1430243213145+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Doc Ault's - Cup'O Sugar ",
      "description": "Net weight: 160 grams/THC: 26 mg/g\n\nFinely ground organic sugar, blue dream cannabis, rose pedals, vanilla beans, coffee, cardamom\n\n100% Organic \nNo GMO\nVegan\n",
      "addedOn": "/Date(1424375160045+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 36
        }
      ]
    },
    {
      "name": "Doc Aults - Medicated Salt",
      "description": "By Doc Aults\nKosher Flake Pacific Sea Salt\n504 mg THC",
      "addedOn": "/Date(1427484235592+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Doc Aults - Medicated Salt Variety Pack",
      "description": "Doc Ault's Medicated Salt \n50 mg total, 5 varieties\n10 mg in each vile of Black Hawaiian Lava Salt, Himalayan Pink Salt, Kosher Flake Sea Salt, Hawaiian Red Alaea Salt, and French Grey Salt",
      "addedOn": "/Date(1427319705299+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 8
        }
      ]
    },
    {
      "name": "Doc Ault's Liquid Flower Tincture",
      "description": "Total THC: 850mg\nFrom Doc Ault's",
      "addedOn": "/Date(1399922727477+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 25
        }
      ]
    },
    {
      "name": "Doc Aults- Sugar Break",
      "description": "100% Non-GMO Erthyitol, Cannabis, and Organic Spices\n176.4 mg THC",
      "addedOn": "/Date(1439429272844+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 8
        }
      ]
    },
    {
      "name": "Drip Ice Cream",
      "description": "75MG of delicious VEGAN ice-cream\n\nVarious flavors available!",
      "addedOn": "/Date(1433181210238+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        },
        {
          "Unit": "Vegan",
          "Price": 15
        }
      ]
    },
    {
      "name": "Durban Poison",
      "description": "Humankind | Sativa | THC: 20.6% | CBD: 0.09%",
      "addedOn": "/Date(1447002942230+0000)/",
      "imagePath": "img/product/GRANDHUSTLE-HighsmanFarms.png",
      "images" : ["img/product/GRANDHUSTLE-HighsmanFarms-macro.png", "img/product/GRANDHUSTLE-HighsmanFarms-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 12
        },
        {
          "Unit": "Half",
          "Price": 115
        },
        {
          "Unit": "One",
          "Price": 220
        }
      ],
      "strainInfo": {
        "slug": "durban-poison",
        "name": "Durban Poison",
        "category": " Sativa ",
        "rating": 4.4,
        "ratingCount": 1264,
        "symbol": "Dp",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 48,
      "farm": "Humankind ",
      "hasInfo": true,
      "thc": " 20.6% ",
      "cbd": " 0.09%"
    },
    {
      "name": "Durban Poison",
      "description": "Sofresh Farms | Sativa | THC: 25.3% | CBD: 0.10% | Clean Green Certified",
      "addedOn": "/Date(1447278054415+0000)/",
      "imagePath": "img/product/PEACHESNCREAM-SoFreshFarms.png",
      "images" : ["img/product/PEACHESNCREAM-SoFreshFarms-macro.png", "img/product/PEACHESNCREAM-SoFreshFarms-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 16
        },
        {
          "Unit": "Half",
          "Price": 135
        },
        {
          "Unit": "One",
          "Price": 260
        }
      ],
      "strainInfo": {
        "slug": "durban-poison",
        "name": "Durban Poison",
        "category": " Sativa ",
        "rating": 4.4,
        "ratingCount": 1264,
        "symbol": "Dp",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 49,
      "farm": "Sofresh Farms ",
      "hasInfo": true,
      "thc": " 25.3% ",
      "cbd": " 0.10% "
    },
    {
      "name": "Echo Electuary | Hunny Be CBD 1:1 CBD",
      "description": "By Echo Electuary\nWillamette valley honey infused with organic ginger juice, cannabis, and organic elderberry extract\nCBD: 1.6mg/tsp\nTHC: 53mg/tsp\n9 tsp a total 225 mg of activated cannabinoids",
      "addedOn": "/Date(1439331460362+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 28
        }
      ]
    },
    {
      "name": "Echo Electuary | Hunny Be THC",
      "description": "By Echo Electuary\n\nWillamette Valley Honey, Organic Ginger Juice, Medicinal Cannabis Sativa Concentrate, Organic Elderberry Extract",
      "addedOn": "/Date(1447890480720+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 38
        }
      ]
    },
    {
      "name": "Echo Electuary-Zing Zinga Lozenge",
      "description": "Echo Electuary \nCBD:12.5mg\nTHC: 12.5mg\n\n1:1 CBD/THC\n100MG activated Cannabinoids",
      "addedOn": "/Date(1439330655943+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 18
        }
      ]
    },
    {
      "name": "Ed's World Famous Betterscotch Hard Candies ",
      "description": "THC: 12mg/Candy\n\nIngredients: Organic Sugar, Heavy Cream, Organic Butter, Cream of Tartar, Organic Coconut Oil, Lecithin, Organic Cannabis Extract, Salt",
      "addedOn": "/Date(1447889539841+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "2PK",
          "Price": 4
        },
        {
          "Unit": "One",
          "Price": 10
        },
        {
          "Unit": "12PK",
          "Price": 20
        }
      ]
    },
    {
      "name": "Ed's World Famous Cinnamon Hard Candies",
      "description": "THC: 14mg/Candy | 6PK\n\nIngredients: Organic Sugar, Organic Brown Rice Syrup, Organic Coconut Oil, Lecithin, Organic Cannabis Extract, Cinnamon Oil",
      "addedOn": "/Date(1439582146825+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "2PK",
          "Price": 4
        },
        {
          "Unit": "One",
          "Price": 10
        },
        {
          "Unit": "12PK",
          "Price": 20
        }
      ]
    },
    {
      "name": "Ed's World Famous Ginger Hard Candies",
      "description": "THC: 13mg/Candy | 6PK\n\nIngredients: Organic Sugar, Organic Ginger, Organic Brown Rice Syrup, Organic Coconut Oil, Lecithin, Organic Cannabis Extract, Organic Ginger Oil",
      "addedOn": "/Date(1439582365379+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "2PK",
          "Price": 4
        },
        {
          "Unit": "One",
          "Price": 10
        },
        {
          "Unit": "12PK",
          "Price": 20
        }
      ]
    },
    {
      "name": "Elbe's Candycane Cake Balls ",
      "description": "Made with fresh ingredients bi-weekly Potency varies with each batch, check in store for current strengths ",
      "addedOn": "/Date(1449162176397+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Elbe's Coffee Chews",
      "description": "Made with fresh ingredients bi-weekly Potency varies with each batch, check in store for current strengths ",
      "addedOn": "/Date(1446232321149+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 8
        }
      ]
    },
    {
      "name": "Elbe's Edibles-Bananas Bread",
      "description": "Made with fresh ingredients bi-weekly\nPotency varies with each batch, check in store for current strengths",
      "addedOn": "/Date(1433875052836+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Elbe's Edibles-Fudge Pack with Nuts",
      "description": "Made with fresh ingredients bi-weekly\nPotency varies with each batch, check in store for current strengths",
      "addedOn": "/Date(1411327621879+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Elbe's Edibles-Lemon Hammered Bars",
      "description": "Made with fresh ingredients bi-weekly\nPotency varies with each batch, check in store for current strengths",
      "addedOn": "/Date(1400710289799+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/i/36175/w200",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Elbe's Edibles-Lemon Raspberry Poundcake",
      "description": "Made with fresh ingredients bi-weekly\nPotency varies with each batch, check in store for current strengths",
      "addedOn": "/Date(1426188232033+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Elbe's Edibles-Marionberry Coffee Cake",
      "description": "Made with fresh ingredients bi-weekly\nPotency varies with each batch, check in store for current strengths",
      "addedOn": "/Date(1397594651954+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/i/36059/w200",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "Elbe's- Lemon Cake Balls",
      "description": "Made with fresh ingredients bi-weekly Potency varies with each batch, check in store for current strengths ",
      "addedOn": "/Date(1446914244525+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Elbe's Mocha Express Cake Balls",
      "description": "Made with fresh ingredients bi-weekly Potency varies with each batch, check in store for current strengths ",
      "addedOn": "/Date(1447880387495+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Elbe's Triple Chocolate Cake Balls ",
      "description": "Made with fresh ingredients bi-weekly Potency varies with each batch, check in store for current strengths ",
      "addedOn": "/Date(1446230696714+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Empower Bath Salts ",
      "description": "Created by Empower is a healing blend of pharmaceutical grade Epsom, pink Himalayan, dead sea salt and aromatic therapeutic essential oils that provides pain relief.",
      "addedOn": "/Date(1449186661018+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 9
        },
        {
          "Unit": "16 ounce",
          "Price": 30
        }
      ]
    },
    {
      "name": "Empower Cannabis Infused Topical CBD Oil",
      "description": "Created by Empower is a healing blend of aromatic therapeutic essential oils that provides pain relief.\nTHC: ND/CBD: 20.2mg. Sm 0.3 fl oz",
      "addedOn": "/Date(1438723809411+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 25
        }
      ]
    },
    {
      "name": "Empower Cannabis Infused Topical Oil",
      "description": "Created by Empower is a healing blend of aromatic therapeutic essential oils that provides pain relief.\n150mg THC & 66mg CBD. Lrg 1.0oz",
      "addedOn": "/Date(1399927181268+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 70
        }
      ]
    },
    {
      "name": "Empower Cannabis Infused Topical Oil",
      "description": "Created by Empower is a healing blend of aromatic therapeutic essential oils that provides pain relief.\n45mg THC & 20mg CBD. Sml 0.3oz",
      "addedOn": "/Date(1399927104060+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 30
        }
      ]
    },
    {
      "name": "Evermelt- American Pi",
      "description": "Qi Concentrate|THC: 75.06%|CBD: <LOQ",
      "addedOn": "/Date(1446511988003+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "Evolved Organics CO2 Cartridges",
      "description": "Available Strains: Golden Pineapple, Orange Sunshine, Violet Delight, Nuken Poison, Girl Scout Cookies\n\nClean Green Certified Farmers, Processor, and Dispensary\n\nEvolvd CO2 Extracts\nGreen Bodhi Flowers\nSofresh Farms Flowers",
      "addedOn": "/Date(1441850876338+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 90
        }
      ]
    },
    {
      "name": "Fine & Dandies - Chewing Gum",
      "description": "Sugar Free Chewing Gum\n101 mg THC, 10.1 mg per piece, 10 pieces\nAvailable in Cinnamon",
      "addedOn": "/Date(1427485857765+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 14
        }
      ]
    },
    {
      "name": "Fine & Dandies - Dark Chocolate Bar",
      "description": "55% Cocoa\n118 mg Active THC\nA variety of toppings available: himalayan rock salt, tart cherries and almonds, candied orange zest, and roasted peanuts",
      "addedOn": "/Date(1427485424546+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 16
        }
      ]
    },
    {
      "name": "Fine & Dandies - Mints",
      "description": "204 mg THC total, 10 mg THC per mint, 2 mints\nAvailable in Cinnamon and Peppermint",
      "addedOn": "/Date(1427485773343+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 14
        }
      ]
    },
    {
      "name": "Fruity Pebbles",
      "description": "Ripped City Gardens | Hybrid | THC: 23.3% | CBD: 0.05%",
      "addedOn": "/Date(1442546426345+0000)/",
      "imagePath": "img/product/SWEETTOOTH-SoFreshFarms.png",
      "images" : ["img/product/SWEETTOOTH-SoFreshFarms-macro.png", "img/product/SWEETTOOTH-SoFreshFarms-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 14
        },
        {
          "Unit": "Half",
          "Price": 125
        },
        {
          "Unit": "One",
          "Price": 240
        }
      ],
      "strainInfo": {
        "slug": "fruity-pebbles",
        "name": "Fruity Pebbles",
        "category": " Hybrid ",
        "rating": 4.3,
        "ratingCount": 345,
        "symbol": "Fp",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 75,
      "farm": "Ripped City Gardens ",
      "hasInfo": true,
      "thc": " 23.3% ",
      "cbd": " 0.05%"
    },
    {
      "name": "G Dual Charger",
      "description": "Grenco Science | Dual Charger",
      "addedOn": "/Date(1446079250055+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "G Pen Vaporizer",
      "description": "Grenco Science | 1 rechargeable G Pen Battery, 1 G Pen Coil, 1 G Tool, 1 G Wall Adapter, 1 G Pen Wired USB Charger, 2 G Glass Containers & 3 G Cleaning Tips. ",
      "addedOn": "/Date(1446079289541+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 70
        }
      ]
    },
    {
      "name": "G Slim Hookah Vaporizer",
      "description": "Grenco Science | Snoop Dogg BUSH Hookah Vaporizer",
      "addedOn": "/Date(1446079343685+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Ghost OG",
      "description": "Green Bodhi | Hybrid | THC: 23.9% | CBD: 0.18%",
      "addedOn": "/Date(1448656440449+0000)/",
      "imagePath": "img/product/TANGILOPE-SoFresh.png",
      "images" : ["img/product/TANGILOPE-SoFresh-macro.png", "img/product/TANGILOPE-SoFresh-thumb.png"],
      "type": "Flower",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 14
        },
        {
          "Unit": "Half",
          "Price": 125
        },
        {
          "Unit": "One",
          "Price": 240
        }
      ],
      "strainInfo": {
        "slug": "ghost-og",
        "name": "Ghost OG",
        "category": " Hybrid ",
        "rating": 4.5,
        "ratingCount": 193,
        "symbol": "Gok",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      },
      "id": 79,
      "farm": "Green Bodhi ",
      "hasInfo": true,
      "thc": " 23.9% ",
      "cbd": " 0.18%"
    },
    {
      "name": "Golden Xtrx Cartridge",
      "description": "Golden Xtrx Pure CO2 Vape Cartridges\nstrains and potency will vary",
      "addedOn": "/Date(1437428827229+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/sativa/golden-xtrx-oil-vaporizer-cartridge-s/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 45
        }
      ],
      "strainInfo": {
        "slug": "golden-xtrx-oil-vaporizer-cartridge-s",
        "name": "Golden XTRX Oil Vaporizer Cartridge",
        "category": "Sativa",
        "rating": 3.7,
        "ratingCount": 10,
        "symbol": "Gdx",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "Golden Xtrx Vape Pen",
      "description": "By Golden Xtrx\n1g of CO2 oil in a vape pen with battery included",
      "addedOn": "/Date(1437428995499+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "Green Dragon Janga Juice",
      "description": "Med with Love Janga Juice\n145mg THC\n14mg CBD",
      "addedOn": "/Date(1429044424122+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        }
      ]
    },
    {
      "name": "Headband Queens Jelly",
      "description": "Distilled BHO by Phoenix Rising Farms\nTHC: 70.1%\nTerpenes: 14.8%",
      "addedOn": "/Date(1440790070951+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/hybrid/headband/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 55
        }
      ],
      "strainInfo": {
        "slug": "headband",
        "name": "Headband",
        "category": "Hybrid",
        "rating": 4.3,
        "ratingCount": 1504,
        "symbol": "Hb",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "Herban Tribe-High THC Skywalker OG Tincture",
      "description": "Skywalker OG grape seed extract by Herban Tribe\n30 ml bottle\n397.5 mg THC\n1.9 mg CBD\n10 mg CBC\n20 mg CBG",
      "addedOn": "/Date(1439581948144+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/hybrid/skywalker-og/badge?width=100&padding=false",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 35
        }
      ],
      "strainInfo": {
        "slug": "skywalker-og",
        "name": "Skywalker OG",
        "category": "Hybrid",
        "rating": 4.4,
        "ratingCount": 695,
        "symbol": "Sko",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "Hickory Maple Kale Chips",
      "description": "From Made In Potland Kale Euphoria, Maple Bakeon. Vegan, gluten-free, allergen concious, organic, non-gmo, local.  THC: 29.04mg CBD: 33.33mg CBG: 2.31mg CBC: 2.97mg",
      "addedOn": "/Date(1443550725277+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Ideal Rockwool Clones ",
      "description": "Call for current strains\nHIgh THC Strains and High CBD Strains",
      "addedOn": "/Date(1443032047432+0000)/",
      "imagePath": "",
      "type": "Clone",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        }
      ]
    },
    {
      "name": "Ideal Rollies",
      "description": "Various Strains | 2 Half-Gram Rollies",
      "addedOn": "/Date(1429990443239+0000)/",
      "imagePath": "",
      "type": "PreRoll",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 14
        }
      ]
    },
    {
      "name": "Juicy Jay's Rolling Papers",
      "description": "-Rolling Papers in assorted flavors-\nFrom Juicy Jay",
      "addedOn": "/Date(1421183851268+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": []
    },
    {
      "name": "King Size Ideal Rollies",
      "description": "Kings Size Rollies- 2 pack ",
      "addedOn": "/Date(1448142698627+0000)/",
      "imagePath": "",
      "type": "PreRoll",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Large Cones",
      "description": "From the strains on our shelves, we bring to you Pre-Rolled Cones with over a gram packed in each! $15.00 for 21+, $10.00 for OMMP.",
      "addedOn": "/Date(1413928276050+0000)/",
      "imagePath": "",
      "type": "PreRoll",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        }
      ]
    },
    {
      "name": "Laughing Lotus Tincture",
      "description": "-A traditional tincture for daytime use, used to treat pain, muscle spasms, arthritis, cancer, depression and inflammation.-\nFrom Laughing Lotus\nTHCA: 4.781mg\nTHC: 1.141mg\nCBD: 0.0mg",
      "addedOn": "/Date(1421186547727+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        }
      ]
    },
    {
      "name": "Laurie & Mary Jane | Peanutbutter",
      "description": "100 mg per Jar\n2 Tablespoons = 25 mg THC",
      "addedOn": "/Date(1430792302080+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Laurie & Mary Jane-Canna Coconut Oil",
      "description": "200 mg THC total\nOne Tablespoon has 25 mg THC",
      "addedOn": "/Date(1430792237832+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Laurie & Mary Jane-Salted Cannabutter",
      "description": "200 mg THC\n1 Tablespoon = 25 mg THC",
      "addedOn": "/Date(1430792352327+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Lighter",
      "addedOn": "/Date(1446583977752+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 2
        }
      ]
    },
    {
      "name": "Live Resin - AF Cookies",
      "description": "High Tides | THC: 65.47% | CBD: <0.00%",
      "addedOn": "/Date(1447285210890+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 50
        }
      ]
    },
    {
      "name": "Live Resin - Agent Orange",
      "description": "High Tides | THC: 70.55% | CBD: <0.00% ",
      "addedOn": "/Date(1447284851295+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/hybrid/agent-orange/badge?width=100&padding=false",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 50
        }
      ],
      "strainInfo": {
        "slug": "agent-orange",
        "name": "Agent Orange",
        "category": "Hybrid",
        "rating": 4.1,
        "ratingCount": 583,
        "symbol": "Ago",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "Micro G Pro Vaporizer",
      "description": "Grenco Science | Includes: 1 Rechargeable microG Battery, 4 microG Tanks, 1 microG Mouthpiece, 5 microG Mouthpiece Sleeves, 1 micoG Tool, 1 G Keychain, 1 G Wall Adapter, 1 microG Wired USB Charger, 2 G Glass Containers & 3 G Cleaning Tips",
      "addedOn": "/Date(1446079384623+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 70
        }
      ]
    },
    {
      "name": "Mountain Sun Botanicals Sun Grown RSO",
      "addedOn": "/Date(1439393807932+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 25
        }
      ]
    },
    {
      "name": "Mountain Sun Cannabis Oil",
      "description": "Mountain Sun Botanicals\nCBD Extract Oil\nHarley Tsu\nTHC: 11.10%\nCBD: 35.94%",
      "addedOn": "/Date(1439581736781+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 44
        }
      ]
    },
    {
      "name": "Mystic Roots Creations Organic CannaBody Butter",
      "description": "Organic CannaBody Butter\nCertified Organic Ingredients: Cannabis, Cinnamon Leaf Oil, Cinnamon Bark OIl, Myrrh Essential Oil, Coconut Oil, Jojoba Oil, Emu Oil, Shea Butter, Cacao butter, Mango Butter, Comfrey Oil, Calendula Oil, Plantain Oil, Neem Oil, Beeswax, Aloe Vera, Rosemary Essential Oil, Lavender Essential Oil, Rosemary Antioxidant\n\nTHC: 9.3 mg/g\nCBD: 0.8mg/g\nCBD 0.4 mg/g\nCBC 0.3 mg/g\n\n2 oz jar",
      "addedOn": "/Date(1441321877523+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 55
        }
      ]
    },
    {
      "name": "Oregon's Finest Crew Neck Pullover Sweatshirt",
      "description": "-Unisex Oregon's Finest Crew Neck Pullover Sweatshirt-\nSizes XS-XXXL in assorted colors",
      "addedOn": "/Date(1421183630108+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 40
        }
      ]
    },
    {
      "name": "Oregon's Finest Hoodies",
      "description": "-Unisex Oregon's Finest hoodies w/zipper and pullover style-\nSizes XS-XXXL in assorted colors",
      "addedOn": "/Date(1421183551175+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 40
        }
      ]
    },
    {
      "name": "Oregon's Finest Lighters",
      "description": "Choose between Black or White",
      "addedOn": "/Date(1411150276304+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 2
        }
      ]
    },
    {
      "name": "Oregon's Finest Snap Back Hat",
      "addedOn": "/Date(1422595081742+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 35
        }
      ]
    },
    {
      "name": "Oregon's Finest Tank Tops",
      "addedOn": "/Date(1437680565423+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Oregon's Finest Trucker Hat",
      "addedOn": "/Date(1422595063929+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 25
        }
      ]
    },
    {
      "name": "Oregon's Finest T-Shirts",
      "description": "-Men and Women's Oregon's Finest T-Shirts-\nSizes XS-XXXL in assorted colors",
      "addedOn": "/Date(1403122502919+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 25
        }
      ]
    },
    {
      "name": "PAX Premium  Vaporizer",
      "description": "PAX is the best-in-class compact portable vaporizer made with innovative technology and exceptional design. Variety of colors available. ",
      "addedOn": "/Date(1446079583273+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 280
        }
      ]
    },
    {
      "name": "Peak Extracts High CBD Chocolate Bar",
      "description": "72% Dark Chocolate Bar infused with 1.2g of high CBD CO2 oil\nStrains and potency vary by week, call or check in store for current strains and strengths",
      "addedOn": "/Date(1440528819492+0000)/",
      "imagePath": "https://d3h17ltqi8v019.cloudfront.net/sativa/harlequin/badge?width=100&padding=false",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 14
        }
      ],
      "strainInfo": {
        "slug": "harlequin",
        "name": "Harlequin",
        "category": "Sativa",
        "rating": 4.1,
        "ratingCount": 523,
        "symbol": "Har",
        "starImage": "https://d3h17ltqi8v019.cloudfront.net/stars/4/240?color=fcc91d"
      }
    },
    {
      "name": "Peak Extracts High THC Chocolate Bar",
      "description": "72% Dark Chocolate Bar infused with 3g of high THC CO2 oil\nStrains and potency vary by week, call or check in store for current strains and strengths",
      "addedOn": "/Date(1439429628468+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "PNW Medi Mate Tincture",
      "description": "From PNW Potions, THC: 3.08mg/g, CBD: 0.0",
      "addedOn": "/Date(1401385705651+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 20
        }
      ]
    },
    {
      "name": "Pop Naturals CO2 Oil",
      "description": "-Co2 Oil Dripper/Refill Syringe-\nStrains and potency may vary depending on what we have in stock.\nCall us today to see what we currently have in store!",
      "addedOn": "/Date(1419628489299+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "HalfGram",
          "Price": 25
        },
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    },
    {
      "name": "Primo Harlequin Coconut Extract Capsules",
      "description": "From Primo Extracts, THC: 1.15%, CBD: 19.6%",
      "addedOn": "/Date(1407347484760+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 14
        }
      ]
    },
    {
      "name": "Primo THC Coconut Capsules",
      "description": "-\nFrom Primo Extracts\nTHC: 12.55mg\nCBD: 0.49mg",
      "addedOn": "/Date(1413915260982+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Qi Chocolates",
      "description": "-Created by: Qi Co.-\nAssorted chocolates in many flavors!\n\n",
      "addedOn": "/Date(1423277386646+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 6
        }
      ]
    },
    {
      "name": "Qi Co Rockwool Clones 2x2",
      "description": "Call for current strains\nHIgh THC Strains and High CBD Strains",
      "addedOn": "/Date(1423444050792+0000)/",
      "imagePath": "",
      "type": "Clone",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        }
      ]
    },
    {
      "name": "Qi Co-Harlequin CBD Lollipop ",
      "description": "-Created by: Ideal Farms-\n20mg Harlequin CBD Cannabis Extract \nFlavors: Tangerine, Coconut, Butterscotch, Cinnamon",
      "addedOn": "/Date(1416003595389+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 7
        }
      ]
    },
    {
      "name": "Raw Hemp Plastic Roller",
      "description": "-Plastic roller-\nFrom Raw",
      "addedOn": "/Date(1421183929240+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 4
        }
      ]
    },
    {
      "name": "Reefer Rools | That Taffy ",
      "description": "THC 4x: 231mg (THC) | 13.35mg (CBD) | CBD: 14.40mg (THC) | 79.20mg (CBD)",
      "addedOn": "/Date(1448471693101+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 16
        }
      ]
    },
    {
      "name": "Ripped City Soda ",
      "description": "-Assorted Flavors-\nFrom Canna Candy Company\n75mg of Cannabis\nTHC: 1.05%\nCBD: 0.39%\n\n",
      "addedOn": "/Date(1421001268768+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 8
        },
        {
          "Unit": "Extra Strenth (150mg)",
          "Price": 10
        }
      ]
    },
    {
      "name": "Sacred Mind & Body",
      "description": "Cannabis Infused Personal Lubricant  THC: 2.02%  CBD: 0.61%",
      "addedOn": "/Date(1443550135894+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 28
        }
      ]
    },
    {
      "name": "Santa Cruz Shedder Small",
      "addedOn": "/Date(1446916899636+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 50
        }
      ]
    },
    {
      "name": "Santa Cruz Shredder Large",
      "addedOn": "/Date(1446916857817+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 80
        }
      ]
    },
    {
      "name": "Siskiyou Sungrown RSO",
      "description": "1ml: $30\n3ml: $70\n10ml: $230",
      "addedOn": "/Date(1429041956004+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 30
        },
        {
          "Unit": "3mL",
          "Price": 70
        }
      ]
    },
    {
      "name": "Snoop Dogg G Pro Vaporizer",
      "description": "Snoop Dogg BUSH Garden Supplies | Includes: 1 G Pro Vaporizer, 1 G Pro Mouthpiece, 1 G Pro Removable Filter, 5 G Pro Filter Screens, 1 G Pro Cleaning Brush, 2 G Pro Extended Mouthpiece Sleeves, 3 G Pro Mouthpiece Sleeves, 1 G Pro Wired USB Charger, 1 Bush G Card, 1 Bush G Tray, 1 Bush Starter Pot & 1 Bush Album Download Card. ",
      "addedOn": "/Date(1446079666696+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 100
        }
      ]
    },
    {
      "name": "Sour Bhotz",
      "description": "Gummy candy. 2 'bhots' per pack.\nFlavors: Grape, Blueberry, Mango, Fruit Punch & more!\nTHC: 75mg/ea",
      "addedOn": "/Date(1397784216430+0000)/",
      "imagePath": "http://leaflystatic.blob.core.windows.net/menu-item-photos/Oregon-s-Finest_full_453d.jpg",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 12
        }
      ]
    },
    {
      "name": "Synergy Skin Wrap",
      "description": "Synergy Skin Wrap is a slow-release medicated patch you apply directly to skin\nLow Dose  CBD: 23.8mg\nHigh Dose THC: 61mg",
      "addedOn": "/Date(1428449064894+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 25
        }
      ]
    },
    {
      "name": "Terp Serum",
      "description": "Solvent-free\nPhoenix Rising Farms\nVarious Strains",
      "addedOn": "/Date(1436403846525+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 80
        }
      ]
    },
    {
      "name": "That Taffy",
      "description": "70 mg of Cannabis Extract infused in to taffy available in a variety of delicious fruity and/or sour fruity flavors!",
      "addedOn": "/Date(1442117286873+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 5
        }
      ]
    },
    {
      "name": "That Taffy CBD",
      "description": "90 mg of High CBD Extract infused in to a variety of fruity flavored taffy's",
      "addedOn": "/Date(1442117433841+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 10
        }
      ]
    },
    {
      "name": "That Taffy Extra Strength",
      "description": "160 mg of Cannabis Extract infused in to taffy available in a variety of delicious fruity flavors!",
      "addedOn": "/Date(1442117370459+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 10
        }
      ]
    },
    {
      "name": "The Clear- Distilled BHO",
      "description": "Strengths and Flavors vary",
      "addedOn": "/Date(1446343064265+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "Gram",
          "Price": 45
        }
      ]
    },
    {
      "name": "The CO2 Company Battery",
      "description": "Green light vape pen includes battery & usb charger",
      "addedOn": "/Date(1417545456385+0000)/",
      "imagePath": "",
      "type": "Other",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 15
        }
      ]
    },
    {
      "name": "The CO2 Company Oil Cartridge",
      "description": "Comes in a variety of strains! Call us today to see what we have in stock!",
      "addedOn": "/Date(1421354334012+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "THC (0.5ml)",
          "Price": 25
        },
        {
          "Unit": "CBD (0.5ml)",
          "Price": 30
        },
        {
          "Unit": "THC (1ml)",
          "Price": 40
        }
      ]
    },
    {
      "name": "Tj's Hypnos THC Infused Capsules 10 pk",
      "description": "THC: 20mg, CBD: 2mg",
      "addedOn": "/Date(1415249500015+0000)/",
      "imagePath": "",
      "type": "Edible",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "One",
          "Price": 30
        }
      ]
    },
    {
      "name": "Truly Pure Vape Cartridges",
      "description": "Pure CO2 extract \ncomes with added terpene flavor options like lime, tangerines, grapefruit, and lemon\nFlavors and potency will vary",
      "addedOn": "/Date(1437428734490+0000)/",
      "imagePath": "",
      "type": "Concentrate",
      "preOrderEnabled": false,
      "pricing": [
        {
          "Unit": "HalfGram",
          "Price": 25
        },
        {
          "Unit": "Gram",
          "Price": 40
        }
      ]
    }
  ]
  var products = [{
    id: 0,
    cateId: 0,
    img: 'img/product/thumb1.jpg',
    imgLg: 'img/product/1.jpg',
    name: 'BEET ROOT AND RED BEAN VEGAN BURGERS',
    price: '$10.00',
    like: '2145'
  }, {
    id: 1,
    cateId: 0,
    img: 'img/product/thumb2.jpg',
    imgLg: 'img/product/2.jpg',
    name: 'FRESH STRAWBERRY CREAM',
    price: '$5.00',
    like: '738'
  }, {
    id: 2,
    cateId: 0,
    img: 'img/product/thumb3.jpg',
    imgLg: 'img/product/3.jpg',
    name: 'VEGAN BURGER WITH FRESH VEGETABLES',
    price: '$24.00',
    like: '1029'
  }, {
    id: 3,
    cateId: 0,
    img: 'img/product/thumb4.jpg',
    imgLg: 'img/product/4.jpg',
    name: 'FRESH BAKED PASTIES FILLED WITH MEAT AND VEGETABLES',
    price: '$7.00',
    like: '802'
  }, {
    id: 4,
    cateId: 0,
    img: 'img/product/thumb5.jpg',
    imgLg: 'img/product/5.jpg',
    name: 'OMELETTE WITH ASPARAGUS',
    price: '$10.00',
    like: '218'
  }, {
    id: 5,
    cateId: 0,
    img: 'img/product/thumb6.jpg',
    imgLg: 'img/product/6.jpg',
    name: 'BROWN RICE WITH GARLIC AND LIME',
    price: '$5.00',
    like: '738'
  }, {
    id: 6,
    cateId: 0,
    img: 'img/product/thumb7.jpg',
    imgLg: 'img/product/7.jpg',
    name: 'OMELETTE WITH ASPARAGUS, BEANS AND THYME',
    price: '$24.00',
    like: '1029'
  }, {
    id: 7,
    cateId: 1,
    img: 'img/product/thumb8.jpg',
    imgLg: 'img/product/8.jpg',
    name: 'FRIED MASHED POTATOES',
    price: '$24.00',
    like: '1029'
  }, {
    id: 8,
    cateId: 1,
    img: 'img/product/thumb9.jpg',
    imgLg: 'img/product/9.jpg',
    name: 'CREAMY MUSHROOM SOUP',
    price: '$35.00',
    like: '342'
  }, {
    id: 9,
    cateId: 1,
    img: 'img/product/thumb10.jpg',
    imgLg: 'img/product/10.jpg',
    name: 'TAGLIATELLE PASTA WITH SPINACH AND GREEN PEAS',
    price: '$39.00',
    like: '480'
  }, {
    id: 10,
    cateId: 2,
    img: 'img/product/thumb11.jpg',
    imgLg: 'img/product/11.jpg',
    name: 'BLUEBERRY PANCAKE',
    price: '$15.00',
    like: '1291'
  }, {
    id: 11,
    cateId: 2,
    img: 'img/product/thumb12.jpg',
    imgLg: 'img/product/12.jpg',
    name: 'HOMEMADE GRAPE PIE',
    price: '$12.00',
    like: '575'
  }, {
    id: 12,
    cateId: 2,
    img: 'img/product/thumb13.jpg',
    imgLg: 'img/product/13.jpg',
    name: 'HOMEMADE PESTO',
    price: '$15.00',
    like: '583'
  }, {
    id: 13,
    cateId: 2,
    img: 'img/product/thumb14.jpg',
    imgLg: 'img/product/14.jpg',
    name: 'BERRY SMOOTHIE',
    price: '$20.00',
    like: '120'
  }, {
    id: 14,
    cateId: 2,
    img: 'img/product/thumb15.jpg',
    imgLg: 'img/product/15.jpg',
    name: 'FRESH OLIVES',
    price: '$10.00',
    like: '203'
  }, {
    id: 15,
    cateId: 3,
    img: 'img/product/thumb16.jpg',
    imgLg: 'img/product/16.jpg',
    name: 'Latte Coffee',
    price: '$15.00',
    like: '163'
  }, {
    id: 16,
    cateId: 3,
    img: 'img/product/thumb17.jpg',
    imgLg: 'img/product/17.jpg',
    name: 'Con Panna Coffee',
    price: '$20.00',
    like: '52'
  }, {
    id: 17,
    cateId: 3,
    img: 'img/product/thumb18.jpg',
    imgLg: 'img/product/18.jpg',
    name: 'Iced Espresso Coffee',
    price: '$23.00',
    like: '232'
  }, {
    id: 18,
    cateId: 3,
    img: 'img/product/thumb19.jpg',
    imgLg: 'img/product/19.jpg',
    name: 'Con Zucchero Coffee',
    price: '$20.00',
    like: '2323'
  }, {
    id: 19,
    cateId: 3,
    img: 'img/product/thumb20.jpg',
    imgLg: 'img/product/20.jpg',
    name: 'Macchiato Coffee',
    price: '$26.00',
    like: '546'
  }, {
    id: 20,
    cateId: 4,
    img: 'img/product/thumb21.jpg',
    imgLg: 'img/product/21.jpg',
    name: 'Beach Burn Cocktail',
    price: '$30.00',
    like: '964'
  }, {
    id: 21,
    cateId: 4,
    img: 'img/product/thumb22.jpg',
    imgLg: 'img/product/22.jpg',
    name: 'Pink Cocktail - Cranberry Vodka Spritzer',
    price: '$12.00',
    like: '340'
  }, {
    id: 22,
    cateId: 4,
    img: 'img/product/thumb23.jpg',
    imgLg: 'img/product/23.jpg',
    name: 'Zydeco Fiddle Cocktail',
    price: '$23.00',
    like: '332'
  }, {
    id: 23,
    cateId: 4,
    img: 'img/product/thumb24.jpg',
    imgLg: 'img/product/24.jpg',
    name: 'Fever Pitch Cocktail',
    price: '$30.00',
    like: '492'
  }];

  return {
    all: function () {
      var defer = $q.defer();
      function fetchLeafly () {
        for (var i = 0; i < leaflyProducts.length; i++) {
          leaflyProducts[i].id = i;
        }
        defer.resolve(leaflyProducts);
      }
      fetchLeafly();
      return defer.promise;
    },
    get: function (productId) {
      for (var i = 0; i < leaflyProducts.length; i++) {
        if (leaflyProducts[i].type === capitalise(productId)) {
          return leaflyProducts[i];
        }
      }
      return null;
    },
    getById: function (id) {
      var defer = $q.defer();
      if (!id) {
        defer.reject();
      }

      findProductById(id, leaflyProducts, defer);

      function findProductById(id, productList, q) {
        var product;
        for (var i = 0; i < productList.length; i++) {
          if (parseInt(id) === i) {
            product = productList[i];
            q.resolve(product);
          }
        }
        q.reject();
      }

      return defer.promise;
    },
    getByCate: function (cateId) {
      var defer = $q.defer();

      if (!cateId){
        defer.reject();
      }
      var productCates = [];

      findProductsByCate(cateId, leaflyProducts, defer);

      function findProductsByCate(id, productList, q) {

        for (var i = 0; i < productList.length; i++) {

          if (productList[i].type === id) {
            productList[i].id = i;
            productCates.push(productList[i]);
          }

        }

        q.resolve(productCates);
      }

      return defer.promise;
    }
  };
});
app.service('Carts', function () {
  var carts = [{
    id: 0,
    cateId: 0,
    img: 'img/product/thumb1.jpg',
    imgLg: 'img/product/1.jpg',
    name: 'BEET ROOT AND RED BEAN VEGAN BURGERS',
    price: '$10.00',
    qty: '3'
  }, {
    id: 8,
    cateId: 1,
    img: 'img/product/thumb9.jpg',
    imgLg: 'img/product/9.jpg',
    name: 'CREAMY MUSHROOM SOUP',
    price: '$35.00',
    qty: '4'
  }, {
    id: 13,
    cateId: 2,
    img: 'img/product/thumb14.jpg',
    imgLg: 'img/product/14.jpg',
    name: 'BERRY SMOOTHIE',
    price: '$20.00',
    qty: '2'
  }];

  return {
    all: function () {
      return carts;
    }
  };
});
