function loginWithFacebook(){
    FB.login(function(response) {
        if (response.authResponse) {
            // console.log('Welcome!  Fetching your information.... ');
            FB.api('/me?fields=id,name,email,picture{url}', function(response) {
            // console.log('Good to see you, ' + response.name + '.');
                console.log(response);
                document.getElementById('signUpEmail').value = response.email;
            });
        } else {
            // console.log('User cancelled login or did not fully authorize.');
        }
    },{
        scope: 'public_profile, email'
    });
}

window.fbAsyncInit = function() {
FB.init({
    appId      : '245532369664721',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.2'
});
    
FB.AppEvents.logPageView();   
    
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));