import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/Layout";
import { BlogPost as BlogPostType } from "@/types";
import { parseCssModule } from "@/utils/css";

import markdownIt from "markdown-it";
import NotFound from "../NotFound";
import api from "@/api";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);
const md = markdownIt();

function BlogPost({ blogPostId }: { blogPostId: string }) {
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setBlogPost(await api.getBlogPost(parseInt(blogPostId)));
      } catch {
        // TODO: handle this error better :)
        console.log("Error");
      }

      setLoading(false);
    };

    load();
  }, []);

  if(loading) return null;

  if(!blogPost) {
    return <NotFound/>
  }

  const getContentHTML = (): string => {
    const html = md.render(blogPost.content);
    return html;
  };

  return (
    <PageWrapper className={getClassName("blog-post")}>
      <div className={getClassName("cover-container")}>
        <img
          src={blogPost.cover}
          alt="Blog Post Cover"
          className={getClassName("cover")}
        />
      </div>

      <div className={getClassName("container")}>
        <h1 className={getClassName("title")}>{blogPost.title}</h1>

        <div
          className={getClassName("content")}
          dangerouslySetInnerHTML={{ __html: getContentHTML() }}
        ></div>
      </div>
    </PageWrapper>
  );
}

export default BlogPost;
