//slideshow -

//what is happening

//all of the pictures
var picturesArray = [];
var thumbnailArray = [];

var showImage;

//interval to change pic
var nSeconds = 3000;
var imageCount;
var thumbnailCount;

function startSlideShow () {
    showImage = setInterval(function() {
        nextImage();
    }, nSeconds);
}

function stopSlideShow () {
    clearImage(showImage);
}

function nextImage() {
    if (imageCount !== picturesArray.length){
    imageCount ++;
    
    $("#big-image").attr("src", picturesArray[imageCount]);
    $("#thumbnail").attr("src", thumbnailArray[imageCount]);//maybe change the opacity instead
}
