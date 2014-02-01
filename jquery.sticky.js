(function ($) {
  
  // http://davidwalsh.name/ways-css-javascript-interact
  function addCSSRule (sheet, selector, rules, index) {
   if (sheet.insertRule) {
      sheet.insertRule(selector + '{ ' + rules + ' }', index)
    } else {
      sheet.addRule(selector, rules, index)
    }   
  }
  
  function heightOffset (elem) {
    var height = 0
    
    elem.prevAll(':visible').each(function (_, sibling) {
      height += $(sibling).outerHeight()
    })
    
    return height || elem.outerHeight()
  }
  
  $.fn.sticky = function () {
    var elem = $(this),
        nextVisible = elem.siblings().first(':visible'),
        stuck = false,
        styleSheet = document.styleSheets[0]
        
    addCSSRule(styleSheet, '.stuck', 'position: fixed !important; top: 0 !important; z-index: 10')
  
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > heightOffset(elem)) {
        if (!stuck) {
          elem.addClass('stuck')
          nextVisible.css('margin-top', elem.outerHeight())
          stuck = true
        }
      } else {
        elem.removeClass('stuck')
        nextVisible.css('margin-top', "")
        stuck = false
      }
    })
  }
})(jQuery)
