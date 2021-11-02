const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = (app) => {
  // Extended: https://swagger.io/specification/#infoObject
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Passport login API",
        description:
          "Passport localstrategy, OAuth strategy, such as google, githug,facebook",
        contact: {
          name: "Youngki Nam",
        },
        servers: [`${process.env.HOST}:${process.env.PORT}`],
      },
    },
    // ['.routes/*.js']
    apis: ["./router/login_client.js", "./router/login.js"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
