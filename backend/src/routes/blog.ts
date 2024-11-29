import { Router } from "express";
import { BLOG_UPLOADS_DIR } from "../constants";
import { authorizeApi } from "../middlewares/authorize";

import validateReq, { Validators } from "../middlewares/validateReq";

import parseMultipart from "../middlewares/parseMultipart";
import ImageController from "../controllers/ImageController";

const router = Router();

const uploadImage: Validators = {
  image: {
    type: "image",
    required: true,
  },
};

router.post(
  "/uploadImage",
  authorizeApi(),
  parseMultipart("image"),
  validateReq(uploadImage),
  async (req, res, next) => {
    try {
      const buffer = req.file as Buffer;
      const imageURL = await ImageController.uploadBufferAsImage(buffer, BLOG_UPLOADS_DIR);
      res.json({ imageURL });
    } catch(e) {
      next(e);
    }
  }
);

export default router;
