import { PageWrapper } from "@/components/Layout";
import { BlogPost as BlogPostType } from "@/types";
import { parseCssModule } from "@/utils/css";
import { useModal } from "@/components/Modal";
import { Button } from "@/components/Form";

import markdownIt from "markdown-it";
import DeletePostModal from "./DeletePostModal";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);
const md = markdownIt();

function BlogPost({ blogPost }: { blogPost: BlogPostType }) {
  const deletePostModal = useModal();

  const getContentHTML = (): string => {
    const html = md.render(blogPost.content);
    return html;
  };

  return (
    <>
      <DeletePostModal modal={deletePostModal} blogPostId={blogPost.id}/>
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
        </div>
      </PageWrapper>
    </>
  );
}

export default BlogPost;
