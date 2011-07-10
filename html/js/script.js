$(window).load(function(){

  // login menu menu
  $('.auth-toggle').click(function(){
    $(this).parent().toggleClass('auth-visible');
  });

  // init togglers for collapsable elements
  $('.collapser').ndCollapser();

  // init tipsy elements
  $('.tip').tipsy();

  // Debug code ===================
  // Add button to switch page width
  var dbg_width_arr = ['', '760px', '80%'], // '' is "default" (as in CSS)
      dbg_width_idx = 0, // current width index
      dbg_width_max = dbg_width_arr.length - 1; // upper bound
  $('<a class="button">resize</a>').css({
    position: 'absolute',
    top: '5px',
    left: '5px',
    opacity: .3,
    fontSize: '12px',
    padding: '3px 5px'
    
  }).click(function () {
    if (dbg_width_max < ++dbg_width_idx) { dbg_width_idx = 0; }
    $('.trunk').css('width', dbg_width_arr[dbg_width_idx]);
  }).appendTo(document.body);
  // Debug code end ================
});

/**
 * ACP popup menu toggler
 */

var toggleDropBox = new function(){

  this.show = function(thisEl,calledEl) {

    $(thisEl).toggleClass('menu-toggler-expanded');
    $('#'+calledEl).toggleClass('menu-popup-expanded');

  };

}
