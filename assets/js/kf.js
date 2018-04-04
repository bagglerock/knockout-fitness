var accessToken = "EAACEdEose0cBACOTQxwO8ZAcqCbzOYazGTNohQzBuSmFH5GJzMUZBp5rbhqRSrwZBzNjJ6LwM8aVIb6JJw0Omt2GpximIKLNUFK6ONN5KkvZBoHCybjvytW1lIZCwZC3gVvGqLM01FJq6qtITZAQrax9l2XZCco0ISc4L5nfZA01rBk9lxMC3olmXCMcezLE2UL6sm2WmK9zlLwZDZD";

$(document).ready(function() {
  
  $("#quote").fadeIn(1000);

  $(".section").hover(function(){
    console.log("hover works");
    $("img").fadeIn();
  })


  window.fbAsyncInit = function() {
    FB.init({
      appId:
        "145634995501895",
      autoLogAppEvents: true,
      xfbml: true,
      version: "v2.12"
    });
  };
  
  (function(d, s, id) { //enclosure
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  $("#test").on("click", function() {
    FB.api(
      "/KnockOutFitnessNj",
      "GET",
      { fields: "albums{photos{images}}",
    access_token: accessToken
    },
      function(response) {
        console.log(response);
      }
    );
  });
});













