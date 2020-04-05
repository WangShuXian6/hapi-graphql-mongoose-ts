import Config from "./config";
import { Mongoose, connect } from "mongoose";

let connection;
//let isConnected: boolean = false;

export default function (config?: Config): any {
  console.log("config::", config);
  if (!connection) {
    // if (!config) {
    //   throw new Error(
    //     "connection has not been instantiated, please provide config"
    //   );
    // }

    connection = connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((db: Mongoose) => {
        console.log("Connected Succesfully");
        //isConnected = db.connection.readyState === 1; // 1 for connected
        connection = db.connection;
      })
      .catch((error) => {
        console.log("db error:", error);
        return Promise.reject(error);
      });
  }

  return connection;
}
