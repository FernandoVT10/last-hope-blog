import { useContext } from "react";
import { GlobalContext } from "@/contexts";
import { parseCssModule } from "@/utils/css";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function Navbar({ title }: { title?: string }) {
  const globalContext = useContext(GlobalContext);

  return (
    <div className={getClassName("navbar-wrapper")}>
      <nav className={getClassName("navbar")}>
        <a className={getClassName("link")} href="/">
          <h1 className={getClassName("title")}>{ title }</h1>
        </a>

        <ul className={getClassName("links")}>
          <li className={getClassName("link-container")}>
            <a className={getClassName("link")} href="/">Home</a>
          </li>

          <li className={getClassName("link-container")}>
            <a className={getClassName("link")} href="/blog">Blog</a>
          </li>

          <li className={getClassName("link-container")}>
            <a className={getClassName("link")} href="/projects">Projects</a>
          </li>

          {globalContext.isAuthenticated && (
            <li className={getClassName("link-container")}>
              <a className={getClassName("link")} href="/blog/create-post">Create Post</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
