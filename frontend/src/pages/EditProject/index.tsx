import { useState } from "react";
import { PageWrapper } from "@/components/Layout";
import { parseCssModule } from "@/utils/css";
import { Project } from "@/types";

import api, { UpdateProjectData } from "@/api";

import Navbar from "@/components/Navbar";
import CoverSelector from "@/components/CoverSelector";
import NotFound from "@/components/NotFound";
import ProjectForm from "@/components/ProjectForm";
import Notifications from "@/Notifications";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type Data = {
  name: string;
  description: string;
  link: string;
  cover: File | null;
};

function EditProject({ project }: { project?: Project }) {
  if(!project)
    return <NotFound text="Project Not Found"/>;

  const [data, setData] = useState<Data>({
    name: project.name,
    description: project.description,
    link: project.link,
    cover: null,
  });
  const [loading, setLoading] = useState(false);

  const setCover = (cover: File) => {
    setData({
      ...data,
      cover,
    });
  };

  const onChange = (val: string, key: string) => {
    setData({
      ...data,
      [key]: val,
    });
  };

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const notificationId = Notifications.loading("Saving changes...");

    try {
      const updateData: UpdateProjectData = {};

      if(data.name !== project.name) {
        updateData.name = data.name;
      }

      if(data.description !== project.description) {
        updateData.description = data.description;
      }

      if(data.link !== project.link) {
        updateData.link = data.link;
      }

      if(data.cover) {
        updateData.cover = data.cover;
      }

      await api.updateProject(project.id, updateData);

      window.location.assign(`/projects`);
    } catch(e) {
      console.error(e);
      Notifications.error("There was an error trying save changes");
    }

    Notifications.remove(notificationId);
    setLoading(false);
  };

  return (
    <>
      <Navbar/>

      <PageWrapper className={getClassName("create-project")}>
        <div className={getClassName("container")}>
          <h1 className={getClassName("title")}>Edit Project</h1>

          <CoverSelector
            setCover={setCover}
            initialPreviewImage={project.cover}
          />

          <ProjectForm
            onSubmit={onSubmit}
            data={data}
            onChange={onChange}
            loading={loading}
            submitBtnText="Save Changes"
          />
        </div>
      </PageWrapper>
    </>
  );
}

export default EditProject;
