(function() {
  function hideAll () {
    houses.forEach((item) => {
      item.classList.remove('house--shown')
    })
    overlay.classList.remove('overlay--shown')
  }
  function showHouse (event) {
    hideAll()
    var house = document.querySelector(event.target.hash)
    house.classList.add('house--shown')
    house.style.top = (window.scrollY + event.clientY)+'px';
    overlay.classList.add('overlay--shown')
    event.preventDefault()
    return false
  }
  var houses = document.querySelectorAll('.house')
  document.querySelectorAll('.houses_map a[href^="#"]').forEach((link) => {
    link.addEventListener('click', showHouse)
  })
  var overlay = document.createElement('div')
  overlay.className = 'overlay'
  overlay.addEventListener('click', () => {
    hideAll()
  })
  document.body.appendChild(overlay)
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      hideAll()
    } 
  }
  var closeButton = document.createElement('div')
  closeButton.innerHTML = '×'
  closeButton.className = 'overlay__close'
  overlay.appendChild(closeButton)
  closeButton.addEventListener('click', hideAll)
  /*
  houses.forEach((house) => {
    house.parentNode.removeChild(house)
    overlay.appendChild(house)
  })
  */
})()

