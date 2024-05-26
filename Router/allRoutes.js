import Route from "./Route.js"

// Definition of routes here
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/galerie", "La galerie", "/pages/galerie.html")
]

// The title is displayed like this : Route.title - websitename
export const websitename = "Quai Antique"