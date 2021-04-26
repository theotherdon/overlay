;(function () {
  document.addEventListener("DOMContentLoaded", (event) => {
    const links = document.querySelectorAll("a")
    links.forEach((link) => {
      if (isGumroadLink(link)) {
        const parent = link.parentElement
        if (isProductEmbed(link, parent)) {
          embedProduct(link, parent)
        } else {
          setupIFrameModal(link)
        }
      }
    })
  })

  function buildDiv() {
    const div = document.createElement("div")
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.position = "absolute"
    div.style.display = "flex"
    div.style.top = "0"
    div.style.left = "0"
    div.style.zIndex = "9999"
    div.style.background = "rgba(0, 0, 0, 0.5)"
    return div
  }

  function buildIFrame(link) {
    const iframe = document.createElement("iframe")
    iframe.setAttribute("src", link.href)
    iframe.style.width = "90%"
    iframe.style.height = "90%"
    iframe.style.margin = "auto auto"
    iframe.style.display = "block"
    return iframe
  }

  function isProductEmbed(link, parent) {
    const classList = parent.classList || { value: "" }
    return classList.value.indexOf("gumroad-product-embed") != -1
  }

  function embedProduct(link, parent) {
    const iframe = buildIFrame(link)
    iframe.onload = (event) => {
      link.remove()
    }
    parent.appendChild(iframe)
  }

  function setupIFrameModal(link) {
    link.onclick = (event) => {
      event.preventDefault()
      const div = buildDiv()
      const iframe = buildIFrame(link)
      div.appendChild(iframe)
      document.body.appendChild(div)
    }
  }

  function isGumroadLink(link) {
    return link.href.indexOf("gumroad.com") != -1
  }
})()
