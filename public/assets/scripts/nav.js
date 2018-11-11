$(document).ready( function(){
  var link = location.hash
  var subTabs = ['#work', '#info', '#contact'];

  if(location.pathname == '/'){
    setTimeout(function(){
        if(subTabs.indexOf(link) > -1){
          $(`[data-value=${link.substring(1)}]`).eq(0)[0].click();

        }else{
          setTimeout(openTab, 1000);
        }
      }, 1000);
  }

  $('.tablink').click(function(){
    $('.tabcontent').hide();
    var pageName = this.dataset.value;
    var leavePage = window.location.hash.substring(1)
    if(leavePage.length == 0){
        leavePage = 'work'
    }
    $('body').removeClass(`${leavePage}Page`);
    $('body').addClass(`${pageName}Page`);

    if(location.pathname != '/'){
      window.location = `/#${pageName}`
    }
    $(`#${pageName}-page`).show();
  });

});


function openTab(){
    $("#defaultOpen").click();
}
