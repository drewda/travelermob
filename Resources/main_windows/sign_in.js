Titanium.include('../utils.js');

var win = Titanium.UI.currentWindow;

var emailTextField = Titanium.UI.createTextField({
	color:'#000',
  top:10,
	left:10,
  width:300,
	height:60,
	hintText:'E-mail',
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(emailTextField);

var passwordTextField = Titanium.UI.createTextField({
	color:'#000',
  top:80,
	left:10,
  width:300,
	height:60,
	hintText:'Password',
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(passwordTextField);

var loginButton = Titanium.UI.createButton({
	title:'Login',
  top:150,
	width:90,
	height:55,
	borderRadius:1,
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
});
win.add(loginButton);

/*
* Login Event Handling
*/
var loginReq = Titanium.Network.createHTTPClient();
loginReq.onload = function()
{
	var json = this.responseText;
	var response = JSON.parse(json);
	CurrentParticipant.setEmail(response[0].participant.email);
	CurrentParticipant.setId(response[0].participant.id);
	CurrentParticipant.setPassword(passwordTextField.value);
	CurrentParticipant.setName(response[0].participant.first_name + " " + response[0].participant.last_name);
	win.close();
	Windows.main();
};

loginReq.onerror = function(e)
{
  Ti.API.info("ERROR " + e.error);
  if (e.error == "Authorization Required") {
    alert("Check your e-mail address and your password.");
  }
  else {
   	alert(e.error); 
  }
};

/*
* Login Button Click Event
*/

loginButton.addEventListener('click',function(e)
{
	if (emailTextField.value != '' && passwordTextField.value != '')
	{
		loginReq.open("GET","http://traveler.cocogeo.com/mobile/android/participants.json");
		loginReq.setRequestHeader("Accept", "application/json");
		loginReq.setRequestHeader(
        'Authorization', 
        'Basic ' + Ti.Utils.base64encode(emailTextField.value+':'+passwordTextField.value));
		loginReq.send();
	}
	else
	{
		alert("E-mail address and password are required");
	}
});


