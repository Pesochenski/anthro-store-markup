const projectFolder = "dist";
const sourceFolder = "src";

const path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/styles/",
    assets: projectFolder + "/assets/",
  },
  dev: {
    html: [sourceFolder + "/pages/*.html", "!" + sourceFolder + "/components/_*.html"],
    css: [sourceFolder + "/styles/*.scss", "!" + sourceFolder + "/styles/_*.scss"],
    assets: sourceFolder + "/assets/**/*.{svg,png,jpg,webp,ico}",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/styles/**/*.scss",
    assets: sourceFolder + "/assets/**/*.{svg,png,jpg,webp,ico}",
  },
  clean: "./" + projectFolder + "/",
};

exports.projectFolder = projectFolder;
exports.sourceFolder = sourceFolder;
exports.path = path;
