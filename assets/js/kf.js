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














