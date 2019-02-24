function onsignin(){
	var googleUser = {};
	var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '827647037742-3ss7nkv2ocsh008el3n6ecgisivlulpn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('q'));
    });
  };
	startApp();
  function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
              console.log("signing in");
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
function onsignup(){
	var googleUser = {};
	var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '827647037742-3ss7nkv2ocsh008el3n6ecgisivlulpn.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('q1'));
    });
  };
	startApp();
  function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
              document.getElementById('signUpEmail').value = googleUser.getBasicProfile().getEmail();
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
