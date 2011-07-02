$(window).load(function(){

  $('.tgl-title').live('click',function(){
    $(this).toggleClass('title-drop-expanded').parent().next('.tgl-box').toggleClass('tgl-hide');
  });

  // login menu menu
  $('.auth-toggle').click(function(){
    $(this).parent().toggleClass('auth-visible');
  });

  $('.frm-tgl-content,.tgl-box').each(function(){
    if ( $(this).hasClass('tgl-hide') ){
      $(this).removeClass('tgl-hide');
      $(this).height($(this).height());
      $(this).addClass('tgl-hide');
    } else {
      $(this).height($(this).height());
    }
  });
  // collapsable items animation
  $('.collapser').click(function(){
    $(this).parent().next().slideToggle('slow').parent().toggleClass('collapsed');
  });

});
