(function() {

  require("IGCMS.Mergeable.inited", function () {
    IGCMS.ready(function () {

      var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        return function( obj, callback ){
          if( !obj || !obj.nodeType === 1 ) return; // validation

          if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                callback(mutations);
            })
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
          }

          else if( window.addEventListener ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
          }
        }
      })();
      
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }

      var options = document.querySelectorAll(".house option")
      for (var i = 0; i < options.length; i++) {
        options[i].setAttribute("data-text", options[i].innerText)
      }

      var hrefs = document.querySelectorAll(".houses_map a")
      for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener("click", function (event) {
          var houseId = event.target.href.split("#")[1]
          var selector = "#" + houseId + " select[name='land" + houseId + "'] option"
          var options = document.querySelectorAll(selector)
          for (var j = 0; j < options.length; j++) {
            if (options[j].getAttribute("data-text") !== event.target.innerText.split("\n")[1]) {
              continue
            }
            options[j].selected = "selected"
            options[j].parentNode.dispatchEvent(new HashChangeEvent("change"))
          }
        }, false)
      }

      var selects = document.querySelectorAll(".house select")
      for (var i = 0; i < selects.length; i++) {
        selects[i].setAttribute("aria-label", "Velikost pozemku")
        selects[i].addEventListener("change", function (event) {
          var select = event.target
          changePrices(select)
        }, false)
        selects[i].options[0].selected = "selected"
        selects[i].selectedIndex = 0
        selects[i].dispatchEvent(new Event("change"))
      }

      var prices = document.querySelectorAll(".house-price")
      for (var i = 0; i < prices.length; i++) {
//         observeDOM(prices[i].parentNode.parentNode, function (event) {
//           var houseId = this.id
//           var selector = "#" + houseId + " select[name='land"
//             + (houseId.indexOf("a") == 0 ? "A" : "B") + "']"
//           var select = document.querySelector(selector)
          //select.dispatchEvent(new HashChangeEvent("change"))
//         }.bind(prices[i].parentNode.parentNode.parentNode), false)
      }

      function changePrices (select) {
        var selectedOption = select.options[select.selectedIndex]
        var state = selectedOption.getAttribute("data-state")
        var landSize = parseInt(selectedOption.getAttribute("data-size"))
        var dl = select.closest('dl')
        dl.querySelector('.velikost-pozemku').innerText = selectedOption.getAttribute("data-size") + "m²"
        dl.querySelector('.stav').innerText = selectedOption.getAttribute("data-state")
        if (state === "Prodáno" || state == "Rezervace") {
          dl.querySelector(".house-price").innerText = state
          dl.querySelector(".house-full").innerText = ""
          dl.querySelector(".house-full-dph").classList.add("sold")
          dl.querySelector(".house-full-dph").classList.add("highlight")
          dl.querySelector(".house-full-dph").innerText = state
          //dl.querySelector(".land-full").innerText = ""
          //dl.querySelector(".land-full-dph").innerText = state
          //dl.querySelector(".land-full-dph").classList.add("sold")
          return;
        }
        //var housePrice = parseInt(dl.querySelector(".house-price").getAttribute("data-price"))
        //if (!housePrice) {
        //  return
        //}
        //dl.querySelector(".house-price").innerText = numberWithCommas(housePrice) + " Kč"
        //var houseFullPrice = 2300 * landSize + housePrice
        //dl.querySelector(".house-full").innerText = numberWithCommas(houseFullPrice) + " Kč bez DPH"
        //dl.querySelector(".house-full-dph").classList.add("highlight")
        //dl.querySelector(".house-full-dph").classList.remove("sold")
        //dl.querySelector(".house-full-dph").innerText = numberWithCommas(Math.round(houseFullPrice * 1.15))  + " Kč"
        // var landFullPrice = 2800 * landSize
        // dl.querySelector(".land-full").innerText = numberWithCommas(landFullPrice) + " Kč"
        // dl.querySelector(".land-full-dph").innerText = numberWithCommas(Math.round(landFullPrice * 1.21)) + " Kč"
        //dl.querySelector(".land-full-dph").classList.add("highlight")
        //dl.querySelector(".land-full-dph").classList.remove("sold")
        dl.querySelector(".price1").innerText = numberWithCommas(landSize * 2800) + " Kč"
        dl.querySelector(".price2").innerText = numberWithCommas(landSize * 423) + " Kč"
        dl.querySelector(".price3").innerText = numberWithCommas(landSize * 3223) + " Kč"
        dl.querySelector(".price4").innerText = numberWithCommas(landSize * 3900) + " Kč"
      }

    })
  })

})()

