import { useContext } from "react";
import { PageWrapper } from "@/components/Layout";
import { BlogPost as BlogPostType } from "@/types";
import { parseCssModule } from "@/utils/css";
import { useModal } from "@/components/Modal";
import { Button } from "@/components/Form";
import { ClockIcon } from "@/icons";
import { GlobalContext } from "@/contexts";
import { formatDate } from "@/utils/formatters";

import DeletePostModal from "./DeletePostModal";
import NotFound from "@components/NotFound";
import Navbar from "@/components/Navbar";
import MarkdownRenderer from "@/components/MarkdownRenderer";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function BlogPost({ blogPost }: { blogPost: BlogPostType | null }) {
  if(!blogPost) {
    return <NotFound text="Blog post not found"/>;
  }

  const globalContext = useContext(GlobalContext);

  const deletePostModal = useModal();

  const getButtons = () => {
    if(!globalContext.isAuthenticated) return null;

    return (
      <div className={getClassName("actions-container")}>
        <Button
          type="button"
          style="danger"
          onClick={deletePostModal.show}
        >
          Delete Post
        </Button>

        <a href={`/blog/posts/${blogPost.id}/edit`}>
          <Button type="button">
            Edit Post
          </Button>
        </a>
      </div>
    );
  };

  return (
    <>
      <DeletePostModal modal={deletePostModal} blogPostId={blogPost.id}/>

      <Navbar/>

      <PageWrapper className={getClassName("blog-post")}>
        <div className={getClassName("cover-container")}>
          <img
            src={blogPost.cover}
            alt="Blog Post Cover"
            className={getClassName("cover")}
          />

          <div className={getClassName("date-container")}>
            <ClockIcon size={18} className={getClassName("icon")}/>
            <span>{formatDate(blogPost.createdAt)}</span>
          </div>
        </div>

        <div className={getClassName("container")}>
          <h1 className={getClassName("title")}>{blogPost.title}</h1>

          <div className={getClassName("content-container")}>
            <MarkdownRenderer markdown={blogPost.content}/>
          </div>

          {getButtons()}
        </div>
      </PageWrapper>
    </>
  );
}

export default BlogPost;
