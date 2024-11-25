import { Router } from "express";
import { authorizeApi } from "../middlewares/authorize";
import validateReq, { Validators } from "../middlewares/validateReq";
import parseMultipart from "../middlewares/parseMultipart";
import {
  MAX_PROJECT_DESCRIPTION_LENGTH,
  MAX_PROJECT_NAME_LENGTH,
  MAX_PROJECT_LINK_LENGTH
} from "../constants";

import ProjectController from "../controllers/ProjectController";

const router = Router();

const createProject: Validators = {
  cover: {
    type: "image",
    required: true,
  },
  name: {
    type: "string",
    maxLength: MAX_PROJECT_NAME_LENGTH,
    required: true,
  },
  description: {
    type: "string",
    maxLength: MAX_PROJECT_DESCRIPTION_LENGTH,
    required: true,
  },
  link: {
    type: "string",
    maxLength: MAX_PROJECT_LINK_LENGTH,
    required: true,
  },
};

router.post(
  "/",
  authorizeApi(),
  parseMultipart("cover"),
  validateReq(createProject),
  async (req, res, next) => {
    try {
      const { name, description, link } = req.body;
      const project = await ProjectController.createOne(req.file as Buffer, {
        name, description, link,
      });
      res.json({ project });
    } catch(e) {
      next(e);
    }
  }
);

export default router;
