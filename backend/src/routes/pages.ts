import fs from "fs";
import BlogPostController from "../controllers/BlogPostController";

import { Router, Request } from "express";
import { HTML_PATH } from "../constants";
import { authorizePage } from "../middlewares/authorize";
import AuthController from "../controllers/AuthController";

export const DATA_SYMBOL = "<!--data-->";
export const GENERAL_DATA_SYMBOL = "<!--general-data-->";

async function getHTMLFile(req: Request, data = {}): Promise<string> {
  let htmlFile = await fs.promises.readFile(HTML_PATH, "utf8");
  const generalData = {
    isAuthenticated: await AuthController.isAuthenticated(req.cookies),
  };

  htmlFile = htmlFile.replace(GENERAL_DATA_SYMBOL, JSON.stringify(generalData));
  return htmlFile.replace(DATA_SYMBOL, JSON.stringify(data));
}

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const blogPosts = await BlogPostController.getAllWithURLCover(3);
    res.send(await getHTMLFile(req, { blogPosts }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0;
    const blogPost = await BlogPostController.getByIdWithURLCover(id);
    res.send(await getHTMLFile(req, { blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id/edit", authorizePage(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0;
    const blogPost = await BlogPostController.getByIdWithURLCover(id);
    res.send(await getHTMLFile(req, { blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/create-post", authorizePage(), async (req, res, next) => {
  try {
    res.send(await getHTMLFile(req));
  } catch(e) {
    next(e);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    res.send(await getHTMLFile(req));
  } catch(e) {
    next(e);
  }
});

router.get("*", async (req, res, next) => {
  try {
    // react handles it and shows a 404 page
    res.send(await getHTMLFile(req));
  } catch(e) {
    next(e);
  }
});

export default router;
