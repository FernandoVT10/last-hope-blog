import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import blogPosts from "./routes/blogPosts";
import pages from "./routes/pages";
import auth from "./routes/auth";
import projects from "./routes/projects";
import errorHandler from "./middlewares/errorHandler";

import { ASSETS_DIR, RESOURCES_DIR } from "./constants";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/assets", express.static(ASSETS_DIR));
app.use("/resources", express.static(RESOURCES_DIR));

app.get("/api/ok", (_, res) => {
  res.send("Ok");
});

app.use(pages);

app.use("/api", auth);
app.use("/api/blog/posts", blogPosts);
app.use("/api/projects", projects);
app.use(errorHandler);

export default app;
