import sequelize from "./sequelize";
import app from "./app";

import { PORT } from "./constants";

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => console.log("[SERVER] Server is running"));
  } catch(e) {
    console.error("[SERVER] Error trying to connect to db", e);
  }
}

main();
