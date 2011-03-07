Titanium.include('../utils.js');

var win = Titanium.UI.currentWindow;

var label = Titanium.UI.createLabel({
  text: 'Hello ' + CurrentParticipant.getName(),
  top: 10,
  left: 10,
  right: 10,
  width: 300,
  textAlign: 'center',
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22}
});
win.add(label);

var travelLogStatusLabel = Ti.UI.createLabel({
  text: 'travel log service is NOT running',
  top: 50,
  left: 10,
  right: 10,
  width: 300,
  textAlign: 'center',
	font:{fontFamily:'Arial',fontSize:18}
});
win.add(travelLogStatusLabel);

/* START TRAVEL LOG */
var travelLogIntent = Titanium.Android.createServiceIntent({
    url: 'travel_log_service.js'
});
if (Ti.Android.isServiceRunning(travelLogIntent) == false) {
  travelLogIntent.putExtra('interval', Number(CurrentParticipant.getTravelLogRate()));
  Ti.Android.startService(travelLogIntent);
  travelLogStatusLabel.text = "travel log service IS running";
}

/* MENU */
if (Ti.Platform.name == 'android') {
  win.activity.onCreateOptionsMenu = function(e) {
  	var menu = e.menu;
	
  	var signOutMenuOption = menu.add({ title : 'Sign out and exit' });
  	signOutMenuOption.addEventListener('click', function(e) {
      CurrentParticipant.signOut();
      Ti.Android.stopService(travelLogIntent);
      win.close();
  	});
  	
  	var exitMenuOption = menu.add({ title : 'Exit (saving password for next time)' });
  	exitMenuOption.addEventListener('click', function(e) {
      Ti.Android.stopService(travelLogIntent);
      win.close();
  	});
  };
}