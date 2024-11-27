import { parseCssModule } from "@utils/css";
import { PageWrapper } from "@/components/Layout";
import { BlogPost } from "@/types";
import {
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
  CodeIcon,
  WorldIcon,
  SquaresIcon,
} from "@/icons";

import Navbar from "@components/Navbar";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

const TECHNOLOGIES = [
  "React", "Node.js", "Typescript", "HTML/CSS",
  "Sql/NoSql", "Linux", "Python",
];

function Home({ blogPosts }: { blogPosts: BlogPost[] }) {
  const getTechnologies = () => {
    return TECHNOLOGIES.map(tech => {
      return (
        <>
          <span>{ tech }</span>
          {", "}
        </>
      );
    });
  };

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

  const getBlogPostsSection = () => {
    if(!blogPosts.length) return null;

    return (
      <section className={getClassName("blog-posts-section")}>
        <h3 className={getClassName("subtitle")}>Posts from my blog</h3>
        <div className={getClassName("blog-posts")}>
          {getBlogPosts()}
        </div>
      </section>
    );
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
        <section className={getClassName("cards-container")}>
          <div className={getClassName("card")}>
            <CodeIcon size={40} className={getClassName("icon")}/>
            <p className={getClassName("name")}>Technologies</p>
            <p className={getClassName("details")}>
              I can use {getTechnologies()}and more.
            </p>
          </div>

          <div className={getClassName("card")}>
            <WorldIcon size={40} className={getClassName("icon")}/>
            <p className={getClassName("name")}>Languages</p>
            <p className={getClassName("details")}>
              Spanish is my native language, and I have a B1 level of English.
            </p>
          </div>

          <div className={getClassName("card")}>
            <SquaresIcon size={40} className={getClassName("icon")}/>
            <p className={getClassName("name")}>Projects</p>
            <p className={getClassName("details")}>
              You can click <a href="/projects" className={getClassName("link")}>here</a> to see my projects.
            </p>
          </div>
        </section>

        {getBlogPostsSection()}
      </PageWrapper>
    </>
  );
}

export default Home;
