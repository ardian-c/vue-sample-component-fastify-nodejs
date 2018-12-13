exports.options = {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Britecore - Sample Application",
      description: "Sample application for Britecore"
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here"
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
};