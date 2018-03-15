//slideshow -

//what is happening

//all of the pictures
var picturesArray = [];

var showImage;

//interval to change pic
var nSeconds = 3000;
var count;

function startSlideShow () {
    showImage = setInteval(function() {
        nextImage();
    }, nSeconds);
}

function stopSlideShow () {
    clearImage(showImage);
}

function changeMainPic (pic) {}

function changeHighlightedPic (pic) {}

displayImage();