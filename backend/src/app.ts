import path from "path";
import express from "express";
import bodyParser from "body-parser";
import blogPosts from "./routes/blogPosts";

import fs from "fs";
import BlogPostController from "./controllers/BlogPostController";

const DATA_SYMBOL = "<!--data-->";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/assets", express.static(path.resolve(__dirname, "../assets")));
app.use("/resources", express.static(path.resolve(__dirname, "../../build/resources")));

async function getHTMLFile(data = {}): Promise<string> {
  const htmlFile = await fs.promises.readFile(path.resolve(__dirname, "../../build/index.html"), "utf8");
  return htmlFile.replace(DATA_SYMBOL, JSON.stringify(data));
}

app.get("/api/ok", (_, res) => {
  res.send("Ok");
});

app.get("/", async (_, res) => {
  const blogPosts = await BlogPostController.getAllWithURLCover(3);
  res.send(await getHTMLFile({ blogPosts }));
});

app.get("/blog/posts/:id", async (req, res) => {
  const blogPost = await BlogPostController.getByIdWithURLCover(parseInt(req.params.id));
  res.send(await getHTMLFile({ blogPost }));
});

app.get("/blog/posts/:id/edit", async (req, res) => {
  const blogPost = await BlogPostController.getByIdWithURLCover(parseInt(req.params.id));
  res.send(await getHTMLFile({ blogPost }));
});

app.get("/blog/create-post", async (_, res) => {
  res.send(await getHTMLFile());
});

app.use("/api/blog/posts", blogPosts);

export default app;
