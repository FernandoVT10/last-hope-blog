import { useEffect, useState } from "react";
import { parseCssModule } from "@utils/css";
import { PageWrapper } from "@/components/Layout";
import { BlogPost } from "@/types";

import styles from "./styles.module.scss";
import api from "@/api";

const getClassName = parseCssModule(styles);

function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        setBlogPosts(await api.getBlogPosts(3));
      } catch {
        // TODO: handle this error better :)
        console.log("Error");
      }

      setLoading(false);
    };

    load();
  }, []);

  const getBlogPosts = () => {
    return blogPosts.map(blogPost => {
      return (
        <div className={getClassName("blog-post")} key={blogPost.id}>
          <a href={`/blog/posts/${blogPost.id}`}>
            <img
              className={getClassName("cover")}
              src={blogPost.cover}
              alt="Blog Post Cover"
            />

            <span className={getClassName("title")}>{blogPost.title}</span>
          </a>
        </div>
      );
    });
  };

  return (
    <PageWrapper className={getClassName("home")}>
      <h3 className={getClassName("subtitle")}>Recent Blog Posts</h3>
      <div className={getClassName("blog-posts")}>
        {getBlogPosts()}
      </div>
    </PageWrapper>
  );
}

export default Home;

// TODO: make a placeholder meanwhile the data is loading
