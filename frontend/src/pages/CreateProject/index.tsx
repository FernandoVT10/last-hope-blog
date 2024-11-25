import { useState } from "react";
import { PageWrapper } from "@components/Layout";
import { parseCssModule } from "@/utils/css";
import { Button, Input, Label, TextArea } from "@/components/Form";

import Navbar from "@components/Navbar";
import CoverSelector from "@/components/CoverSelector";
import Notifications from "@/Notifications";

import styles from "./styles.module.scss";
import api from "@/api";

const MAX_DESCRIPTION_LENGTH = 500;

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

          <div className={getClassName("form")}>
            <form onSubmit={onSubmit}>
              <div className={getClassName("input-group")}>
                <Label htmlFor="name-input">Name</Label>
                <Input
                  id="name-input"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(v) => onChange(v, "name")}
                  placeholder="Write an amazing name"
                  required
                />
              </div>

              <div className={getClassName("input-group")}>
                <Label htmlFor="description-textarea">Description</Label>
                <TextArea
                  id="description-textarea"
                  value={data.description}
                  onChange={(v) => onChange(v, "description")}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  required
                />
              </div>

              <div className={getClassName("input-group")}>
                <Label htmlFor="link-input">Link</Label>
                <Input
                  id="link-input"
                  type="url"
                  name="name"
                  value={data.link}
                  onChange={(v) => onChange(v, "link")}
                  placeholder="https://gnu.org"
                  required
                />
              </div>

              <div className={getClassName("btn-container")}>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  Create Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default CreateProject;
