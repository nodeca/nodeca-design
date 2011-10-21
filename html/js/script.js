$(window).load(function(){

  // init togglers for collapsable elements
  $('._collapser').ndCollapser();
  $('._expander').ndExpander();

  // init tipsy elements
  var tipGeneric = { fade:true, opacity:"1"};
  $('._tip').each(function () {
      // tipsyGeneric is optional, and given here as an idea of how to provide
      // default options for `.tip` elements only. If you want to override
      // global tipsy defaults, then just override values of
      // $.fn.tipsy.defaults object
      $(this).tipsy($.fn.tipsy.elementDataOptions(this, tipGeneric));
  });

  // init hidden menus
  $('._menu-pin').ndMenu();

  $('._editable').editable('http://www.appelsiini.net/projects/jeditable/php/save.php', {});

  // Debug code ===================
  // Add button to switch page width
  var dbg_width_arr = ['', '760px', '80%'], // '' is "default" (as in CSS)
      dbg_width_idx = 0, // current width index
      dbg_width_max = dbg_width_arr.length - 1; // upper bound
  $('<a class="btn">resize</a>').css({
    position: 'absolute',
    top: '5px',
    left: '5px',
    opacity: .3,
    fontSize: '12px'
  }).click(function () {
    if (dbg_width_max < ++dbg_width_idx) { dbg_width_idx = 0; }
    $('.trunk').css('width', dbg_width_arr[dbg_width_idx]);
  }).appendTo(document.body);
  // Debug code end ================

  // tab switching
  $('._tab-pin').click(function(){
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
  $('.post-v, .tl-select-col input').change(function(){
    if ( $(this).is(':checked') ) {
      $('.bulkmod-menu').fadeIn();
      var w = $('.bulkmod-menu').width() + $(this).width() + 10;
      var t = $(this).offset().top - $(window).scrollTop();
      var r = $(window).width() - $(this).offset().left +10;
      $('.bulkmod-menu').css({right: r, marginTop: t});

    }
    if ( $('.post-v:checked, .tl-select-col input:checked').length < 1 ) {
      $('.bulkmod-menu').fadeOut();
    }
  });

  $('.quick-unselect-all').click(function(){
    $('.post-v, .tl-select-col input').each(function(){
      if ($(this).is(':checked')) {$(this).click();}
    });
  });

  // Scroller
  var checkScroller = function(){
    var s = $(window).scrollTop(),
        h = 300,
        el = $('._scroll-top');
    
    if ( s > h && !el.is(':visible') ) {
      el.fadeIn();
    } else if ( s <= h && el.is(':visible') ) {
      el.fadeOut();
    }
  }
  $(window).scroll($.throttle(250, checkScroller));
  
  $('._scroll-top').click(function(e){
    e.preventDefault();
    $("html,body").animate({scrollTop: 0}, 'fast');
  });


  // toggle filter button
  $('.filter-btn').click(function(){
    $(this).parent().toggleClass('_filter-active');
    return false;
  });

  // toggle filter button
  $('.cutted-text .toggler').click(function(){
    $(this).parent().toggleClass('_expanded');
    return false;
  });

  // popup showing

  $('._pp-hover').hover(function(){
    $('.popover').removeClass('pp-arrow-top');
    var t = $(this).offset().top - $('.popover').outerHeight();
    var l = $(this).offset().left;
    var tLimiter = $('#top').height();
    if ( t <= tLimiter ) {
      t = $(this).offset().top + $(this).outerHeight();
      $('.popover').addClass('pp-arrow-top');
    }
    $('.popover').css({ top: t, left: l }).fadeIn();
  },function(){
    $('.popover').fadeOut();
  });

  $('._pp-focus').focus(function(){
    $('.popover').removeClass('pp-arrow-top');
    var t = $(this).offset().top - $('.popover').outerHeight();
    var l = $(this).offset().left;
    var tLimiter = $('#top').height();
    if ( t <= tLimiter ) {
      t = $(this).offset().top + $(this).outerHeight();
      $('.popover').addClass('pp-arrow-top');
    }
    $('.popover').css({ top: t, left: l }).fadeIn();
  });
  $('._pp-focus').blur(function(){
    $('.popover').fadeOut();
  });


  // Background noise
  $('body').noisy({
    'intensity' : 1,
    'size' : 200,
    'opacity' : 0.06,
    'fallback' : '',
    'monochrome' : false
  }); //.css('background-color', '#fff');

});


// Activate scroller if page already in scrolled atate after load.
$(window).load(function(){
  $(window).scroll();
});

