(function() {

  require("IGCMS", function () {

    var Config = {};
    Config.ns = "scrolltopable"; // wrapper element (a) id value
    Config.wrapperId = "scrolltop"; // wrapper element (a) id value
    Config.text = "^"; // text content
    Config.title = "Nahoru"; // text content
    Config.hidePosition = 500; // display / hide button int px from top
    Config.scrollhideClass = "scrollhide";
    Config.noprintClass = "noprint";
    Config.visibleClass = Config.ns + "-visible";
    Config.hiddenClass = Config.ns + "-hidden";
    Config.inactiveTimeout = 10; // s
    Config.actionTimeout = 200; // ms
    Config.animationSpeed = 250; // ms
    Config.deltaYshow = 200;
    Config.deltaYhide = 200;
    Config.deltaYbottom = 500;

    var Scrolltopable = function () {

      var scrollTimeOut = null,
        windowScrollTimeOut = null,
        button = null,
        displayed = false,
        step = null,
        wait = 10,
        lastScrollTop = 0,
        getScrollTop = function () {
          return document.body.scrollTop || document.documentElement.scrollTop;
        },
        getHeight = function () {
          var body = document.body,
              html = document.documentElement;
          return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - Math.max(html.clientHeight, window.innerHeight || 0);
        },
        ready = function(callback) {
          // in case the document is already rendered
          if (document.readyState!='loading') callback();
          // modern browsers
          else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
          // IE <= 8
          else document.attachEvent('onreadystatechange', function(){
            if (document.readyState=='complete') callback();
          });
        },
        hideButton = function () {
          displayed = false;
          var btn = document.getElementById(Config.wrapperId)
          btn.className = Config.noprintClass + " " + Config.hiddenClass;
        },
        showButton = function () {
          displayed = true;
          var btn = document.getElementById(Config.wrapperId)
          btn.className = Config.noprintClass + " " + Config.visibleClass;
        },
        processScroll = function () {
          window.clearTimeout(windowScrollTimeOut);
          windowScrollTimeOut = window.setTimeout(function () {
            var scrollTop = getScrollTop();
            var delta = scrollTop - lastScrollTop;
            var deltaAbs = Math.abs(delta);
            if (getHeight() - scrollTop < Config.deltaYbottom) {
              showButton()
            } else if (
              scrollTop < Config.hidePosition
              || (delta > 0 && deltaAbs > Config.deltaYhide)
            ) {
              hideButton();
            } else if (deltaAbs > Config.deltaYshow) {
//             } else if (displayed === false && deltaAbs > Config.deltaYshow) {
              showButton();
            }
            lastScrollTop = scrollTop;
          }, Config.actionTimeout);
        },
        initIfFragment = function () {
          if (window.location.href.split('#').length == 2) {
            var scrollTop = getScrollTop()
            if (scrollTop > Config.hidePosition) {
              showButton()
              lastScrollTop = scrollTop
            }
          }
        },
        setScrollEvent = function () {
          window.addEventListener('scroll', processScroll, false)
        },
        createButton = function () {
          button = document.createElement("a");
          button.id = Config.wrapperId;
          button.title = Config.title;
          button.className = Config.noprintClass + " " + Config.hiddenClass;
          button.href = "#top";
          var span = document.createElement("span");
          span.innerHTML = Config.text;
          button.appendChild(span);
          document.body.appendChild(button);
/*
          ready(function() {
            button.addEventListener("click", function () {
              window.scrollTo({
                "behavior": "smooth",
                "top": top
              });
            }, false);
          });
*/
        };

      return {
        /**
         * Works only for body with class=[Config.ns]
         * @param  {Object} cfg custom configuration
         */
        init: function (cfg) {
          IGCMS.initCfg(Config, cfg);
          var css = '/* scrolltopable.js */'
            + 'a#' + Config.wrapperId + ' { '
            + '  font-family: "Times new roman", serif;'
            + '  position: fixed;'
            + '  right: 0;'
            + '  bottom: 0;'
            + '  text-decoration: none;'
            + '  background: rgba(0, 0, 0, 0.45);'
            + '  font-size: 1.75rem;'
            + '  margin: 0.75rem;'
            + '  display: block;'
            + '  color: white;'
            + '  width: 1em;'
            + '  text-align: center;'
            + '  height: 0;'
            + '  overflow: hidden;'
            + '  z-index: 100;'
            + '  cursor: pointer;'
            + '  line-height: 1;'
            + '  opacity: 0;'
            + '  border: none;'
            + '  transition: opacity ' + Config.animationSpeed + 'ms ease;'
            + '}'
            + 'a#' + Config.wrapperId + '.' + Config.visibleClass + ' { '
            + '  padding: 0.4em;'
            + '  height: 1em;'
            + '  opacity: 1;'
            + '}'
            + 'a#' + Config.wrapperId + ':hover { background: rgba(0, 0, 0, 0.65) }'
            + 'a#' + Config.wrapperId + ' span { font-size: 2.3rem; }';
          IGCMS.appendStyle(css);
          createButton();
          setScrollEvent();
          initIfFragment();
        }
      }
    };

    window.IGCMS.Scrolltopable = new Scrolltopable();
  })
})()