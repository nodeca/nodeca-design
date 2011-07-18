$(window).load(function(){

  // login menu menu
  $('.auth-toggle').click(function(){
    $(this).parent().toggleClass('auth-visible');
  });

  // init togglers for collapsable elements
  $('.collapser').ndCollapser();

  // init tipsy elements
  $('.tip').tipsy();


  // init hidden menu toggler
  $('.menu-pin').ndMenu();

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

  // tab switching
  $('.tab').click(function(){
    var tabId = $(this).attr('href');
    $('.tabs li.active').removeClass('active');
    $('.tabs-content-visible').removeClass('tabs-content-visible');
    $(this).parent().addClass('active');
    $(tabId).addClass('tabs-content-visible');
    return false;
  });

  // posts list menu collapser
  $('.pl-popup-collapser').click(function(){
    $(this).parent().toggleClass('collapsed');
    $(this).next().fadeToggle('fast');
  });

  var prfMiniTimeOut;

  $('.post-author').hover(function(){
    var t = $(this).offset().top - $('.prf-mini').height() - 25;
    var l = $(this).offset().left;
    $('.prf-mini').css({ top: t, left: l }).fadeIn();
  },function(){
    prfMiniTimeOut = setTimeout("$('.prf-mini').fadeOut();", 500);
  });

  $('.prf-mini').hover(function(){
    clearTimeout(prfMiniTimeOut);
  },function(){
    prfMiniTimeOut = setTimeout("$('.prf-mini').fadeOut();", 500);
  });

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
