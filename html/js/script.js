$(window).load(function(){

  // init togglers for collapsable elements
  $('.collapser').ndCollapser();

  // init tipsy elements
  var tipGeneric = { fade:true, opacity:"1"};
  $('.tip').each(function () {
      // tipsyGeneric is optional, and given here as an idea of how to provide
      // default options for `.tip` elements only. If you want to override
      // global tipsy defaults, then just override values of
      // $.fn.tipsy.defaults object
      $(this).tipsy($.fn.tipsy.elementDataOptions(this, tipGeneric));
  });

  // init hidden menus
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

  // show profile code (temporary)
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

  // posts quick select menu
  $('.post-v').change(function(){
    if ( $(this).is(':checked') ) {
      $('.quick-select').fadeIn();
      var w = $('.quick-select').width() + $(this).width() + 10;
      var t = $(this).offset().top - $(window).scrollTop();
      var l = $(this).offset().left - w;
      $('.quick-select').css({left: l, marginTop: t});
    }
    if ( $('.post-v:checked').length < 1 ) {
      $('.quick-select').fadeOut();
    }
  });

  $('.quick-select').hover(function(){
    $(this).find('dd').show();
  }, function(){
    $(this).find('dd').hide();
  });

  $('.quick-select a').click(function(){

    var type = $(this).attr('class');

    switch(type){
      case 'quick-select-all':
        $('.post-v').each(function(){
          if (!$(this).is(':checked')) {$(this).click();}
        });
        break;
      case 'quick-unselect-all':
        $('.post-v').each(function(){
          if ($(this).is(':checked')) {$(this).click();}
        });
        break;
      case 'quick-invert-selection':
        $('.post-v').click();
        break;
      default:
        alert('error');
    }

  });

});
