Titanium.include('../utils.js');

Ti.API.info("travelLogService is firing");

/* CURRENT LOCATION */
var longitude;
var latitude;
var altitude;
var heading;
var accuracy;
var speed;
var timestamp;
var altitudeAccuracy;

// var waitForLocation = Ti.UI.createActivityIndicator({ message: "Trying to determine your current position..." });
// waitForLocation.show();

if (Ti.Platform.name == "iPhone OS") {
  Ti.Geolocation.purpose = "Travel log service";
}

if (Ti.Geolocation.locationServicesEnabled == false) {
  Ti.UI.createAlertDialog({title:'GPS Error', message:'Your device has its GPS turned off. Please turn it on.'}).show();
}
else {
  if (Ti.Platform.name != 'android') {
   var authorization = Ti.Geolocation.locationServicesAuthorization;
   Ti.API.info('Authorization: '+authorization);
   if (authorization == Ti.Geolocation.AUTHORIZATION_DENIED) {
     Ti.UI.createAlertDialog({
       title:'GPS Error',
       message:'You are not giving Traveler permission to access your location.'
     }).show();
   }
   else if (authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
     Ti.UI.createAlertDialog({
       title:'GPS Error',
       message:'You are not giving Traveler permission to access your location.'
     }).show();
   }
  }

 Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
 
  //
  //  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
  //  THIS VALUE IS IN METERS
  //
  Titanium.Geolocation.distanceFilter = 1;

  //
  // EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
  //
  var locationChange = function(e) {
    if (!e.success || e.error) {
      alert('error ' + JSON.stringify(e.error));
      return;
    }

    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    altitude = e.coords.altitude;
    heading = e.coords.heading;
    accuracy = e.coords.accuracy;
    speed = e.coords.speed;
    timestamp = e.coords.timestamp;
    altitudeAccuracy = e.coords.altitudeAccuracy;
    positioningMethod = "gps";
  
    Titanium.API.info('geo updated (lon: ' + longitude + ', lat: ' + latitude + ')');
 
    recordTravelFixLoad = function(e) {
      Titanium.Geolocation.removeEventListener('location', locationChange);
    };
    recordTravelFixError = function(e) {
      Titanium.Geolocation.removeEventListener('location', locationChange);
    };

    Travelerserv.recordTravelFix(longitude, latitude, altitude, speed, accuracy, positioningMethod, recordTravelFixLoad, recordTravelFixError);
  };
  
  Titanium.Geolocation.addEventListener('location', locationChange);
}