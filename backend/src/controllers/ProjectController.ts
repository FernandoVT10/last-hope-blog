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

async function getAllWithURLCover(): Promise<Project[]> {
  const projects = await Project.findAll({
    order: [["createdAt", "DESC"]],
  });

  return projects.map(p => {
    p.cover = ImageController.getURLFromName(p.cover, PROJECT_COVERS_DIR);

    return p;
  });
}

async function existsById(id: number): Promise<boolean> {
  const count = await Project.count({
    where: { id },
  });

  return count > 0;
}

async function deleteById(projectId: number): Promise<void> {
  const project = await Project.findByPk(projectId);

  if(!project)
    throw new Error("Project is null");

  await ImageController.deleteByUniqueName(project.cover, PROJECT_COVERS_DIR);

  await project.destroy();
}

type UpdateByIdData = {
  cover?: Buffer;
  name?: string;
  description?: string;
  link?: string;
};

async function updateById(id: number, data: UpdateByIdData): Promise<void> {
  const project = await Project.findByPk(id);

  if(!project)
    throw new Error("Project is null");

  if(data.cover) {
    await ImageController.replaceWithBuffer(data.cover, project.cover, PROJECT_COVERS_DIR);
  }

  await project.update({
    name: data.name,
    description: data.description,
    link: data.link,
  });
}

export default {
  createOne,
  getAllWithURLCover,
  existsById,
  deleteById,
  updateById,
};
