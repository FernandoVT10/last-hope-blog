import fs from "fs";
import jwt from "jsonwebtoken";
import BlogPostController from "../controllers/BlogPostController";

import { Router, RequestHandler } from "express";
import { DATA_SYMBOL, HTML_PATH, JWT_SECRET_KEY, PASSWORD, TOKEN_COOKIE_NAME } from "../constants";

type DecodedData = {
  password: string;
};

function decodeToken(jwtToken: string): Promise<DecodedData> {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, JWT_SECRET_KEY, (err, decodedData) => {
      if(err)
        return reject(err);

      if(!decodedData)
        return reject(new Error("Decoded data is undefined"));

      resolve(decodedData as DecodedData);
    });
  });
}

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const data = await decodeToken(token);
    return data.password === PASSWORD;
  } catch {
    return false;
  }
}

function withAuthorization(): RequestHandler {
  return async (req, res, next) => {
    const token = req.cookies[TOKEN_COOKIE_NAME];
    if(!token) {
      res.redirect("/");
      return;
    }

    if(!(await isTokenValid(token))) {
      res.redirect("/");
      return;
    }

    next();
  };
}

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
    const blogPost = await BlogPostController.getByIdWithURLCover(parseInt(req.params.id));
    res.send(await getHTMLFile({ blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/posts/:id/edit", withAuthorization(), async (req, res, next) => {
  try {
    const blogPost = await BlogPostController.getByIdWithURLCover(parseInt(req.params.id));
    res.send(await getHTMLFile({ blogPost }));
  } catch(e) {
    next(e);
  }
});

router.get("/blog/create-post", withAuthorization(), async (_, res, next) => {
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

// TODO: pages like the blog post page and edit blog post page should show
// some kind of page when there's no a post with the given id
export default router;
