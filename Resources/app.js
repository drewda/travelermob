Titanium.include('utils.js');

Titanium.UI.setBackgroundColor('#fff');

/* GLOBAL STORAGE */
// none yet

/* GLOBAL NETWORK ACCESS */
var xhr;

/* USER AUTHORIZATION */
if (!CurrentParticipant.signedIn()) {
  Windows.signIn();
}
else {
  Windows.main();
}