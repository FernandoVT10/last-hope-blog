import express from "express";
import bodyParser from "body-parser";
import blogPosts from "./routes/blogPosts";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/ok", (_, res) => {
  res.send("Ok");
});

app.use("/api/blog/posts", blogPosts);

export default app;
