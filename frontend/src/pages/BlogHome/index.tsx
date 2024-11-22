import { PageWrapper } from "@/components/Layout";
import { BlogPost } from "@/types";
import { parseCssModule } from "@/utils/css";
import { ClockIcon } from "@/icons";
import { formatDate } from "@/utils/formatters";

import Navbar from "@/components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function BlogHome({ blogPosts }: { blogPosts: BlogPost[] }) {
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

              <div className={getClassName("details")}>
                <span className={getClassName("title")}>{blogPost.title}</span>

                <div className={getClassName("date-container")}>
                  <ClockIcon size={16} className={getClassName("icon")}/>
                  <span>{formatDate(blogPost.createdAt)}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    });
  };

  return (
    <>
      <Navbar title="Blog"/>

      <PageWrapper className={getClassName("blog-posts")}>
        {getBlogPosts()}
      </PageWrapper>
    </>
  );
}

export default BlogHome;
