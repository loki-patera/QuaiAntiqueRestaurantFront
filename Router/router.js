import Route from "./Route.js"
import { allRoutes, websitename } from "./allRoutes.js"

// Creating a route for page 404
const route404 = new Route("404", "Page introuvable", "/pages/404.html")

// Retrieves the route that matches a given URL
// --------------------------------------------
const getRouteByUrl = (url) => {

  let currentRoute = null

  // Checking all the URL routes to find the one that matches
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element
    }
  })

  // If no match is found, route 404 is returned
  if (currentRoute != null) {
    return currentRoute
  }
  else {
    return route404
  }
}


// Loads page content
// ------------------
const LoadPageContent = async () => {

  const path = window.location.pathname

  // Retrieving the current URL
  const actualRoute = getRouteByUrl(path)

  // Retrieving HTML content from the route
  const html = await fetch(actualRoute.pathHtml).then(data => data.text())

  // Adding HTML content to the element with the "main-page" id
  document.getElementById("main-page").innerHTML = html

  // Adding JavaScript Content
  if (actualRoute.pathJS != "") {
    // Creating a script tag
    let scriptTag = document.createElement("script")
    scriptTag.setAttribute("type", "text/javascript")
    scriptTag.setAttribute("src", actualRoute.pathJS)

    // Adding the script tag to the body of the document
    document.querySelector("body").appendChild(scriptTag)
  }

  // Page title change
  document.title = `${actualRoute.title} - ${websitename}`
}


// Manages routing events
// ----------------------
const routeEvent = (event) => {

  // Cancellation the default behavior
  event.preventDefault()

  // Updating the URL in the browser history
  window.history.pushState({}, "", event.target.href)

  // Loading new page content
  LoadPageContent()
}


// Handling the failback event in browser history
window.onpopstate = LoadPageContent

// Assigning the routeEvent function to the window's route property
window.route = routeEvent

// Loading page content on initial load
LoadPageContent()