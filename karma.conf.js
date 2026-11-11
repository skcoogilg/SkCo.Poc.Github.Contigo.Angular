// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("@chiragrupani/karma-chromium-edge-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-spec-reporter"),
    ],

    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/product-details"),
      subdir: ".",
      reporters: [
        { type: "html" },
        { type: "text-summary" },
        { type: "lcovonly" }, // Genera el archivo lcov.info necesario para revisar el coverage de cada archivo
      ],
    },
    reporters: ["spec"], // Muestra en consola el detalle de todas las pruebas ejecutadas
    browsers: ["EdgeHeadless"],
    restartOnFileChange: true,
  });
};
