import { Server } from "@hapi/hapi";
import buildServer from "./server";

enum ENV {
  "production" = "production",
  "development" = "development",
  "local" = "local",
}
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
const envPath = `.env.${ENV[process.env.NODE_ENV]}`;

require("dotenv").config({ path: envPath });
// console.log("process.env", process.env);

let server: Server = null;

buildServer({})
  .then((newServer) => {
    server = newServer;
    return server.start().then(() => {
      const { host, port } = server.info;
      console.log(`Server listening at ${host}:${port}`);
    });
  })
  .catch((error) => console.log("ERROR: ", error));
