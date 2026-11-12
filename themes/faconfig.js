FontAwesomeConfig = {
  observeMutations: true,
  mutateApproach: "sync"
};

(function() {
  var icons = document.querySelectorAll('*[class*="fa-"]')
  for (var i = 0; i < icons.length; i++) {
    icons[i].innerHTML = ""
  }
})()