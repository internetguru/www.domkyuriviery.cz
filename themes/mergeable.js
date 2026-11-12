(function () {

  require("IGCMS", function () {

    var Mergeable = function () {

      var
      childToRoot = [],
      nameSwitches = [],
      switches = [],
      Types = Object.freeze({
        link: 1,
        select: 2
      }),
      Config = {
        type: Types.link,
        changeHash: false,
        rootSelector: "dl",
        rootElmClass: "",
        selectAriaLabel: "",
      },
      switchProduct = function (event) {
        var elmId
        switch (Config.type) {
          case Types.link:
            elmId = event.target.id
          break
          case Types.select:
            elmId = event.target.value
          break
        }
        var refs = childToRoot[elmId]
        var i
        if (Config.type === Types.link) {
          for (i = 0; i < switches[refs.rootId].length; i++) {
            switches[refs.rootId][i].classList.remove("active")
          }
          event.target.classList.add("active")
        }
        var rootsMerges = refs.root.querySelectorAll("*[data-merge]")
        var childMerges = refs.child.querySelectorAll("*[data-merge]")
        for (i = 0; i < childMerges.length; i++) {
          rootsMerges[i].parentNode.replaceChild(childMerges[i].cloneNode(true), rootsMerges[i])
        }
        if (Config.changeHash) {
          window.history.replaceState("", "", "#" + refs.root.getAttribute("id"))
          window.dispatchEvent(new HashChangeEvent("hashchange"))
        }
        if (Config.type === Types.link) {
          var houseId = refs.rootId
          var selector = "*[data-id='" + houseId + "'] select[name='land"
            + (houseId.indexOf("a") == 0 ? "A" : "B") + "']"
          var select = document.querySelector(selector)
          select.dispatchEvent(new Event("change"))
        }
      },
      merge = function (root, rootId, child, childId) {
        childToRoot[childId] = {
          child: child.cloneNode(true), // save initial node
          root: root,
          rootId: rootId
        }
        switch (Config.type) {
          case Types.link:
            // create new switchLink
            var switchLink = document.createElement("a")
            switchLink.href = "Javascript:void(0)"
            switchLink.innerText = child.hasAttribute("data-heading")
              ? child.getAttribute("data-heading")
              : child.querySelector("*[data-heading]").getAttribute("data-heading")
            switchLink.id = childId
            if (!switches[rootId]) {
              switches[rootId] = []
            }
            switches[rootId].push(switchLink)
            // fire event
            switchLink.addEventListener("click", switchProduct, false)
            nameSwitches[rootId].appendChild(switchLink)
            break
          case Types.select:
            // create new option
            var option = document.createElement("option")
            option.innerText = child.hasAttribute("data-heading")
              ? child.getAttribute("data-heading")
              : child.querySelector("*[data-heading]").getAttribute("data-heading")
            option.setAttribute("value", childId)
            nameSwitches[rootId].appendChild(option)
          break
        }

      },
      initStructure = function () {
        var children = document.querySelectorAll("*[data-root]")
        for (var i = 0; i < children.length; i++) {
          var child = children[i]
          var rootId = child.getAttribute("data-root")
          var root = document.querySelector("*[data-id=" + rootId + "]")
          if (!root) {
            console.log("Root " + rootId + " not found")
            continue
          }
          // initialize select
          if (!nameSwitches[rootId]) {
            var rootElm
            switch (Config.type) {
              case Types.link:
                rootElm = document.createElement("div")
              break
              case Types.select:
                rootElm = document.createElement("select")
                if (Config.selectAriaLabel) {
                  rootElm.setAttribute("aria-label", Config.selectAriaLabel)
                }
                // fire events
                rootElm.addEventListener("change", switchProduct, false)
              break
              default:
                throw "Unknown type " + Config.type
            }
            rootElm.className = "js-merge " + Config.rootElmClass
            nameSwitches[rootId] = rootElm
            var dl = root.querySelector(Config.rootSelector)
            dl.appendChild(rootElm)
            merge(root, rootId, root, rootId)
            if (Config.type === Types.link) {
              switches[rootId][switches[rootId].length - 1].classList.add("active")
            }
          }
          merge(root, rootId, child, child.getAttribute("data-id"))
        }
      }
      return {
        init: function (cfg) {
          IGCMS.initCfg(Config, cfg)
          initStructure()
          IGCMS.appendStyle("*[data-root] { display: none; }")
          IGCMS.Mergeable.inited = true
        },
        Types: Types
      }
    }
    IGCMS.Mergeable = new Mergeable()
  })

})()
