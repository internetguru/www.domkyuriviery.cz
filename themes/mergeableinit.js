(function () {
  require("IGCMS.Mergeable", function () {
    IGCMS.ready(function () {
      IGCMS.Mergeable.init({
        rootSelector: "dl .img",
        selectAriaLabel: "Velikost pozemku"
      })
    })
  })
})()