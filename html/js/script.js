$(window).load(function(){

  $('.tgl-title').live('click',function(){
    $(this).toggleClass('title-drop-expanded').parent().next('.tgl-box').toggleClass('tgl-hide');
  });

  // login menu menu
  $('.auth-toggle').click(function(){
    $(this).parent().toggleClass('auth-visible');
  });

  // collapsable items animation
  $('.collapser').click(function(){
    $(this).parent().next().slideToggle('slow').parent().toggleClass('collapsed');
  });

});
