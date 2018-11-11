$(document).ready(function(){

  var clusters = $('.image-cluster');
  for(var i=0; i<clusters.length; i++){
    var previewImages = $(clusters[i]).find('.preview-image');
    for(var j=0; j< previewImages.length; j++){
      $(previewImages[j]).css({
        'top': 30*j,
        'left': 30*j,
        'z-index': 12 -j
      });
    }
  }

  var citations = $('.citation');
  for(var j=0; j<citations.length; j++){
    var siblingPreviews = $(citations[j]).siblings('.preview-image')
    var lastSibling = $(siblingPreviews).eq(siblingPreviews.length - 1);
    var offsetH = $(lastSibling).height() + (siblingPreviews.length * 30);

    $(citations[j]).css('top', offsetH);
    console.log('hey sibling height =---- ', $(lastSibling).height());
  }
});
