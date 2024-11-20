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
  cover: {
    type: "image",
    required: true,
  },
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

const idValidator: Validator = {
  type: "number",
  in: "params",
  min: 1,
  required: true,
  custom: async (id) => {
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

router.delete("/:id", validateReq({ id: idValidator}), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    await BlogPostController.deleteById(id);

    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});


const updateBlogPost: Validators = {
  cover: {
    type: "image",
    required: false,
  },
  id: idValidator,
  title: {
    type: "string",
    required: false,
    maxLength: MAX_BLOGPOST_TITLE_LENGTH,
  },
  content: {
    type: "string",
    required: false,
    maxLength: MAX_BLOGPOST_CONTENT_LENGTH,
  },
};

router.put("/:id", parseMultipart("cover", imageValidator), validateReq(updateBlogPost), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    await BlogPostController.updateById(id, {
      title: req.body.title || undefined,
      content: req.body.content || undefined,
      cover: req.file,
    });

    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});

export default router;
