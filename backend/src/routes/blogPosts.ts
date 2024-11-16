import { Router } from "express";
import {
  MAX_BLOGPOST_CONTENT_LENGTH,
  MAX_BLOGPOST_TITLE_LENGTH
} from "../constants";

import validateReq, { Validators, Validator } from "../middlewares/validateReq";
import parseMultipart, { imageValidator } from "../middlewares/parseMultipart";

import BlogPostController from "../controllers/BlogPostController";

const router = Router();

const createBlogPost: Validators = {
  cover: { type: "image" },
  title: {
    type: "string",
    required: true,
    maxLength: MAX_BLOGPOST_TITLE_LENGTH,
  },
  content: {
    type: "string",
    required: true,
    maxLength: MAX_BLOGPOST_CONTENT_LENGTH,
  },
};

router.post(
  "/",
  parseMultipart("cover", imageValidator),
  validateReq(createBlogPost),
  async (req, res, next) => {
    try {
      const { title, content } = req.body;
      await BlogPostController.createOne(req.file as Buffer, { title, content });
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (_, res, next) => {
  try {
    const blogPosts = await BlogPostController.getAllWithURLCover();
    res.json({ blogPosts });
  } catch(e) {
    next(e);
  }
});

const idValidator: Validator = {
  type: "number",
  in: "params",
  min: 1,
  required: true,
  custom: async (id) => {
    // TODO: what if existsById throws? Handle that
    let exists: boolean;

    try {
      exists = await BlogPostController.existsById(id);
    } catch(e) {
      console.error(new Error("Error trying to query the db"), e);
      throw new Error("Server Error");
    }

    if(!exists)
      throw new Error("there is no blog post with this id");

    return true;
  },
};

router.get("/:id", validateReq({ id: idValidator }), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const blogPost = await BlogPostController.getById(id);
    res.json({ blogPost });
  } catch(e) {
    next(e);
  }
});

export default router;
