//slideshow -

//what is happening

//all of the pictures
var picturesArray = [];

//interval to change pic
var nSeconds = 3000;
var count;

function startSlideShow () {
    showImage = setInteval(function() {
        nextImage();
    }, nSeconds);
}


function changeMainPic (pic) {}

function changeHighlightedPic (pic) {}