import { useState } from "react";
import { PageWrapper } from "@/components/Layout";
import { parseCssModule } from "@/utils/css";
import { Button, Input, TextArea } from "@/components/Form";

import CoverSelector from "./CoverSelector";
import Notifications from "@/Notifications";

import styles from "./styles.module.scss";
import api from "@/api";

const MAX_CONTENT_LENGTH = 5000;

const getClassName = parseCssModule(styles);

type Data = {
  cover: File | null;
  title: string;
  content: string;
};

const initialData: Data = {
  cover: null,
  title: "",
  content: "",
};

function CreateBlogPost() {
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(false);

  const setCover = (cover: File) => {
    setData({
      ...data,
      cover
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

    const notificationId = Notifications.loading("Creating blog post...");

    try {
      const blogPost = await api.createBlogPost({
        cover: data.cover as File,
        title: data.title,
        content: data.content,
      });

      window.location.assign(`/blog/posts/${blogPost.id}`);
    } catch(e) {
      console.error(e);
      Notifications.error("There was an error trying to create the post");
    }

    Notifications.remove(notificationId);
    setLoading(false);
  };

  return (
    <PageWrapper className={getClassName("create-blog-post")}>
      <div className={getClassName("container")}>
        <h1 className={getClassName("title")}>Create Blog Post</h1>

        <CoverSelector setCover={setCover}/>

        <form onSubmit={onSubmit}>
          <div className={getClassName("input-group")}>
            <label
              className={getClassName("label")}
              htmlFor="cover-title"
            >
              Title
            </label>
            <Input
              id="cover-title"
              type="text"
              name="title"
              value={data.title}
              onChange={(v) => onChange(v, "title")}
              placeholder="Write an inspiring title"
              required
            />
          </div>

          <div className={getClassName("input-group")}>
            <label
              className={getClassName("label")}
              htmlFor="cover-content"
            >
              Content
            </label>
            <TextArea
              value={data.content}
              onChange={(v) => onChange(v, "content")}
              maxLength={MAX_CONTENT_LENGTH}
              required
            />
          </div>

          <div className={getClassName("btn-container")}>
            <Button
              type="submit"
              disabled={loading}
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}

export default CreateBlogPost;
