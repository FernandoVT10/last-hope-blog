import { useState } from "react";
import { PageWrapper } from "@components/Layout";
import { parseCssModule } from "@/utils/css";
import { CoverSelector, MainForm } from "@/components/BlogPostForm";
import { BlogPost } from "@/types";

import Notifications from "@/Notifications";
import api, { UpdateBlogPostData } from "@/api";

import NotFound from "@/components/NotFound";
import Navbar from "@/components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

type Data = {
  title: string;
  content: string;
  cover: File | null;
};

function EditBlogPost({ blogPost }: { blogPost: BlogPost }) {
  if(!blogPost) {
    return <NotFound text="Blog post not found"/>;
  }

  const [data, setData] = useState<Data>({
    title: blogPost.title,
    content: blogPost.content,
    cover: null,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const notificationId = Notifications.loading("Saving changes...");

    try {
      const updateData: UpdateBlogPostData = {};

      if(data.title !== blogPost.title) {
        updateData.title = data.title;
      }

      if(data.content !== blogPost.content) {
        updateData.content = data.content;
      }

      if(data.cover) {
        updateData.cover = data.cover;
      }

      await api.updateBlogPost(blogPost.id, updateData);

      window.location.assign(`/blog/posts/${blogPost.id}`);
    } catch(e) {
      console.error(e);
      Notifications.error("There was an error trying save changes");
    }

    Notifications.remove(notificationId);
    setLoading(false);
  };

  const onChange = (val: string, key: string) => {
    setData({
      ...data,
      [key]: val,
    });
  };

  const setCover = (cover: File) => {
    setData({
      ...data,
      cover
    });
  };

  return (
    <>
      <Navbar/>

      <PageWrapper className={getClassName("edit-blog-post")}>
        <div className={getClassName("container")}>
          <h1 className={getClassName("title")}>Edit Blog Post</h1>

          <CoverSelector
            setCover={setCover}
            initialPreviewImage={blogPost.cover}
          />

          <MainForm
            onSubmit={onSubmit}
            data={data}
            onChange={onChange}
            loading={loading}
            btnText="Save Changes"
          />
        </div>
      </PageWrapper>
    </>
  );
}

export default EditBlogPost;
