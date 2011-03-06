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

/* MENU */
if (Ti.Platform.name == 'android') {
  win.activity.onCreateOptionsMenu = function(e) {
  	var menu = e.menu;
	
  	var signOutMenuOption = menu.add({ title : 'Sign Out' });
  	signOutMenuOption.addEventListener('click', function(e) {
      CurrentParticipant.signOut();
      win.close();
  	});
  };
}