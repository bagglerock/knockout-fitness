var accessToken = "EAACEdEose0cBACOTQxwO8ZAcqCbzOYazGTNohQzBuSmFH5GJzMUZBp5rbhqRSrwZBzNjJ6LwM8aVIb6JJw0Omt2GpximIKLNUFK6ONN5KkvZBoHCybjvytW1lIZCwZC3gVvGqLM01FJq6qtITZAQrax9l2XZCco0ISc4L5nfZA01rBk9lxMC3olmXCMcezLE2UL6sm2WmK9zlLwZDZD";

$(document).ready(function() {
  
  $("#quote").fadeIn(1000);

  $(".section").hover(function(){
    //console.log("hover works");
    $("img").fadeIn();
  })


  $(document).ready(function(){
    $(window).scroll(function(){
        if ($(window).scrollTop() > 1000){
            //console.log("something");
        }
      });
    });
});














