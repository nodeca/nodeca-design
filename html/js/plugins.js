// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || []; // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


// place any jQuery/helper plugins in here, instead of separate, slower script files.


/**
* ndCollapser : jQuery plugin
*/
;(function ($, undefined) {
  // internal
  // finds element given by data-`name` selector or n-th parent
  var get_related_el = function get_related_el($this, name) {
    var value = $this.data(name);

    // using lossy comparison as empty values
    // should be treaten as 0 for us
    if (value != +value) {
      return $(value);
    }

    // make no difference between -1 and 1
    value = Math.abs(value);

    // reduce value by one, if value is higher than 0
    // as first parent index is 0
    if (0 < value) { value--; }

    return $this.parents().eq(value);
  };


  // Applies collapser to each matching element.
  //
  // Configuration for each collapser is taken directly from element's data
  // attributes (optional), which are:
  //
  //  - toggle (String): Selector of data that should become collapsable.
  //    If not given, then next sibling element of toggler's parent will be
  //    used, e.g.:
  //
  //      <h1> Collapsable thing <span id="t">O</span></h1>
  //      <div id="foobar">...</div>
  //      <div id="xoxoxo">...</div>
  //
  //    In the example above, calling `$('#t').NodecaCollapser()` will make
  //    span#t become toggler for div#foobar, so it will collapse/uncollapse
  //    when clicked. But you may want to make it collapse div#xoxoxo instead,
  //    so you may add `toggle` attribute like so:
  //
  //      <span id="t" data-toggle="#xoxoxo">O</span>
  //
  //    Or even both divs:
  //
  //      <span id="t" data-toggle="#foobar, #xoxoxo">O</span>
  //
  //  - notify (Number|String): Specifies element that will be notified (via
  //    toggling CSS class "collapsed". "-2" by default.
  //
  //    When given as a String, element will be found by selector, e.g.:
  //
  //      <span id="t" data-notify="#foobar">...
  //
  //    will add `collapsed` class to element found by #foobar, when span#t
  //    will collapse container (see toggle), and remove this class on
  //    uncollapse.
  //
  //    When given as a Number, n-th parent of `toggler` will be used, e.g.
  //
  //      <div id="abc">
  //      <h1> ... <span id="t" data-notify=2>...
  //
  //    will add `collapsed` to div#abc, when span#t is clicked.
  //
  //    By default, equals 2.
  //
  //  - extra-toggler (Number|String): Specifies element that should act as
  //    "alias" of toggler. See exaplanation of `notify` about possible types
  //    of values.
  //
  //    By default, no extra-togglers will be used.
  //
  //
  // ##### Examples:
  //
  // jQuery('span.show-hide-trigger').ndCollapser();
  //
  $.fn.ndCollapser = function () {
    return this.each(function () {
      var $this = $(this),
          $togglers = $this, // by default bind click on toggler only
          $notify = (undefined === $this.data('notify'))
                    ? $this.parent().parent()
                    : get_related_el($this, 'notify'),
          $slave = $this.data('toggle')
                    ? $($this.data('toggle'))
                    : $this.parent().next();

      if (undefined !== $this.data('extra-toggler')) {
        (function ($extra_toggler) {
          $extra_toggler.css('cursor', 'pointer');
          $togglers = $this.add($extra_toggler);
        })(get_related_el($this, 'extra-toggler'));
      }

      $togglers.click(function (evt) {
        evt.stopPropagation();
        $notify.toggleClass('collapsed');
        $slave.slideToggle();

      });
    });
  };
})(jQuery);


// monkey-patch tipsy
;(function ($, undefined) {
  $.fn.tipsy.elementOptions = function elementOptionsPatched(el, generic) {
    var $el = $(el),
        inline = {};

    $.each($.fn.tipsy.defaults, function (key) {
      var val = $el.data('tipsy-' + key);
      if (val) {
        inline[key] = val;
      }
    });

    return $.extend({}, generic, inline);
  };
})(jQuery);


// adds hidden menu support
;(function ($, undefined) {
  $.fn.ndMenu = function () {
    return this.each(function () {
      var $world = $(document),
          $this = $(this),
          $menu = $this.next(),
          show = function (evt) {
            $menu.fadeIn(function () {
              $world.one('click', hide);
            });
          },
          hide = function () { $menu.fadeOut(); };

      $menu.click(function (evt) {
        evt.stopPropagation();
      });

      $this.click(show);
    });
  };
})(jQuery);
