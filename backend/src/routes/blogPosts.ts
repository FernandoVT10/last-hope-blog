import { Router } from "express";
import {
  MAX_BLOGPOST_CONTENT_LENGTH,
  MAX_BLOGPOST_TITLE_LENGTH
} from "../constants";

import validateReq, { Validators } from "../middlewares/validateReq";
import parseMultipart, { imageValidator } from "../middlewares/parseMultipart";

import BlogPostController from "../controllers/BlogPostController";
import sharp from "sharp";

const router = Router();

const createBlogPost: Validators = {
  cover: {
    type: "file",
    custom: async (req) => {
      if(!req.file) throw new Error("cover is required");

      try {
        await sharp(req.file).stats();
      } catch {
        throw new Error("cover is not a valid image");
      }

      return true;
    },
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

export default router;
