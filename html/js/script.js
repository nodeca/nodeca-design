$(window).load(function(){

  // login menu menu
  $('.auth-toggle').click(function(){
    $(this).parent().toggleClass('auth-visible');
  });


  // init togglers for collapsable elements
  $('.collapser').ndCollapser();
});
