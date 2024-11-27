import { useState } from "react";
import { PageWrapper } from "@components/Layout";
import { parseCssModule } from "@/utils/css";

import Navbar from "@components/Navbar";
import CoverSelector from "@/components/CoverSelector";
import Notifications from "@/Notifications";
import ProjectForm from "@/components/ProjectForm";
import api from "@/api";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type Data = {
  name: string;
  description: string;
  link: string;
  cover: File | null;
};

const initialData: Data = {
  name: "",
  description: "",
  link: "",
  cover: null,
};

function CreateProject() {
  const [data, setData] = useState<Data>(initialData);
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

    if(!data.cover)
      return Notifications.error("Cover is required");

    setLoading(true);
    const notificationId = Notifications.loading("Creating project...");

    try {
      await api.createProject({
        name: data.name,
        description: data.description,
        link: data.link,
        cover: data.cover,
      });
      window.location.assign(`/projects`);
    } catch(e) {
      console.error(e);
      Notifications.error("There was an error trying to create the project");
    }

    Notifications.remove(notificationId);
    setLoading(false);
  };

  return (
    <>
      <Navbar/>

      <PageWrapper className={getClassName("create-project")}>
        <div className={getClassName("container")}>
          <h1 className={getClassName("title")}>Create Project</h1>

          <CoverSelector setCover={setCover}/>

          <ProjectForm
            onSubmit={onSubmit}
            data={data}
            onChange={onChange}
            loading={loading}
            submitBtnText="Create Project"
          />
        </div>
      </PageWrapper>
    </>
  );
}

export default CreateProject;
