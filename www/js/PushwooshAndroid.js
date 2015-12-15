function initPushwoosh()
{
  var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

  //set push notifications handler
  document.addEventListener('push-notification', function(event) {
    var title = event.notification.title;
    var userData = event.notification.userdata;

    if(typeof(userData) != "undefined") {
      console.warn('user data: ' + JSON.stringify(userData));
    }

    alert(title);
  });

  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
  pushNotification.onDeviceReady({ projectid: '895347061435', pw_appid : '3D5BB-E4E74' });

  //register for pushes
  pushNotification.registerDevice(
    function(status) {
      var pushToken = status;
      console.warn('push token: ' + pushToken);
    },
    function(status) {
      console.warn(JSON.stringify(['failed to register ', status]));
    }
  );
}
