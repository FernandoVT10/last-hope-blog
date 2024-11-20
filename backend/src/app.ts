import path from "path";
import express from "express";
import bodyParser from "body-parser";
import blogPosts from "./routes/blogPosts";
import pages from "./routes/pages";
import auth from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/assets", express.static(path.resolve(__dirname, "../assets")));
app.use("/resources", express.static(path.resolve(__dirname, "../../build/resources")));

app.get("/api/ok", (_, res) => {
  res.send("Ok");
});

app.use(pages);

app.use("/api", auth);
app.use("/api/blog/posts", blogPosts);

export default app;
