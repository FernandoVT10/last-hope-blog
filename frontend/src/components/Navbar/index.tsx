import { useContext, useState } from "react";
import { GlobalContext } from "@/contexts";
import { parseCssModule } from "@/utils/css";
import { MenuIcon } from "@/icons";
import icon from "../../../resources/icon.svg";

import styles from "./styles.module.scss";

const getClassName = parseCssModule(styles);

function Navbar({ title }: { title?: string }) {
  const [isActive, setIsActive] = useState(false);

  const globalContext = useContext(GlobalContext);

  return (
    <div className={getClassName("navbar-wrapper")}>
      <nav className={getClassName("navbar", { active: isActive })}>
        <div
          className={getClassName("bg")}
          onClick={() => setIsActive(false)}
        ></div>

        <a className={getClassName("link-title")} href="/">
          <img src={icon} alt="Icon" width="30" height="30"/>
          <h1 className={getClassName("title")}>{ title }</h1>
        </a>

        <button
          onClick={() => setIsActive(!isActive)}
          className={getClassName("btn")}
        >
          <MenuIcon size={16}/>
        </button>

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
