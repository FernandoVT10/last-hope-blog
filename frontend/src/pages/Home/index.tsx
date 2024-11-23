import { parseCssModule } from "@utils/css";
import { PageWrapper } from "@/components/Layout";
import { BlogPost } from "@/types";
import { TwitterIcon, GithubIcon, LinkedinIcon } from "@/icons";

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
      <div className={getClassName("navbar-container")}>
        <Navbar style="no-background"/>
      </div>

      <section className={getClassName("presentation-section")}>
        <h1 className={getClassName("fullname")}>Fernando Vaca Tamayo</h1>
        <hr className={getClassName("separator")}/>
        <p className={getClassName("description")}>
          Hi, I'm a Javascript full stack developer.
          I like video games, anime, music, and trying to find the
          best way to write the cleanest and best code.
        </p>
        <ul className={getClassName("social-media-list")}>
          <li className={getClassName("social-media-item")}>
            <a target="_blank" href="https://twitter.com/FernandoVT10">
              <TwitterIcon size={20}/>
            </a>
          </li>

          <li className={getClassName("social-media-item")}>
            <a target="_blank" href="https://github.com/FernandoVT10">
              <GithubIcon size={20}/>
            </a>
          </li>

          <li className={getClassName("social-media-item")}>
            <a target="_blank" href="https://github.com/FernandoVT10">
              <LinkedinIcon size={20}/>
            </a>
          </li>
        </ul>
      </section>

      <PageWrapper className={getClassName("home")}>

        <section>
          <h3 className={getClassName("subtitle")}>Recent Blog Posts</h3>
          <div className={getClassName("blog-posts")}>
            {getBlogPosts()}
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

export default Home;
