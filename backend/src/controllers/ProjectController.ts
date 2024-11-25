import ImageController from "./ImageController";

import { PROJECT_COVERS_DIR } from "../constants";
import { Project } from "../models";

type CreateOneData = {
  name: string;
  description: string;
  link: string;
};

async function createOne(cover: Buffer, data: CreateOneData): Promise<Project> {
  const coverName = await ImageController.saveBufferWithUniqueName(cover, PROJECT_COVERS_DIR);

  return Project.create({
    cover: coverName,
    ...data
  });
}

export default {
  createOne,
};
