import { Sequelize } from "sequelize-typescript";
import { BlogPost } from "./models";
import { SEQUELIZE_LOGGING } from "./constants";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: SEQUELIZE_LOGGING ? undefined : false,
});

sequelize.addModels([BlogPost]);

export default sequelize;
