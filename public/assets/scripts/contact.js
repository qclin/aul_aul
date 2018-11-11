$(document).ready(function(){
  $('#subscribeForm').submit(function(e){
    e.preventDefault();

    var $form = $( this ),
        name = $form.find( "input[name='name']" ).val(),
        email = $form.find( "input[name='email']" ).val(),
        url = $form.attr( "action" );

    var payload = { name: name, email: email }
    console.log("[][][][][]", payload);
    var posting = $.post( url, payload );
    posting.done(function( data ) {
      console.log(' done POSTING --- ', data);
      $('#confirmation').show();
    })
  })
})
