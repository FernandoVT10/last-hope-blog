import fs from "fs";
import BlogPostController from "../controllers/BlogPostController";

import { Router } from "express";
import { DATA_SYMBOL, HTML_PATH } from "../constants";
import { authorizePage } from "../middlewares/authorize";

async function getHTMLFile(data = {}): Promise<string> {
  const htmlFile = await fs.promises.readFile(HTML_PATH, "utf8");
  return htmlFile.replace(DATA_SYMBOL, JSON.stringify(data));
}

const router = Router();

router.get("/", async (_, res, next) => {
  try {
    const blogPosts = await BlogPostController.getAllWithURLCover(3);
    res.send(await getHTMLFile({ blogPosts }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0;
    const blogPost = await BlogPostController.getByIdWithURLCover(id);
    res.send(await getHTMLFile({ blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id/edit", authorizePage(), async (req, res, next) => {
  try {
    const blogPost = await BlogPostController.getByIdWithURLCover(parseInt(req.params.id));
    res.send(await getHTMLFile({ blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/create-post", authorizePage(), async (_, res, next) => {
  try {
    res.send(await getHTMLFile());
  } catch(e) {
    next(e);
  }
});

router.get("/login", async (_, res, next) => {
  try {
    res.send(await getHTMLFile());
  } catch(e) {
    next(e);
  }
});

router.get("*", async (_, res, next) => {
  try {
    // react handles it and shows a 404 page
    res.send(await getHTMLFile());
  } catch(e) {
    next(e);
  }
});

export default router;
