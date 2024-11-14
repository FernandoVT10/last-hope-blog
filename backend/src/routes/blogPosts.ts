import { Router } from "express";
import {
  MAX_BLOGPOST_CONTENT_LENGTH,
  MAX_BLOGPOST_TITLE_LENGTH
} from "../constants";
import validateReq, { Validators } from "../middlewares/validateReq";

import BlogPostController from "../controllers/BlogPostController";

const router = Router();

const createBlogPost: Validators = {
  title: {
    type: "string",
    required: true,
    length: { min: 1, max: MAX_BLOGPOST_TITLE_LENGTH },
  },
  content: {
    type: "string",
    required: true,
    length: { min: 1, max: MAX_BLOGPOST_CONTENT_LENGTH },
  },
};

router.post("/", validateReq(createBlogPost), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await BlogPostController.createOne({ title, content });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (_, res, next) => {
  try {
    const blogPosts = await BlogPostController.getAll();
    res.json({ blogPosts });
  } catch(e) {
    next(e);
  }
});

export default router;
