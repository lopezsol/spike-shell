import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    // if (name === "@org/header") {
    //   return System.import("http://localhost:4202/main.js");
    // }
    // if (name === "@org/header") {
    //   return System.import("http://localhost:4201/main.js");
    // }
    if (name === "@org/home") {
      return System.import("http://localhost:4203/main.js");
    }
    if (name === "@org/profile") {
      return System.import("http://localhost:4204/main.js");
    }
    return import(/* webpackIgnore: true */ name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
