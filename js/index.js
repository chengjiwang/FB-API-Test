function statusChangeCallback(response) {
    if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
        console.log('登入成功');
    } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    var login = document.getElementById('login'),
        status = document.getElementById('status');
    FB.init({
        appId: '466091916928729',
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use graph api version 2.5
    });


    checkLoginState(); //Checking the login status  to see if someone's already logged into your app

    login.addEventListener("click", function() {
        checkLoginState();
        FB.login(function(response) {
            if (response.authResponse) {
                FB.api("/me", function(response) {
                    console.log(response);
                    status.innerHTML = "歡迎你登入，" + response.name;
                });
            }
        }, {
            scope: 'public_profile,email'
        });
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
