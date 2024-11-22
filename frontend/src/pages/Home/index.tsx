import { parseCssModule } from "@utils/css";
import { PageWrapper } from "@/components/Layout";
import { BlogPost } from "@/types";

import Navbar from "@components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function Home({ blogPosts }: { blogPosts: BlogPost[] }) {
  const getBlogPosts = () => {
    return blogPosts.map(blogPost => {
      return (
        <div className={getClassName("blog-post")} key={blogPost.id}>
          <a href={`/blog/posts/${blogPost.id}`}>
            <div className={getClassName("cover-container")}>
              <img
                className={getClassName("cover")}
                src={blogPost.cover}
                alt="Blog Post Cover"
              />
            </div>

            <span className={getClassName("title")}>{blogPost.title}</span>
          </a>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar title="Fernando's Blog"/>
      <PageWrapper className={getClassName("home")}>
        <h3 className={getClassName("subtitle")}>Recent Blog Posts</h3>
        <div className={getClassName("blog-posts")}>
          {getBlogPosts()}
        </div>
      </PageWrapper>
    </>
  );
}

export default Home;
