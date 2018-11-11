$(document).ready(function(){

  var clusters = $('.image-cluster');
  for(var i=0; i<clusters.length; i++){
    var previewImages = $(clusters[i]).find('.preview-image');
    for(var j=0; j< previewImages.length; j++){
      $(previewImages[j]).css({
        'top': 20*j,
        'left': 20*j,
        'z-index': 12 -j
      });
    }
  }
}); 
