import { isUndefined } from "util";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  const port = envs.PORT !== undefined ? envs.PORT : 3000;

  const server = new Server({
    port: port,
    routes: AppRoutes.routes,
  });
  server.start();
}
