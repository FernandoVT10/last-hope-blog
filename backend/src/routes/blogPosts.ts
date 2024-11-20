import { Router } from "express";
import {
  MAX_BLOGPOST_CONTENT_LENGTH,
  MAX_BLOGPOST_TITLE_LENGTH
} from "../constants";

import validateReq, { Validators, Validator } from "../middlewares/validateReq";
import parseMultipart, { imageValidator } from "../middlewares/parseMultipart";

import BlogPostController from "../controllers/BlogPostController";

const DEFAULT_LIMIT = 5;

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
      const blogPost = await BlogPostController.createOne(req.file as Buffer, { title, content });
      res.json({ blogPost });
    } catch (e) {
      next(e);
    }
  }
);

const getBlogPosts: Validators = {
  limit: {
    in: "query",
    type: "number",
    required: false,
    min: 1,
  }
};

router.get("/", validateReq(getBlogPosts), async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : DEFAULT_LIMIT;
    const blogPosts = await BlogPostController.getAllWithURLCover(limit);
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

    const blogPost = await BlogPostController.getByIdWithURLCover(id);
    res.json({ blogPost });
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", validateReq({ id: idValidator}), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    await BlogPostController.deleteById(id);

    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});

export default router;
