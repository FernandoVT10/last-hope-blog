import fs from "fs";
import BlogPostController from "../controllers/BlogPostController";
import AuthController from "../controllers/AuthController";
import ProjectController from "../controllers/ProjectController";

import { Router, Request } from "express";
import { HTML_PATH } from "../constants";
import { authorizePage } from "../middlewares/authorize";

const DATA_SYMBOL = "<!--data-->";
const GENERAL_DATA_SYMBOL = "<!--general-data-->";
const TITLE_SYMBOL = "<!--title-->";

async function getHTMLFile(req: Request, title: string, data = {}): Promise<string> {
  let htmlFile = await fs.promises.readFile(HTML_PATH, "utf8");
  const generalData = {
    isAuthenticated: await AuthController.isAuthenticated(req.cookies),
  };

  htmlFile = htmlFile.replace(TITLE_SYMBOL, title);
  htmlFile = htmlFile.replace(GENERAL_DATA_SYMBOL, JSON.stringify(generalData));
  // TODO: think about a better solution for escaping characters
  return htmlFile.replace(DATA_SYMBOL, JSON.stringify(data).replace(/<\//g, "<\\/"));
}

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const blogPosts = await BlogPostController.getAllWithURLCover(3);
    res.send(await getHTMLFile(req, "Fernando Vaca Tamayo", { blogPosts }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0;
    const blogPost = await BlogPostController.getByIdWithURLCover(id);
    const title = blogPost?.title || "Not found";
    res.send(await getHTMLFile(req, title, { blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id/edit", authorizePage(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0;
    const blogPost = await BlogPostController.getByIdWithURLCover(id);
    const title = "Editing " + blogPost?.title || "Not found";
    res.send(await getHTMLFile(req, title, { blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/create-post", authorizePage(), async (req, res, next) => {
  try {
    res.send(await getHTMLFile(req, "Create Blog Post"));
  } catch(e) {
    next(e);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    res.send(await getHTMLFile(req, "Login"));
  } catch(e) {
    next(e);
  }
});

router.get("/blog", async (req, res, next) => {
  try {
    const blogPosts = await BlogPostController.getAllWithURLCover(10);
    res.send(await getHTMLFile(req, "Blog", { blogPosts }));
  } catch(e) {
    next(e);
  }
});

router.get("/projects/create", async (req, res, next) => {
  try {
    res.send(await getHTMLFile(req, "Create Project"));
  } catch(e) {
    next(e);
  }
});

router.get("/projects", async (req, res, next) => {
  try {
    const projects = await ProjectController.getAllWithURLCover();
    res.send(await getHTMLFile(req, "Projects", { projects }));
  } catch(e) {
    next(e);
  }
});

router.get("/projects/:id/edit", authorizePage(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id) || 0;
    const project = await ProjectController.getByIdWithURLCover(id);
    const title = "Editing " + project?.name || "Not found";
    res.send(await getHTMLFile(req, title, { project }));
  } catch(e) {
    next(e);
  }
});

router.get("*", async (req, res, next) => {
  try {
    // react handles it and shows a 404 page
    res.send(await getHTMLFile(req, "404 page not found"));
  } catch(e) {
    next(e);
  }
});

export default router;
