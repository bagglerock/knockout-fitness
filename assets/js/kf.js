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
        imageCount++;
    
        $("#big-image").attr("src", picturesArray[imageCount]);
        if ( imageCount !== 0 ) {
            // make a variable of the previous thumbnail
             var thumbnailId = $("")// get the attribute that holds the value of the thumbnail id
             // change the opacity of the previous thumbnail to 50%
             // change the current thumbnail's opacity to 100%
        }
    } else {
         imageCount = 0;
        nextImage();
    }
}

//on click event for the thumbnail

// change the count to the clicked attributes id
