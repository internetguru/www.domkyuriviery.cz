require("WebFont", function() {
  WebFont.load({
    google: {
      families: ['Montserrat:400,300,400italic,500,700:latin-ext'],
//       families: ['Roboto:400,300,400italic,500,700:latin-ext'],
//     families: ['Roboto'],
//     urls: ['/lib/roboto/roboto.css'],
    },
    active: function () {
      sessionStorage.fonts = true
    },
  })
})