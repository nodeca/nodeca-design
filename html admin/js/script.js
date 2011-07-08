$(window).load(function(){

});

/**
 * Drop box toggler
 */

var toggleDropBox = new function(){

  this.show = function(thisEl,calledEl) {

    $(thisEl).toggleClass('menu-toggler-expanded');
    $('#'+calledEl).toggleClass('dropBox-expanded');

  };

}