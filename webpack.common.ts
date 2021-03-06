import * as CleanPlugin from "clean-webpack-plugin";
import * as CopyPlugin from "copy-webpack-plugin";
import * as HtmlPlugin from "html-webpack-plugin";
import * as Path from "path";
import * as Webpack from "webpack";

// tslint:disable:no-var-requires

// No typings.
const IncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

// Load package definition.
const packageJson = require("./package.json");

// Shorthand for paths.
const resolvePath = (target: string) => Path.resolve(__dirname, target);

// Output to `/docs/` for GitHub pages.
const outputDirectory = "docs";

export const configuration: Webpack.Configuration = {
  devtool: "source-map",
  entry: [
    "./src/index.tsx",
  ],
  module: {
    rules: [
      {
        include: resolvePath("src"),
        loaders: [ "awesome-typescript-loader" ],
        test: /\.tsx?$/,
      },
      {
        enforce: "pre",
        loader: "source-map-loader",
        test: /\.js$/,
      },
      {
        enforce: "pre",
        include: resolvePath("src"),
        loader: "tslint-loader",
        options: {
          configFile: resolvePath("tslint.json"),
        },
        test: /\.tsx?$/,
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: resolvePath(outputDirectory),
  },
  performance: {
    assetFilter(assetName) {
      return assetName.indexOf("material-design-icons-webfont") !== -1;
    },
  },
  plugins: [
    new CleanPlugin([outputDirectory]),
    new CopyPlugin([
      { from: "assets/reset.css", to: "." },
      { from: "assets/stressed_linen.png", to: "." },
      { from: "node_modules/mdi/fonts", to: "./mdi/fonts" },
      { from: "node_modules/mdi/css", to: "./mdi/css" },
    ]),
    new HtmlPlugin({
      author: packageJson.author,
      chunksSortMode: "dependency",
      description: packageJson.description,
      template: resolvePath("./src/index.ejs"),
      title: packageJson.name,
    }),
    new IncludeAssetsPlugin({
      append: false,
      assets: [
        "reset.css",
        "mdi/css/materialdesignicons.min.css",
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

export const faviconOptions = {
  background: "#000000",
  logo: resolvePath("assets/favicon.png"),
  title: packageJson.name,
};
