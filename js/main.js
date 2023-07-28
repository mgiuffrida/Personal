(function() {
  'use strict';

  function replaceAbbr(e) {
    var abbr = e.target;
    var span = document.createElement('span');
    var attributes = abbr.attributes;
    for (var i = 0; i < attributes.length; i++) {
      var attr = attributes[i];
      if (attr.name == 'title')
        span.textContent = attr.value;
      else
        span.setAttribute(attr.name, attr.value);
    }
    if (span.textContent)
      abbr.parentNode.replaceChild(span, abbr);
  }

  function decorateAbbrs() {
    var abbrs = document.querySelectorAll('abbr[title]');
    for (var i = 0; i < abbrs.length; i++) {
      abbrs[i].addEventListener('touchstart', replaceAbbr);
      abbrs[i].addEventListener('mousedown', replaceAbbr);
      abbrs[i].addEventListener('keypress', function(e) {
        if (e.code == 'Enter' || e.keyCode == 'Enter' || e.charCode == 13)
          replaceAbbr(e);
      });
      abbrs[i].setAttribute('tabindex', '0');
    }
  }

  // Removes the first timeline (shown in main view) from the tab order.
  function twitterTabindex() {
    var script = document.querySelector('#twitterScript');
    script.src = script.dataset['src'];
    script.onload = function() {
      for (let i = 0; i < 5; i++) {
        setTimeout(function() {
          requestAnimationFrame(function() {
            document.querySelector('iframe').setAttribute('tabindex', '-1');
          });
        }, 1000 * (i + 1));
      }
    };
  }

  function konami() {
    window.codes = [38];
    codes.unshift(codes[0]);
    codes.unshift(codes[0] + 2);
    codes.unshift(codes[0]);
    codes.unshift(codes[0] - 3);
    codes.unshift(codes[0] + 2);
    codes.unshift(codes[0] - 2);
    codes.unshift(codes[0] + 2);
    codes.unshift('B'.charCodeAt());
    codes.unshift(codes[0] - 1);
    window.i = codes.length;
    document.addEventListener('keydown', function(e) {
      if (i == 0) {
        var div = document.createElement('div');
        var r = Math.random;
        var f = Math.floor;
        var w = window.innerWidth;
        var h = window.innerHeight;
        div.style.backgroundColor = 'rgba(' + [f(r()*256).toString(), f(r()*256).toString(), f(r()*256).toString(), (r()*0.8 + 0.1).toString()].join(',') + ')';
        var width = f(r() * (w/3-10))+10;
        var height = f(r() * (h/3-10))+10;
        div.style.width = width + 'px';
        div.style.height = height + 'px';
        div.style.position = 'fixed';
        div.style.top = f(r() * (h-height)) + 'px';
        div.style.left = f(r() * (w-width)) + 'px';
        document.getElementsByTagName('body')[0].appendChild(div);
      } else if (e.keyCode == codes[codes.length - 1] && i == codes.length - 2) {
        i = codes.length - 2;
      } else if (e.keyCode != codes[--i]) {
        i = codes.length;
      }
    });
  }

  window.addEventListener('load', decorateAbbrs);
  window.addEventListener('load', konami);
  window.addEventListener('load', twitterTabindex);
})();
